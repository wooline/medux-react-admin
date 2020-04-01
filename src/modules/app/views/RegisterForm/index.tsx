import {Button, Checkbox, Form, Input} from 'antd';
import {CurUser, RegisterRequest} from 'entity/session';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import React, {useCallback} from 'react';
import {getFormDecorators, pick} from 'common/utils';

import {connect} from 'react-redux';
import styles from './index.m.less';
import useLoginLink from 'hooks/useLoginLink';

const userOutlined = <UserOutlined />;
const lockOutlined = <LockOutlined />;
const lockOutlined2 = <LockOutlined />;

interface FormData extends Required<RegisterRequest> {
  confirm: string;
  agreement: boolean;
}
const initialValues: FormData = {
  username: '',
  password: '',
  confirm: '',
  agreement: false,
};
const agreementChecked = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject('您必须同意注册协议!');
  } else {
    return Promise.resolve();
  }
};
const fromDecorators = getFormDecorators<FormData>({
  username: {rules: [{required: true, message: '请输入用户名!'}]},
  password: {rules: [{required: true, message: '请输入密码!'}]},
  confirm: {
    rules: [
      {required: true, message: '请再次输入密码!'},
      ({getFieldValue}) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject('2次密码输入不一至!');
        },
      }),
    ],
    dependencies: ['password'],
  },
  agreement: {valuePropName: 'checked', rules: [{validator: agreementChecked}]},
});

interface StoreProps {
  curUser: CurUser;
  isPop: boolean;
}
const Component: React.FC<StoreProps & DispatchProp> = ({curUser, isPop, dispatch}) => {
  const [form] = Form.useForm();
  const {handleUserHome, handleLogout, handleLogin} = useLoginLink(isPop, dispatch);

  const onFinish = useCallback(
    (values: FormData) => {
      const data = pick(values, ['username', 'password']);
      const result: Promise<void> = dispatch(actions.app.register(data)) as any;
      result.catch((err) => {
        form.setFields([{name: 'username', errors: [err.message]}]);
      });
    },
    [dispatch, form]
  );
  const handleAgreement = useCallback(() => {
    dispatch(actions.app.showRegistrationAgreement(true));
  }, [dispatch]);

  React.useEffect(() => {
    if (!isPop) {
      form.resetFields();
    }
  }, [isPop, form]);

  return (
    <div className={styles.root}>
      <h2 className="title">注册新用户</h2>

      {curUser.hasLogin && !curUser.expired ? (
        <Form form={form} className="hasLogin">
          <p>
            亲爱的{' '}
            <span className="link" onClick={handleUserHome}>
              {curUser.username}
            </span>
            ，您已登录，请先退出当前登录
          </p>
          <Button size="large" type="primary" onClick={handleLogout} className="submit">
            退出当前登录
          </Button>
        </Form>
      ) : (
        <Form form={form} onFinish={onFinish as any} initialValues={initialValues}>
          <Form.Item {...fromDecorators.username}>
            <Input size="large" prefix={userOutlined} placeholder="用户名" />
          </Form.Item>
          <Form.Item {...fromDecorators.password}>
            <Input size="large" prefix={lockOutlined} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item {...fromDecorators.confirm}>
            <Input size="large" prefix={lockOutlined2} type="password" placeholder="确认密码" />
          </Form.Item>
          <Form.Item>
            <Form.Item {...fromDecorators.agreement} noStyle>
              <Checkbox>我已阅读并同意</Checkbox>
            </Form.Item>
            <span className="link" onClick={handleAgreement}>
              注册协议
            </span>
            <div className="login">
              已有帐户？
              <span className="link" onClick={handleLogin}>
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
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    curUser: state.app!.curUser!,
    isPop: state.app!.showLoginOrRegisterPop === 'register',
  };
};

export default connect(mapStateToProps)(React.memo(Component));
