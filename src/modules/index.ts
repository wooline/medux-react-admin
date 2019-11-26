import {LoadView as BaseLoadView, RootState as BaseState, RouteConfig, exportActions, getBrowserHistory, setRouteConfig} from '@medux/react-web-router';

import adminMemberParams from 'modules/admin/adminMember/meta';
import adminRoleParams from 'modules/admin/adminRole/meta';

const defaultRouteParams: {[K in moduleNames]: any} = {
  app: null,
  adminLayout: null,
  adminHome: null,
  adminRole: adminRoleParams,
  adminMember: adminMemberParams,
  articleLayout: null,
  articleHome: null,
  articleAbout: null,
  articleService: null,
};
setRouteConfig({defaultRouteParams});

export enum moduleNames {
  app = 'app',
  adminLayout = 'adminLayout',
  adminRole = 'adminRole',
  adminHome = 'adminHome',
  adminMember = 'adminMember',
  articleLayout = 'articleLayout',
  articleHome = 'articleHome',
  articleAbout = 'articleAbout',
  articleService = 'articleService',
}

// 定义模块的加载方案，同步或者异步均可
export const moduleGetter = {
  app: () => {
    return import(/* webpackChunkName: "app" */ 'modules/app');
  },
  adminLayout: () => {
    return import(/* webpackChunkName: "adminLayout" */ 'modules/admin/adminLayout');
  },
  adminHome: () => {
    return import(/* webpackChunkName: "adminHome" */ 'modules/admin/adminHome');
  },
  adminRole: () => {
    return import(/* webpackChunkName: "adminRole" */ 'modules/admin/adminRole');
  },
  adminMember: () => {
    return import(/* webpackChunkName: "adminMember" */ 'modules/admin/adminMember');
  },
  articleLayout: () => {
    return import(/* webpackChunkName: "articleLayout" */ 'modules/article/articleLayout');
  },
  articleHome: () => {
    return import(/* webpackChunkName: "articleHome" */ 'modules/article/articleHome');
  },
  articleAbout: () => {
    return import(/* webpackChunkName: "articleAbout" */ 'modules/article/articleAbout');
  },
  articleService: () => {
    return import(/* webpackChunkName: "articleService" */ 'modules/article/articleService');
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
      '/login': 'app.LoginPage',
      '/register': 'app.Register',
      '/admin': [
        'adminLayout.Main',
        {
          '/admin/home': 'adminHome.Main',
          '/admin/role': 'adminRole.Main',
          '/admin/member': 'adminMember.Main',
        },
      ],
      '/article': [
        'articleLayout.Main',
        {
          '/article/home': 'articleHome.Main',
          '/article/about': 'articleAbout.Main',
          '/article/service': 'articleService.Main',
        },
      ],
    },
  ],
};
export const pageNames = {
  '/': 'Demo',
  '/login': '登录',
  '/register': '注册',
  '/article/home': '帮助中心',
  '/article/service': '用户服务',
  '/article/about': '关于我们',
  '/admin/home': '管理中心',
  '/admin/role': '角色列表',
  '/admin/member': '用户列表',
};
