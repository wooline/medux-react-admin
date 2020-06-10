import * as reactWebRouter from '@medux/react-web-router';

import {RouteConfig, exportActions} from '@medux/react-web-router';

import {defaultRouteParams as adminMemberParams} from 'entity/member';
import {defaultRouteParams as adminPostParams} from 'entity/post';
import {defaultRouteParams as adminRoleParams} from 'entity/role';

export const defaultRouteParams: {[K in moduleNames]: any} = {
  app: null,
  adminLayout: null,
  adminHome: null,
  adminRole: adminRoleParams,
  adminMember: adminMemberParams,
  adminPost: adminPostParams,
  articleLayout: null,
  articleHome: null,
  articleAbout: null,
  articleService: null,
};

export enum moduleNames {
  app = 'app',
  adminLayout = 'adminLayout',
  adminHome = 'adminHome',
  adminRole = 'adminRole',
  adminMember = 'adminMember',
  adminPost = 'adminPost',
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
  adminPost: () => {
    return import(/* webpackChunkName: "adminPost" */ 'modules/admin/adminPost');
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

export type RootState = reactWebRouter.RootState<typeof moduleGetter>;

export type RouteViews = reactWebRouter.RouteViews<typeof moduleGetter>;

export type LoadView = reactWebRouter.LoadView<typeof moduleGetter>;

export type BrowserRouter = reactWebRouter.BrowserRouter<RootState['route']['data']['params']>;

export const routeConfig: RouteConfig = {
  '/$': '@./admin/home',
  '/': [
    'app.Main',
    {
      '/login': 'app.LoginPage',
      '/register': 'app.RegisterPage',
      '/admin$': '@./admin/home',
      '/admin': [
        'adminLayout.Main',
        {
          '/admin/home': 'adminHome.Main',
          '/admin/role/:listView': [
            'adminRole.List',
            {
              '/admin/role/:listView/:itemView/:itemId': 'adminRole.Item',
            },
          ],
          '/admin/member/:listView': [
            'adminMember.List',
            {
              '/admin/member/:listView/:itemView/:itemId': 'adminMember.Item',
            },
          ],
          '/admin/post/:listView': [
            'adminPost.List',
            {
              '/admin/post/:listView/:itemView/:itemId': 'adminPost.Item',
            },
          ],
        },
      ],
      '/article$': '@./article/home',
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
  '/admin/role/list': '角色列表',
  '/admin/member/list': '用户列表',
  '/admin/post/list': '信息列表',
};
