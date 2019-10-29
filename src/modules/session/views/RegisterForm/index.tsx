import {Button, Form, Icon, Input} from 'antd';
import {CurUser, LoginRequest} from 'entity/session';

import {FormComponentProps} from 'antd/lib/form';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  curUser?: CurUser;
}
interface ComponentState {
  confirmDirty: boolean;
}
class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp, ComponentState> {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.form.validateFields((err, values: LoginRequest) => {
      if (!err) {
        this.props.dispatch(actions.session.login(values));
      }
    });
  };
  handleLogout = () => {
    this.props.dispatch(actions.session.logout());
  };
  handleConfirmBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const {value} = event.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
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
  public render() {
    const {
      curUser,
      form: {getFieldDecorator},
    } = this.props;

    return (
      <div className={styles.root}>
        <h2 className="title">注册新用户</h2>

        {curUser && curUser.hasLogin ? (
          <div className="hasLogin">
            <p>
              亲爱的 <Link to={metaKeys.UserHomePathname}>{curUser.username}</Link>，您已登录，请先退出当前登录
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
              已有帐户？
              <Link className="login" to={metaKeys.LoginPathname}>
                登录
              </Link>
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
    curUser: state.session && state.session.curUser,
  };
};

export default connect(mapStateToProps)(Form.create()(Component));
