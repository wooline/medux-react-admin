import {Avatar, Badge, Button, Dropdown, Icon, Menu, Popover, Tooltip} from 'antd';
import {Link, NavLink} from 'react-router-dom';

import {CurUser} from 'entity/session';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  curUser: CurUser;
  siderCollapsed: boolean;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  toggleSider = () => {
    const {siderCollapsed} = this.props;
    this.props.dispatch(actions.adminLayout.putSiderCollapsed(!siderCollapsed));
  };
  onMenuItemClick = ({key}: {key: string}) => {
    if (key === 'logout') {
      this.props.dispatch(actions.app.logout());
    } else if (key === 'triggerError') {
      setTimeout(() => {
        throw '自定义出错！';
      }, 0);
    }
  };
  menu = (
    <Menu className="adminLayout-header-menu" selectedKeys={[]} onClick={this.onMenuItemClick}>
      <Menu.Item disabled>
        <Icon type="user" /> 个人中心
      </Menu.Item>
      <Menu.Item disabled>
        <Icon type="setting" /> 设置
      </Menu.Item>
      <Menu.Item key="triggerError">
        <Icon type="close-circle" /> 触发报错
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" /> 退出登录
      </Menu.Item>
    </Menu>
  );
  public render() {
    const {siderCollapsed, curUser} = this.props;
    return (
      <div className={styles.root}>
        <div className="main">
          <Icon className="toggleSider" type={siderCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleSider} />
          <Link to={metaKeys.ArticleHomePathname}>
            <Icon type="question-circle-o" /> 帮助指南
          </Link>
        </div>
        <div className="side">
          <Tooltip title="使用文档">
            <a target="_blank" href="http://pro.ant.design/docs/getting-started" rel="noopener noreferrer" className="action">
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <Dropdown overlay={this.menu}>
            <span className="action account">
              <Avatar size="small" className="avatar" src={curUser.avatar} />
              <span className="name">{curUser.username}</span>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curUser: state.app!.curUser!,
    siderCollapsed: !!state.adminLayout!.siderCollapsed,
  };
};

export default connect(mapStateToProps)(Component);
