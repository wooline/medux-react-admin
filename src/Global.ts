/* eslint-disable no-redeclare */
// 将某些常用变量提升至global，对全局变量有洁癖者可忽略此文件
import './Prepose';

import {actions, ModuleNames, pageNames} from './modules';
import {message, metaKeys} from './common/utils';

type Actions = typeof actions;
type MetaKeys = typeof metaKeys;

type EnumModuleNames = typeof ModuleNames;
type Message = typeof message;

declare global {
  type BrowserRouter = import('./modules').BrowserRouter;
  type RootState = import('./modules').RootState;
  type RouteViews = import('./modules').RouteViews;
  type LoadView = import('./modules').LoadView;
  type RouteData = RootState['route']['data'];
  type BaseRouteData = import('@medux/react-web-router').RouteData;
  type CommonErrorCode = import('./common/errors').CommonErrorCode;
  type DispatchProp = import('react-redux').DispatchProp;
  // const module: any;
  const pageNames: {[key: string]: string};
  const message: Message;
  // 初始环境变量放在/public/index.html中, 以防止被 webpack 打包
  const initEnv: {
    version: string;
    staticPath: string;
    apiServerPath: {[key: string]: string};
    production: boolean;
  };
  const loadView: LoadView;
  const actions: Actions;
  const ModuleNames: EnumModuleNames;
  const metaKeys: MetaKeys;
  const historyActions: BrowserRouter['historyActions'];
  const toUrl: BrowserRouter['toUrl'];
  const transformRoute: BrowserRouter['transformRoute'];
}

((data: {[key: string]: any}) => {
  Object.keys(data).forEach((key) => {
    window[key] = data[key];
  });
})({actions, ModuleNames, message, pageNames});
