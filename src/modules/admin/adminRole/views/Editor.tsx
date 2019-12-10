import {Button, Form, Icon, Input} from 'antd';
import {createForm, getFormDecorators} from 'common/utils';

import {FormComponentProps} from 'antd/lib/form';
import PurviewEditor from 'components/PurviewEditor';
import React from 'react';
import {UpdateItem} from 'entity/role';
import {connect} from 'react-redux';
import styles from './index.m.less';

const FormItem = Form.Item;

export const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
  dataSource?: UpdateItem;
}

interface State {
  purviewsError?: string;
}

class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp, State> {
  static getDerivedStateFromProps(nextProps: StoreProps, prevState: State): State | null {
    if (!nextProps.currentOperation) {
      return {
        ...prevState,
        purviewsError: '',
      };
    }
    return null;
  }

  state: State = {};

  validatePurview = (rule: {message: string}, value: string[] | undefined, callback: (err?: string) => void) => {
    if (!value || !value.length) {
      this.setState({purviewsError: rule.message});
      callback(rule.message);
    } else {
      callback();
    }
  };
  onPurviewChange = (arr?: string[]) => {
    if (arr && arr.length) {
      this.setState({purviewsError: ''});
    }
  };
  onHide = () => {
    this.props.dispatch(actions.adminRole.putCurrentItem());
  };
  onReset = () => {
    this.setState({purviewsError: ''});
    this.props.form.resetFields();
  };

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {validateFields, getFieldError} = this.props.form;
    validateFields((errors, values: UpdateItem) => {
      if (!errors) {
        const id = this.props.dataSource!.id;
        if (id) {
          this.props.dispatch(actions.adminRole.updateItem({...values, id}));
        } else {
          this.props.dispatch(actions.adminRole.createItem({...values, id}));
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
    const {purviewsError = ''} = this.state;
    if (dataSource) {
      const formDecorators = getFormDecorators<UpdateItem>(
        form,
        {
          roleName: {rules: [{required: true, message: '请输入角色名称'}]},
          purviews: {rules: [{validator: this.validatePurview, message: '请至少配置一项权限'}]},
        },
        mapPropsToFields(this.props)
      );

      return (
        <Form className={styles.root} layout="horizontal" {...formItemLayout} onSubmit={this.onSubmit}>
          <div>
            <FormItem label="角色名称">{formDecorators.roleName(<Input autoComplete="off" allowClear={true} placeholder="请输入角色名称" />)}</FormItem>
            <FormItem label="备注">{formDecorators.remark(<Input.TextArea autoComplete="off" allowClear={true} placeholder="请输入备注" />)}</FormItem>
          </div>
          <div className="purviews">
            <h4>
              <Icon type="caret-down" style={{marginRight: 5}} />
              权限设置
            </h4>
            {formDecorators.purviews(<PurviewEditor onChange={this.onPurviewChange} />)}
          </div>
          <div className={'purviewsError' + (purviewsError ? ' show' : '')}>* {purviewsError}</div>
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
  const thisModule = state.adminRole!;
  return {
    currentOperation: thisModule.currentOperation,
    dataSource: thisModule.currentItem,
  };
};
const mapPropsToFields = (props: StoreProps) => {
  return {
    ...props.dataSource,
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
