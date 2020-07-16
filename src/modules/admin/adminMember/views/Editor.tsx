import {Alert, Button, Form, Input, Select} from 'antd';
import {DGender, DStatus, ItemDetail, UpdateItem} from 'entity/member';
import React, {useCallback, useMemo} from 'react';

import {CustomError} from 'common';
import {connect} from 'react-redux';
import {getFormDecorators} from 'common/utils';
import useEventCallback from 'hooks/useEventCallback';

type FormData = Omit<UpdateItem, 'id'>;

const RoleSelector = loadView('adminRole', 'selector');

const FormItem = Form.Item;

export const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

interface OwnProps {
  currentItem: ItemDetail;
}

const fromDecorators = getFormDecorators<FormData>({
  username: {rules: [{required: true, message: '请输入用户名'}]},
  nickname: {rules: [{required: true, message: '请输入呢称'}]},
  role: {rules: [{required: true, message: '请选择角色'}]},
  gender: {rules: [{required: true, message: '请选择性别'}]},
  email: {rules: [{required: true, type: 'email', message: '请输入Email'}]},
  status: {rules: [{required: true, message: '请选择用户状态'}]},
  roleId: {},
});

const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, currentItem}) => {
  const [form] = Form.useForm();
  const initialValues: FormData = useMemo(() => {
    return {...currentItem, role: currentItem.roleId ? {id: currentItem.roleId, name: currentItem.roleName} : undefined};
  }, [currentItem]);

  const onHide = useCallback(() => {
    dispatch(actions.adminMember.closeCurrentItem());
  }, [dispatch]);

  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const handleSubmit = useCallback(
    (error: CustomError) => {
      if (error instanceof CustomError) {
        form.setFields([{name: 'username', errors: [error.message]}]);
        message.error(error.message!);
      }
    },
    [form]
  );

  const id = currentItem.id;
  const onFinish = useEventCallback(
    (values: FormData) => {
      if (id) {
        dispatch(actions.adminMember.updateItem({...values, id}, handleSubmit));
      } else {
        dispatch(actions.adminMember.createItem({...values, id}, handleSubmit));
      }
    },
    [dispatch, handleSubmit, id]
  );

  return (
    <Form className="g-editorForm" layout="horizontal" {...formItemLayout} form={form} onFinish={onFinish as any} initialValues={initialValues}>
      <FormItem label="用户名" {...fromDecorators.username}>
        <Input disabled={!!id} autoComplete="off" allowClear={true} placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="呢称" {...fromDecorators.nickname}>
        <Input autoComplete="off" allowClear={true} placeholder="请输入呢称" />
      </FormItem>
      <FormItem label="角色" {...fromDecorators.role}>
        <RoleSelector />
      </FormItem>
      <FormItem label="性别" {...fromDecorators.gender}>
        <Select allowClear={true} placeholder="请选择用户性别">
          {DGender.options.map((option) => (
            <Select.Option key={option.key} value={option.key}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
      <FormItem label="Email" {...fromDecorators.email}>
        <Input autoComplete="off" allowClear={true} placeholder="请输入Email" />
      </FormItem>
      <FormItem label="状态" {...fromDecorators.status}>
        <Select allowClear={true} placeholder="请选择用户状态">
          {DStatus.options.map((option) => (
            <Select.Option key={option.key} value={option.key}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
      <div className="g-actions">
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button type="dashed" onClick={onReset}>
          重置
        </Button>
        <Button onClick={onHide}>取消</Button>
      </div>
    </Form>
  );
};

export default connect()(React.memo(Component));
