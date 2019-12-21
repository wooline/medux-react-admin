import {Redirect, Route, Switch} from 'react-router-dom';

import {CurUser} from 'entity/session';
import Flag from '../Flag';
import Header from '../Header';
import {Layout} from 'antd';
import Navs from '../Navs';
import NotFound from 'components/NotFound';
import React from 'react';
import TabNavs from '../TabNavs';
import {connect} from 'react-redux';
import styles from './index.m.less';

const {Content, Footer} = Layout;
const AdminHome = loadView('adminHome', 'Main');
const AdminMember = loadView('adminMember', 'Main');
const AdminRole = loadView('adminRole', 'Main');

interface StoreProps {
  hasLogin: boolean;
  siderCollapsed: boolean;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    const {siderCollapsed, hasLogin} = this.props;
    return (
      hasLogin && (
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
              <Switch>
                <Redirect exact path="/admin" to="/admin/home" />
                <Route exact path="/admin/home" component={AdminHome} />
                <Route exact path="/admin/role/:listView" component={AdminRole} />
                <Route path="/admin/member/:listView" component={AdminMember} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      )
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    hasLogin: state.app!.curUser!.hasLogin,
    siderCollapsed: !!state.adminLayout!.siderCollapsed,
  };
};

export default connect(mapStateToProps)(Component);
