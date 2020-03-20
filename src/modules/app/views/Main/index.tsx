import 'moment/locale/zh-cn';

import {Redirect, Route, Switch} from 'react-router-dom';

import {ConfigProvider} from 'antd';
import GlobalLoading from '../GlobalLoading';
import LoginPage from '../LoginPage';
import LoginPop from '../LoginPop';
import NotFound from 'components/NotFound';
import React from 'react';
import RegisterPage from '../RegisterPage';
import RegisterPop from '../RegisterPop';
import RegistrationAgreement from '../RegistrationAgreement';
import {connect} from 'react-redux';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';

moment.locale('zh-cn');

const AdminLayout = loadView('adminLayout', 'Main');
const ArticleLayout = loadView('articleLayout', 'Main');

interface StoreProps {
  projectConfigLoaded: boolean;
  curUserLoaded: boolean;
}

const Component: React.FC<StoreProps & DispatchProp> = ({projectConfigLoaded, curUserLoaded}) => {
  const title = `${pageNames[location.pathname] || document.title || pageNames['/']}`;
  React.useEffect(() => {
    document.title = title;
  }, [title]);
  if (projectConfigLoaded && curUserLoaded) {
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
        <GlobalLoading />
        <RegisterPop />
        <RegistrationAgreement />
        <LoginPop />
      </ConfigProvider>
    );
  } else {
    return null;
  }
};

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const app = state.app!;
  return {
    projectConfigLoaded: !!app.projectConfig,
    curUserLoaded: !!state.app!.curUser,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
