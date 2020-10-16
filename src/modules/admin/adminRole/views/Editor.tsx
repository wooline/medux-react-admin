import {Button, Form, Input} from 'antd';
import {ItemDetail, UpdateItem} from 'entity/role';
import React, {useCallback} from 'react';

import {CaretDownOutlined} from '@ant-design/icons';
import {CustomError} from 'common/errors';
import PurviewEditor from 'components/PurviewEditor';
import {connect} from 'react-redux';
import {getFormDecorators} from 'common/utils';
import useEventCallback from 'hooks/useEventCallback';
import styles from './index.m.less';

type FormData = Omit<UpdateItem, 'id'>;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const purviewsLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 25,
  },
};

interface OwnProps {
  currentItem: ItemDetail;
}

const fromDecorators = getFormDecorators<FormData>({
  roleName: {rules: [{required: true, message: '请输入角色名称'}]},
  purviews: {rules: [{required: true, message: '请至少配置一项权限', type: 'array'}]},
  remark: {},
});

const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, currentItem}) => {
  const [form] = Form.useForm();
  const initialValues: FormData = currentItem;
  const handleSubmit = useCallback(
    (error: CustomError) => {
      if (error instanceof CustomError) {
        form.setFields([{name: 'purviews', errors: [error.message]}]);
        message.error(error.message!);
      }
    },
    [form]
  );
  const onHide = useCallback(() => {
    dispatch(actions.adminRole.closeCurrentItem());
  }, [dispatch]);
  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const id = currentItem.id;
  const onFinish = useEventCallback(
    (values: FormData) => {
      if (id) {
        dispatch(actions.adminRole.updateItem({...values, id}, handleSubmit));
      } else {
        dispatch(actions.adminRole.createItem({...values, id}, handleSubmit));
      }
    },
    [dispatch, handleSubmit, id]
  );

  return (
    <Form className={styles.root} layout="horizontal" form={form} {...formItemLayout} onFinish={onFinish as any} initialValues={initialValues}>
      <div>
        <FormItem label="角色名称" {...fromDecorators.roleName}>
          <Input autoComplete="off" allowClear placeholder="请输入角色名称" />
        </FormItem>
        <FormItem label="备注" {...fromDecorators.remark}>
          <Input.TextArea autoComplete="off" allowClear placeholder="请输入备注" />
        </FormItem>
      </div>

      <FormItem className="purviews" {...purviewsLayout}>
        <h4>
          <CaretDownOutlined style={{marginRight: 5}} />
          权限设置
        </h4>
        <FormItem {...fromDecorators.purviews} noStyle {...purviewsLayout}>
          <PurviewEditor />
        </FormItem>
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
