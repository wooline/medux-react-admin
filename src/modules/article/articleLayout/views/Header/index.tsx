import {LogoutOutlined, UserAddOutlined} from '@ant-design/icons';
import React, {useCallback} from 'react';

import {CurUser} from 'entity/session';
import {Link} from '@medux/react-web-router';
import LoginLink from 'components/LoginLink';
import Logo from 'assets/imgs/logo.svg';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  pathname: string;
  curUser: CurUser;
}

const Component: React.FC<StoreProps & DispatchProp> = ({pathname, curUser, dispatch}) => {
  const onLogout = useCallback(() => {
    dispatch(actions.app.logout());
  }, [dispatch]);
  return (
    <header className={styles.root}>
      <div className="g-doc">
        <div className="main">
          <img className="logo" height="35" src={Logo} />
          <h1>帮助中心</h1>
          <Link className={pathname === '/article/home' ? 'active' : ''} href="/article/home">
            用户指南
          </Link>
          <Link className={pathname === '/article/service' ? 'active' : ''} href="/article/service">
            售后服务
          </Link>
          <Link className={pathname === '/article/about' ? 'active' : ''} href="/article/about">
            关于我们
          </Link>
        </div>
        <div className="sider">
          {curUser.hasLogin ? (
            <>
              <span>欢迎您 {curUser.username}</span>
              <Link href="/admin/" className="user">
                管理中心
              </Link>
              <span className="link" onClick={onLogout}>
                <LogoutOutlined />
                &nbsp;退出
              </span>
            </>
          ) : (
            <>
              <LoginLink className="user">登录</LoginLink>
              <LoginLink register>
                <UserAddOutlined />
                &nbsp;注册
              </LoginLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
//TODO
//{metaKeys.UserHomePathname}
const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const app = state.app!;
  return {
    pathname: state.route.location.pathname,
    curUser: app.curUser!,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
