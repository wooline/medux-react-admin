import {Avatar, Badge, Dropdown, Icon, Menu} from 'antd';
import {Link, NavLink} from 'react-router-dom';

import {CurUser} from 'entity/session';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  notices: number;
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
        throw new Error('自定义出错！');
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
    const {siderCollapsed, curUser, notices} = this.props;
    return (
      <div className={styles.root}>
        <div className="main">
          <Icon className="toggleSider" type={siderCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleSider} />
          <Link to={metaKeys.ArticleHomePathname}>
            <Icon type="question-circle-o" /> 帮助指南
          </Link>
        </div>
        <div className="side">
          <Badge count={notices} className="noticeIcon">
            <Icon type="bell" />
          </Badge>
          <Dropdown overlay={this.menu}>
            <span className="account">
              <Avatar size="small" className="avatar" src={curUser.avatar} />
              <span>{curUser.username}</span>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    notices: state.app!.notices.count,
    curUser: state.app!.curUser!,
    siderCollapsed: !!state.adminLayout!.siderCollapsed,
  };
};

export default connect(mapStateToProps)(Component);
