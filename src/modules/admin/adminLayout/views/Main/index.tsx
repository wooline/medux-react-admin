import Flag from '../Flag';
import Header from '../Header';
import {Layout} from 'antd';
import Navs from '../Navs';
import NotFound from 'components/NotFound';
import React from 'react';
import {Switch} from '@medux/react-web-router';
import TabNavs from '../TabNavs';
import {connect} from 'react-redux';
import styles from './index.m.less';

const {Content} = Layout;
const AdminHome = loadView('adminHome', 'main');
const AdminMember = loadView('adminMember', 'list');
const AdminPost = loadView('adminPost', 'list');
const AdminRole = loadView('adminRole', 'list');

interface StoreProps {
  routeViews: RouteViews;
  hasLogin: boolean;
  siderCollapsed: boolean;
}

const Component: React.FC<StoreProps> = ({routeViews, siderCollapsed, hasLogin}) => {
  return hasLogin ? (
    <Layout className={styles.root}>
      <Layout.Sider className="g-scrollBar" trigger={null} collapsible collapsed={siderCollapsed}>
        <Flag />
        <Navs singleOpen={true} />
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Header />
          <TabNavs />
        </Layout.Header>
        <Content>
          <Switch elseView={<NotFound />}>
            {routeViews.adminHome?.main && <AdminHome />}
            {routeViews.adminRole?.list && <AdminRole />}
            {routeViews.adminMember?.list && <AdminMember />}
            {routeViews.adminPost?.list && <AdminPost />}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  ) : null;
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    routeViews: state.route.data.views,
    hasLogin: state.app!.curUser.hasLogin,
    siderCollapsed: !!state.adminLayout!.siderCollapsed,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
