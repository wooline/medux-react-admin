import {Alert, Button, Form, Input} from 'antd';
import {ItemDetail, UpdateItem} from 'entity/post';

import {CustomError} from 'entity/common';
import {FormComponentProps} from 'antd/lib/form';
import {Status as MemberStaus} from 'entity/member';
import React from 'react';
import ResourceSelector from 'components/ResourceSelector';
import {connect} from 'react-redux';
import {getFormDecorators} from 'common/utils';

const MemberSelector = loadView('adminMember', 'Selector');

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
  currentItem?: ItemDetail;
}

interface State {
  formError?: string;
}

class Component extends React.PureComponent<StoreProps & DispatchProp & FormComponentProps, State> {
  state: State = {};

  onHide = () => {
    this.props.dispatch(actions.adminPost.execCurrentItem());
  };
  onReset = () => {
    this.setState({formError: ''});
    this.props.form.resetFields();
  };
  handleSubmit = (error: CustomError) => {
    if (error instanceof CustomError) {
      this.setState({formError: error.message});
      message.error(error.message!);
    }
  };
  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {validateFields, getFieldError} = this.props.form;
    validateFields((errors, values: UpdateItem) => {
      if (!errors) {
        const id = this.props.currentItem!.id;
        if (id) {
          this.props.dispatch(actions.adminPost.updateItem({...values, id}, this.handleSubmit));
        } else {
          this.props.dispatch(actions.adminPost.createItem({...values, id}, this.handleSubmit));
        }
      } else {
        const errorField = Object.keys(errors)[0];
        const errMsg = getFieldError(errorField)!.join(', ');
        message.error(errMsg);
      }
    });
  };

  public render() {
    const {form, currentItem, currentOperation} = this.props;
    const {formError = ''} = this.state;
    if (currentItem) {
      const formDecorators = getFormDecorators<UpdateItem>(
        form,
        {
          title: {rules: [{required: true, message: '请输入标题'}]},
          content: {rules: [{required: true, message: '请输入内容'}]},
          editors: {rules: [{required: true, message: '请选择责任编辑'}]},
        },
        mapPropsToFields(this.props)
      );

      return (
        <Form className="g-editorForm" layout="horizontal" {...formItemLayout} onSubmit={this.onSubmit}>
          <FormItem label="责任编辑">
            {formDecorators.editors(
              <ResourceSelector
                limit={[1, 2]}
                title="请选择责任编辑"
                placeholder="请选择责任编辑"
                resourceNameField="nickname"
                allowClear={true}
                resource={<MemberSelector fixedSearchField={{status: MemberStaus.启用, role: {id: '3', name: '信息编辑'}}} />}
              />
            )}
          </FormItem>
          <FormItem label="标题">{formDecorators.title(<Input autoComplete="off" allowClear={true} placeholder="请输入标题" />)}</FormItem>
          <FormItem label="内容">{formDecorators.content(<Input.TextArea maxLength={50} rows={4} autoComplete="off" allowClear={true} placeholder="请输入内容" />)}</FormItem>
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

const mapPropsToFields = (props: StoreProps) => {
  const {currentItem} = props;
  return {
    ...currentItem,
  };
};

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminPost!;
  return {
    currentItem: thisModule.currentItem,
    currentOperation: thisModule.routeParams!.currentOperation,
  };
};

export default connect(mapStateToProps)(Form.create()(Component));
