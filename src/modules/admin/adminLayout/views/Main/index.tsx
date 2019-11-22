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
  curUser: CurUser;
  siderCollapsed: boolean;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    const {siderCollapsed, curUser} = this.props;
    return (
      this.props.curUser.hasLogin && (
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
                <Route exact path="/admin/member" component={AdminMember} />
                <Route exact path="/admin/role" component={AdminRole} />
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
    curUser: state.app!.curUser!,
    siderCollapsed: !!state.adminLayout!.siderCollapsed,
  };
};

export default connect(mapStateToProps)(Component);
