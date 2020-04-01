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
const AdminHome = loadView('adminHome', 'Main');
const AdminMember = loadView('adminMember', 'List');
const AdminPost = loadView('adminPost', 'List');
const AdminRole = loadView('adminRole', 'List');

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
            {routeViews.adminHome?.Main && <AdminHome />}
            {routeViews.adminRole?.List && <AdminRole />}
            {routeViews.adminMember?.List && <AdminMember />}
            {routeViews.adminPost?.List && <AdminPost />}
          </Switch>
          {/*
            <Redirect exact path="/admin" to="/admin/home" />

            <Route path="/admin/role/:listView" component={AdminRole} />
            <Route path="/admin/member/:listView" component={AdminMember} />
            <Route path="/admin/post/:listView" component={AdminPost} />
            <Route component={NotFound} />
          </Switch> */}
        </Content>
      </Layout>
    </Layout>
  ) : null;
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    routeViews: state.route.data.views,
    hasLogin: state.app!.curUser!.hasLogin,
    siderCollapsed: !!state.adminLayout!.siderCollapsed,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
