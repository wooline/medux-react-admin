import {LoadView as BaseLoadView, RootState as BaseState, RouteConfig, exportActions, getBrowserHistory, setRouteConfig} from '@medux/react-web-router';

const defaultRouteParams: {[K in moduleNames]: any} = {
  app: null,
  session: null,
  adminLayout: null,
  articleLayout: null,
  adminHome: null,
  articleHome: null,
};
setRouteConfig({defaultRouteParams});

export enum moduleNames {
  app = 'app',
  session = 'session',
  adminLayout = 'adminLayout',
  articleLayout = 'articleLayout',
  adminHome = 'adminHome',
  articleHome = 'articleHome',
}

// 定义模块的加载方案，同步或者异步均可
export const moduleGetter = {
  app: () => {
    return import(/* webpackChunkName: "app" */ 'modules/app');
  },
  session: () => {
    return import(/* webpackChunkName: "session" */ 'modules/session');
  },
  adminLayout: () => {
    return import(/* webpackChunkName: "adminLayout" */ 'modules/admin/adminLayout');
  },
  articleLayout: () => {
    return import(/* webpackChunkName: "articleLayout" */ 'modules/article/articleLayout');
  },
  adminHome: () => {
    return import(/* webpackChunkName: "adminHome" */ 'modules/admin/adminHome');
  },
  articleHome: () => {
    return import(/* webpackChunkName: "articleHome" */ 'modules/article/articleHome');
  },
};
export const actions = exportActions(moduleGetter);

export type RootState = BaseState<typeof moduleGetter>;

export type LoadView = BaseLoadView<typeof moduleGetter, React.ComponentType<any>>;

export const {historyActions, toUrl} = getBrowserHistory<RootState['route']['data']['params']>();

export const routeConfig: RouteConfig = {
  '/': [
    'app.Main',
    {
      '/login': 'session.LoginPage',
      '/admin': [
        'adminLayout.Main',
        {
          '/admin/home': 'adminHome.Main',
        },
      ],
      '/article': [
        'articleLayout.Main',
        {
          '/article/home': 'articleHome.Main',
        },
      ],
    },
  ],
};
