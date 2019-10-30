import 'moment/locale/zh-cn';

import {Redirect, Route, Switch} from 'react-router-dom';

import {ConfigProvider} from 'antd';
import {CurUser} from 'entity/session';
import GlobalLoading from '../GlobalLoading';
import LoginPage from '../LoginPage';
import LoginPop from '../LoginPop';
import NotFound from 'components/NotFound';
import {ProjectConfig} from 'entity/common';
import React from 'react';
import RegisterPage from '../RegisterPage';
import RegisterPop from '../RegisterPop';
import {connect} from 'react-redux';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';

moment.locale('zh-cn');

const AdminLayout = loadView('adminLayout', 'Main');
const ArticleLayout = loadView('articleLayout', 'Main');

interface StoreProps {
  projectConfig?: ProjectConfig;
  curUser?: CurUser;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  public render() {
    const {projectConfig, curUser} = this.props;
    if (projectConfig && curUser) {
      return (
        <ConfigProvider locale={zhCN}>
          <Switch>
            <Redirect exact path="/" to="/admin/" />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="/admin" component={AdminLayout} />
            <Route path="/article" component={ArticleLayout} />
            <Route component={NotFound} />
          </Switch>
          <LoginPop />
          <RegisterPop />
          <GlobalLoading />
        </ConfigProvider>
      );
    } else {
      return null;
    }
  }
  public componentDidMount() {
    document.title = `${initEnv.pageNames[location.pathname] || ''}-${initEnv.siteName}`;
  }
  public componentDidUpdate() {
    document.title = `${initEnv.pageNames[location.pathname] || ''}-${initEnv.siteName}`;
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const app = state.app!;
  return {
    projectConfig: app.projectConfig,
    curUser: state.app!.curUser,
  };
};

export default connect(mapStateToProps)(Component);
