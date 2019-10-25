import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {CurUser, LoginRequest} from 'entity/session';

import {FormComponentProps} from 'antd/lib/form';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  curUser?: CurUser;
}

class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp> {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.form.validateFields((err, values: LoginRequest) => {
      if (!err) {
        this.props.dispatch(actions.session.login(values));
      }
    });
  };

  public render() {
    const {
      curUser,
      form: {getFieldDecorator},
    } = this.props;

    return (
      <div className={styles.root}>
        <div className="panel">
          <div className="welcome">
            <h2>欢迎使用Ant Design</h2>
            <p>服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。</p>
          </div>
          <div className="form">
            <h2>用户登录</h2>
            {curUser && curUser.hasLogin ? (
              <div>您已登录，请先退出当前登录！</div>
            ) : (
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{required: true, message: 'Please input your username!'}],
                  })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                  })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>Remember me</Checkbox>)}
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <a href="">register now!</a>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
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
