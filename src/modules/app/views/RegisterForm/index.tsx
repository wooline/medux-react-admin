import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {CurUser, RegisterRequest} from 'entity/session';

import {FormComponentProps} from 'antd/lib/form';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  curUser: CurUser;
  isPop: boolean;
}
interface ComponentState {
  confirmDirty: boolean;
}
class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp, ComponentState> {
  state = {
    confirmDirty: false,
  };
  handleUserHome = () => {
    this.props.isPop && this.props.dispatch(actions.app.closesLoginOrRegisterPop());
    historyActions.push(metaKeys.UserHomePathname);
  };
  handleLogin = () => {
    if (this.props.isPop) {
      this.props.dispatch(actions.app.openLoginOrRegisterPop('login'));
    } else {
      historyActions.push(metaKeys.LoginPathname);
    }
  };
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.form.validateFields((err, values: RegisterRequest) => {
      if (!err) {
        this.props.dispatch(actions.app.register(values));
      }
    });
  };
  handleLogout = () => {
    this.props.dispatch(actions.app.logout());
  };
  handleConfirmBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const {value} = event.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };
  handleAgreement = () => {
    this.props.dispatch(actions.app.showRegistrationAgreement(true));
  };
  compareToFirstPassword = (rule: any, value: string, callback: (err?: string) => void) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule: any, value: string, callback: (err?: string) => void) => {
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };
  agreementChecked = (rule: any, value: string, callback: (err?: string) => void) => {
    if (!value) {
      callback('您必须同意注册协议!');
    } else {
      callback();
    }
  };
  public render() {
    const {
      curUser,
      form: {getFieldDecorator},
    } = this.props;

    return (
      <div className={styles.root}>
        <h2 className="title">注册新用户</h2>

        {curUser.hasLogin ? (
          <div className="hasLogin">
            <p>
              亲爱的{' '}
              <span className="link" onClick={this.handleUserHome}>
                {curUser.username}
              </span>
              ，您已登录，请先退出当前登录
            </p>
            <Button size="large" type="primary" onClick={this.handleLogout} className="submit">
              退出当前登录
            </Button>
          </div>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请输入用户名!'}],
              })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {required: true, message: '请输入密码!'},
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [
                  {required: true, message: '请再次输入密码!'},
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input prefix={<Icon type="lock" />} type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                rules: [
                  {
                    validator: this.agreementChecked,
                  },
                ],
              })(<Checkbox>我已阅读并同意</Checkbox>)}
              <span className="link" onClick={this.handleAgreement}>
                注册协议
              </span>
              <div className="login">
                已有帐户？
                <span className="link" onClick={this.handleLogin}>
                  登录
                </span>
              </div>
              <Button size="large" type="primary" htmlType="submit" className="submit">
                提交注册
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curUser: state.app!.curUser!,
    isPop: state.app!.showLoginOrRegisterPop === 'register',
  };
};

export default connect(mapStateToProps)(Form.create()(Component));
