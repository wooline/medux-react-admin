import {Avatar, Badge, Dropdown, Menu} from 'antd';
import {BellOutlined, CloseCircleOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import React, {useCallback, useMemo} from 'react';

import {CurUser} from 'entity/session';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  notices: number;
  curUser: CurUser;
  siderCollapsed: boolean;
}

const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, siderCollapsed, curUser, notices}) => {
  const toggleSider = useCallback(() => {
    dispatch(actions.adminLayout.putSiderCollapsed(!siderCollapsed));
  }, [siderCollapsed, dispatch]);
  const onMenuItemClick = useCallback(
    ({key}: {key: string}) => {
      if (key === 'logout') {
        dispatch(actions.app.logout());
      } else if (key === 'triggerError') {
        setTimeout(() => {
          throw new Error('自定义出错！');
        }, 0);
      }
    },
    [dispatch]
  );
  const menu = useMemo(
    () => (
      <Menu className="adminLayout-header-menu" selectedKeys={[]} onClick={onMenuItemClick}>
        <Menu.Item disabled>
          <UserOutlined /> 个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <SettingOutlined /> 设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <CloseCircleOutlined /> 触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined /> 退出登录
        </Menu.Item>
      </Menu>
    ),
    [onMenuItemClick]
  );
  return (
    <div className={styles.root}>
      <div className="main">
        {siderCollapsed ? <MenuUnfoldOutlined className="toggleSider" onClick={toggleSider} /> : <MenuFoldOutlined className="toggleSider" onClick={toggleSider} />}
        <Link to={metaKeys.ArticleHomePathname}>
          <QuestionCircleOutlined /> 帮助指南
        </Link>
      </div>
      <div className="side">
        <Badge count={notices} className="noticeIcon">
          <BellOutlined />
        </Badge>
        <Dropdown overlay={menu}>
          <span className="account">
            <Avatar size="small" className="avatar" src={curUser.avatar} />
            <span>{curUser.username}</span>
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    notices: state.app!.notices.count,
    curUser: state.app!.curUser!,
    siderCollapsed: !!state.adminLayout!.siderCollapsed,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
