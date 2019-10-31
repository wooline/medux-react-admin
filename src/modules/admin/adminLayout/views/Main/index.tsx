import {Icon, Layout, Menu} from 'antd';
import {Redirect, Route, Switch} from 'react-router-dom';

import {CurUser} from 'entity/session';
import Header from '../Header';
import NotFound from 'components/NotFound';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

const {Sider, Content, Footer} = Layout;
const AdminHome = loadView('adminHome', 'Main');

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
          <Sider trigger={null} collapsible collapsed={siderCollapsed}>
            sider
          </Sider>
          <Layout>
            <Layout.Header style={{background: '#fff', padding: 0}}>
              <Header />
            </Layout.Header>
            <Content>
              <Switch>
                <Redirect exact path="/admin" to="/admin/home" />
                <Route exact path="/admin/home" component={AdminHome} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
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

/**
 * <div>
          <Header />

        </div>
 */
