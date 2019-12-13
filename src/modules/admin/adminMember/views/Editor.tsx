import {Button, Form, Input, Select} from 'antd';
import {DGender, DStatus, UpdateItem} from 'entity/member';
import {createForm, getFormDecorators} from 'common/utils';

import {FormComponentProps} from 'antd/lib/form';
import React from 'react';
import ResourceSelector from 'components/ResourceSelector';
import {connect} from 'react-redux';
import styles from './index.m.less';

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
    this.props.dispatch(actions.adminMember.execCurrentItem());
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
          //this.props.dispatch(actions.adminRole.updateItem({...values, id}));
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
        },
        mapPropsToFields(this.props)
      );

      return (
        <Form className={styles.root} layout="horizontal" {...formItemLayout} onSubmit={this.onSubmit}>
          <FormItem label="用户名">{formDecorators.username(<Input autoComplete="off" allowClear={true} placeholder="请输入用户名" />)}</FormItem>
          <FormItem label="呢称">{formDecorators.nickname(<Input autoComplete="off" allowClear={true} placeholder="请输入呢称" />)}</FormItem>
          <FormItem label="角色">
            {formDecorators.role(<ResourceSelector title="请选择角色" placeholder="请选择角色" resourceNameField="roleName" allowClear={true} resource={RoleSelector} />)}
          </FormItem>
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
