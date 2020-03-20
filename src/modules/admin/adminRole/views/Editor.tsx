import {Button, Form, Input} from 'antd';
import {ItemDetail, UpdateItem} from 'entity/role';
import React, {useCallback} from 'react';

import {CaretDownOutlined} from '@ant-design/icons';
import {CustomError} from 'common';
import PurviewEditor from 'components/PurviewEditor';
import {connect} from 'react-redux';
import {getFormDecorators} from 'common/utils';
import styles from './index.m.less';

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
type FormData = UpdateItem;

const validatePurview = (rule: {message: string}, value: string[] | undefined) => {
  if (!value || !value.length) {
    return Promise.reject(rule.message);
  } else {
    return Promise.resolve();
  }
};

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
  currentItem: ItemDetail;
}

interface State {
  purviewsError?: string;
}

const fromDecorators = getFormDecorators<FormData>({
  roleName: {rules: [{required: true, message: '请输入角色名称'}]},
  //purviews: {rules: [{validator: this.validatePurview, message: '请至少配置一项权限'}]},
  purviews: {rules: [{required: true, message: '请至少配置一项权限', type: 'array'}]},
  remark: {},
  id: {},
});

const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, currentOperation, currentItem}) => {
  // onPurviewChange = (arr?: string[]) => {
  //   if (arr && arr.length) {
  //     this.setState({purviewsError: ''});
  //   }
  // };
  const [form] = Form.useForm();
  const initialValues: FormData = currentItem;
  const handleSubmit = (error: CustomError) => {
    if (error instanceof CustomError) {
      form.setFields([{name: 'purviews', errors: [error.message]}]);
      message.error(error.message!);
    }
  };
  const onHide = useCallback(() => {
    dispatch(actions.adminRole.execCurrentItem());
  }, [dispatch]);
  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onFinish = (values: FormData) => {
    const id = currentItem!.id;
    if (id) {
      dispatch(actions.adminRole.updateItem({...values, id}, handleSubmit));
    } else {
      dispatch(actions.adminRole.createItem({...values, id}, handleSubmit));
    }
  };

  return (
    <Form className={styles.root} layout="horizontal" form={form} {...formItemLayout} onFinish={onFinish as any} initialValues={initialValues}>
      <div>
        <FormItem label="角色名称" {...fromDecorators.roleName}>
          <Input autoComplete="off" allowClear={true} placeholder="请输入角色名称" />
        </FormItem>
        <FormItem label="备注" {...fromDecorators.remark}>
          <Input.TextArea autoComplete="off" allowClear={true} placeholder="请输入备注" />
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

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminRole!;
  return {
    currentItem: thisModule.currentItem,
    currentOperation: thisModule.routeParams!.currentOperation,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
