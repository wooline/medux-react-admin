import {Link, NavLink} from 'react-router-dom';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {Icon} from 'antd';
import Logo from 'assets/imgs/logo.svg';
import React from 'react';
import style from './index.m.less';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <header className={style.root}>
        <div className="g-doc">
          <div className="main">
            <img className="logo" height="35" src={Logo} alt={initEnv.siteName} />
            <h1>帮助中心</h1>
            <NavLink to="/article/home">用户指南</NavLink>
            <NavLink to="/article/service">售后服务</NavLink>
            <NavLink to="/article/about">关于我们</NavLink>
          </div>
          <div className="sider">
            <Link to={metaKeys.LoginPathname}>
              <Icon type="shopping" /> 回商城
            </Link>
            <Link to={metaKeys.LoginPathname}>
              <Icon type="user" /> 个人中心
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Component;
