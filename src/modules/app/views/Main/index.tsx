import 'moment/locale/zh-cn';

import {Redirect, Route, Switch} from 'react-router-dom';

import {ConfigProvider} from 'antd';
import GlobalLoading from '../GlobalLoading';
import NotFound from 'components/NotFound';
import {ProjectConfig} from 'entity/common';
import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';

moment.locale('zh-cn');

const LoginPop = loadView('session', 'LoginPop');
const LoginPage = loadView('session', 'LoginPage');
const RegisterPage = loadView('session', 'RegisterPage');
const AdminLayout = loadView('adminLayout', 'Main');
const ArticleLayout = loadView('articleLayout', 'Main');

interface StoreProps {
  projectConfig?: ProjectConfig;
  showLoginPop?: boolean;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  public render() {
    const {showLoginPop, projectConfig} = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        {projectConfig ? (
          <>
            <Switch>
              <Redirect exact path="/" to="/admin/" />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route path="/admin" component={AdminLayout} />
              <Route path="/article" component={ArticleLayout} />
              <Route component={NotFound} />
            </Switch>
            {showLoginPop && <LoginPop />}
            <GlobalLoading />
          </>
        ) : (
          <>loading</>
        )}
      </ConfigProvider>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const app = state.app!;
  return {
    projectConfig: app.projectConfig,
    showLoginPop: state.session && state.session.showLoginPop,
  };
};

export default connect(mapStateToProps)(Component);
