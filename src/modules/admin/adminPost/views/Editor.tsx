import {Alert, Button, Form, Input} from 'antd';
import {ItemDetail, UpdateItem} from 'entity/post';
import React, {useCallback} from 'react';

import {CustomError} from 'common';
import {Status as MemberStaus} from 'entity/member';
import ResourceSelector from 'components/ResourceSelector';
import {connect} from 'react-redux';
import {getFormDecorators} from 'common/utils';
import useEventCallback from 'hooks/useEventCallback';

type FormData = Omit<UpdateItem, 'id'>;
const MemberSelector = loadView('adminMember', 'selector');

const FormItem = Form.Item;

export const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

const fromDecorators = getFormDecorators<FormData>({
  title: {rules: [{required: true, message: '请输入标题'}]},
  content: {rules: [{required: true, message: '请输入内容'}]},
  editors: {rules: [{required: true, message: '请选择责任编辑'}]},
  editorIds: {},
});

interface OwnProps {
  currentItem: ItemDetail;
}

const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, currentItem}) => {
  const [form] = Form.useForm();

  const onHide = useCallback(() => {
    dispatch(actions.adminPost.closeCurrentItem());
  }, [dispatch]);

  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const handleSubmit = useCallback(
    (error: CustomError) => {
      if (error instanceof CustomError) {
        form.setFields([{name: 'title', errors: [error.message]}]);
        message.error(error.message!);
      }
    },
    [form]
  );

  const id = currentItem.id;
  const onFinish = useEventCallback(
    (values: FormData) => {
      if (id) {
        dispatch(actions.adminPost.updateItem({...values, id}, handleSubmit));
      } else {
        dispatch(actions.adminPost.createItem({...values, id}, handleSubmit));
      }
    },
    [dispatch, handleSubmit, id]
  );

  return (
    <Form className="g-editorForm" layout="horizontal" {...formItemLayout} form={form} onFinish={onFinish as any} initialValues={currentItem}>
      <FormItem label="责任编辑" {...fromDecorators.editors}>
        <ResourceSelector
          limit={[1, 2]}
          title="请选择责任编辑"
          placeholder="请选择责任编辑"
          resourceNameField="nickname"
          allowClear={true}
          resource={<MemberSelector fixedSearchField={{status: MemberStaus.启用, role: {id: '3', name: '信息编辑'}}} />}
        />
      </FormItem>
      <FormItem label="标题" {...fromDecorators.title}>
        <Input autoComplete="off" allowClear={true} placeholder="请输入标题" />
      </FormItem>
      <FormItem label="内容" {...fromDecorators.content}>
        <Input.TextArea maxLength={50} rows={4} autoComplete="off" allowClear={true} placeholder="请输入内容" />
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
