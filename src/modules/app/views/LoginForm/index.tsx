import {Button, Checkbox, Form, Input} from 'antd';
import {CurUser, LoginRequest} from 'entity/session';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import React, {useCallback} from 'react';

import {connect} from 'react-redux';
import {getFormDecorators} from 'common/utils';
import useLoginLink from 'hooks/useLoginLink';
import styles from './index.m.less';

type FormData = Required<LoginRequest>;

const userOutlined = <UserOutlined />;
const lockOutlined = <LockOutlined />;

const initialValues: Partial<FormData> = {
  username: 'admin',
  password: '123456',
  keep: false,
};

interface StoreProps {
  curUser: CurUser;
  isPop: boolean;
}

const fromDecorators = getFormDecorators<FormData>({
  username: {rules: [{required: true, message: '请输入用户名!', whitespace: true}]},
  password: {rules: [{required: true, message: '请输入密码!', whitespace: true}]},
  keep: {valuePropName: 'checked'},
});

const Component: React.FC<StoreProps & DispatchProp> = ({curUser, isPop, dispatch}) => {
  const [form] = Form.useForm();
  const {handleUserHome, handleLogout, handleRegister} = useLoginLink(isPop, dispatch);
  const onFinish = useCallback(
    (values: FormData) => {
      const result: Promise<void> = dispatch(actions.app.login(values)) as any;
      result.catch((err) => {
        form.setFields([{name: 'password', errors: [err.message]}]);
      });
    },
    [dispatch, form]
  );

  React.useEffect(() => {
    if (!isPop) {
      form.resetFields();
    }
  }, [isPop, form]);
  return (
    <div className={styles.root}>
      <h2 className="title">用户登录</h2>

      {curUser.hasLogin && !curUser.expired ? (
        <Form form={form} className="hasLogin">
          <p>
            亲爱的{' '}
            <span className="link" onClick={handleUserHome}>
              {curUser.username}
            </span>
            ，您已登录，是否要退出当前登录？
          </p>
          <Button size="large" type="primary" onClick={handleLogout} className="submit">
            退出当前登录
          </Button>
        </Form>
      ) : (
        <Form form={form} onFinish={onFinish as any} initialValues={initialValues}>
          <Form.Item {...fromDecorators.username}>
            <Input size="large" allowClear prefix={userOutlined} placeholder="用户名" />
          </Form.Item>
          <Form.Item {...fromDecorators.password}>
            <Input size="large" allowClear prefix={lockOutlined} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item style={{marginBottom: 0}}>
            <Form.Item {...fromDecorators.keep} noStyle>
              <Checkbox>自动登录</Checkbox>
            </Form.Item>
            <span className="register link" onClick={handleRegister}>
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
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    curUser: state.app!.curUser!,
    isPop: state.app!.showLoginOrRegisterPop === 'login',
  };
};

export default connect(mapStateToProps)(React.memo(Component));
