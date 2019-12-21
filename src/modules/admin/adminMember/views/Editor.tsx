import {Alert, Button, Form, Input, Select} from 'antd';
import {DGender, DStatus, UpdateItem} from 'entity/member';
import {createForm, getFormDecorators} from 'common/utils';

import {CustomError} from 'entity/common';
import {FormComponentProps} from 'antd/lib/form';
import React from 'react';
import {connect} from 'react-redux';

const RoleSelector = loadView('adminRole', 'Selector');

const FormItem = Form.Item;

export const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
  dataSource?: UpdateItem;
}

interface State {
  formError?: string;
}

class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp, State> {
  static getDerivedStateFromProps(nextProps: StoreProps, prevState: State): State | null {
    if (!nextProps.currentOperation) {
      return {
        ...prevState,
        formError: '',
      };
    }
    return null;
  }

  state: State = {};

  onHide = () => {
    this.props.dispatch(actions.adminMember.execCurrentItem());
  };
  onReset = () => {
    this.setState({formError: ''});
    this.props.form.resetFields();
  };
  handleSubmit = (error: CustomError) => {
    if (error instanceof CustomError) {
      this.setState({formError: error.message});
    }
  };
  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {validateFields, getFieldError} = this.props.form;
    validateFields((errors, values: UpdateItem) => {
      if (!errors) {
        const id = this.props.dataSource!.id;
        if (id) {
          this.props.dispatch(actions.adminMember.updateItem({...values, id}, this.handleSubmit));
        } else {
          this.props.dispatch(actions.adminMember.createItem({...values, id}, this.handleSubmit));
        }
      } else {
        const errorField = Object.keys(errors)[0];
        const errMsg = getFieldError(errorField)!.join(', ');
        message.error(errMsg);
      }
    });
  };
  public render() {
    const {form, dataSource} = this.props;
    const {formError = ''} = this.state;
    if (dataSource) {
      const formDecorators = getFormDecorators<UpdateItem>(form, {
        username: {rules: [{required: true, message: '请输入用户名'}]},
        nickname: {rules: [{required: true, message: '请输入呢称'}]},
        role: {rules: [{required: true, message: '请选择角色'}]},
        gender: {rules: [{required: true, message: '请选择性别'}]},
        email: {rules: [{required: true, message: '请输入Email'}]},
        status: {rules: [{required: true, message: '请选择用户状态'}]},
      });

      return (
        <Form className="g-editorForm" layout="horizontal" {...formItemLayout} onSubmit={this.onSubmit}>
          <FormItem label="用户名">{formDecorators.username(<Input autoComplete="off" allowClear={true} placeholder="请输入用户名" />)}</FormItem>
          <FormItem label="呢称">{formDecorators.nickname(<Input autoComplete="off" allowClear={true} placeholder="请输入呢称" />)}</FormItem>
          <FormItem label="角色">{formDecorators.role(<RoleSelector />)}</FormItem>
          <FormItem label="性别">
            {formDecorators.gender(
              <Select allowClear={true} placeholder="请选择用户性别">
                {DGender.options.map(option => (
                  <Select.Option key={option.key} value={option.key}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="Email">{formDecorators.email(<Input autoComplete="off" allowClear={true} placeholder="请输入Email" />)}</FormItem>
          <FormItem label="状态">
            {formDecorators.status(
              <Select allowClear={true} placeholder="请选择用户状态">
                {DStatus.options.map(option => (
                  <Select.Option key={option.key} value={option.key}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
          {formError && <Alert message={formError} showIcon type="error" />}
          <div className="g-actions">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button type="dashed" onClick={this.onReset}>
              重置
            </Button>
            <Button onClick={this.onHide}>取消</Button>
          </div>
        </Form>
      );
    }
    return null;
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  return {
    currentOperation: thisModule.routeParams!.currentOperation,
    dataSource: thisModule.currentItem,
  };
};
const mapPropsToFields = (props: StoreProps) => {
  return {
    ...props.dataSource,
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
