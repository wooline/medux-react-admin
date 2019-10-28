import {RouteComponentProps, withRouter} from 'react-router-dom';

import {Icon} from 'antd';
import {Link} from 'react-router-dom';
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
            <Link to={metaKeys.HomePathname} className="logo g-clearfix">
              <h1>帮助中心</h1>
            </Link>
            <Link to={metaKeys.UserHomePathname}>用户指南</Link>
            <Link to={metaKeys.UserHomePathname}>售后服务</Link>
            <Link to={metaKeys.UserHomePathname}>关于我们</Link>
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
