import 'moment/locale/zh-cn';

import {ConfigProvider} from 'antd';
import GlobalLoading from '../GlobalLoading';
import LoginPage from '../LoginPage';
import LoginPop from '../LoginPop';
import NotFound from 'components/NotFound';
import React from 'react';
import RegisterPage from '../RegisterPage';
import RegisterPop from '../RegisterPop';
import RegistrationAgreement from '../RegistrationAgreement';
import {Switch} from '@medux/react-web-router';
import {connect} from 'react-redux';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';

moment.locale('zh-cn');

const AdminLayout = loadView('adminLayout', 'Main');
const ArticleLayout = loadView('articleLayout', 'Main');

interface StoreProps {
  routeViews: RouteViews;
  projectConfigLoaded: boolean;
  curUserLoaded: boolean;
}

const Component: React.FC<StoreProps & DispatchProp> = ({routeViews, projectConfigLoaded, curUserLoaded}) => {
  const title = `${pageNames[location.pathname] || document.title || pageNames['/']}`;
  React.useEffect(() => {
    document.title = title;
  }, [title]);
  if (projectConfigLoaded && curUserLoaded) {
    return (
      <ConfigProvider locale={zhCN}>
        <Switch elseView={<NotFound />}>
          {routeViews.app?.LoginPage && <LoginPage />}
          {routeViews.app?.RegisterPage && <RegisterPage />}
          {routeViews.adminLayout?.Main && <AdminLayout />}
          {routeViews.articleLayout?.Main && <ArticleLayout />}
          {/* <Redirect exact path="/" to="/admin/" />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/admin" component={AdminLayout} />
          <Route path="/article" component={ArticleLayout} />
          <Route component={NotFound} /> */}
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

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const app = state.app!;
  return {
    routeViews: state.route.data.views,
    projectConfigLoaded: !!app.projectConfig,
    curUserLoaded: !!state.app!.curUser,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
