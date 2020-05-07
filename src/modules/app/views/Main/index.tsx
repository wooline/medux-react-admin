import 'assets/css/global.m.less';
import 'assets/css/override.less';
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
}

const Component: React.FC<StoreProps & DispatchProp> = ({routeViews}) => {
  const title = `@Medux-${pageNames[location.pathname] || document.title || pageNames['/']}`;
  React.useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <ConfigProvider locale={zhCN}>
      <Switch elseView={<NotFound />}>
        {routeViews.app?.LoginPage && <LoginPage />}
        {routeViews.app?.RegisterPage && <RegisterPage />}
        {routeViews.adminLayout?.Main && <AdminLayout />}
        {routeViews.articleLayout?.Main && <ArticleLayout />}
      </Switch>
      <GlobalLoading />
      <RegisterPop />
      <RegistrationAgreement />
      <LoginPop />
    </ConfigProvider>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const app = state.app!;
  return {
    routeViews: state.route.data.views,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
