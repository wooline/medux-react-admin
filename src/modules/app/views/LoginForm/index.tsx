import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {CurUser, LoginRequest} from 'entity/session';

import {FormComponentProps} from 'antd/lib/form';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  curUser: CurUser;
  isPop: boolean;
}

class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp> {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.form.validateFields((err, values: LoginRequest) => {
      if (!err) {
        this.props.dispatch(actions.app.login(values));
      }
    });
  };
  handleUserHome = () => {
    this.props.isPop && this.props.dispatch(actions.app.closesLoginOrRegisterPop());
    historyActions.push(metaKeys.UserHomePathname);
  };
  handleLogout = () => {
    this.props.dispatch(actions.app.logout());
  };
  handleRegister = () => {
    if (this.props.isPop) {
      this.props.dispatch(actions.app.openLoginOrRegisterPop('register'));
    } else {
      historyActions.push(metaKeys.RegisterPathname);
    }
  };
  public render() {
    const {
      curUser,
      form: {getFieldDecorator},
    } = this.props;

    return (
      <div className={styles.root}>
        <h2 className="title">用户登录</h2>

        {curUser.hasLogin ? (
          <div className="hasLogin">
            <p>
              亲爱的{' '}
              <span className="link" onClick={this.handleUserHome}>
                {curUser.username}
              </span>
              ，您已登录，是否要退出当前登录？
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
                rules: [{required: true, message: '请输入密码!'}],
              })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
            </Form.Item>
            <Form.Item style={{marginBottom: 0}}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <span className="register link" onClick={this.handleRegister}>
                注册新用户
              </span>
              <Button size="large" type="primary" htmlType="submit" className="submit">
                立即登录
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
    isPop: state.app!.showLoginOrRegisterPop === 'login',
  };
};

export default connect(mapStateToProps)(Form.create()(Component));
