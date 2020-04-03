// 将某些常用变量提升至global，对全局变量有洁癖者可忽略此文件
import './Prepose';

import {actions, moduleNames, pageNames} from './modules';
import {message, metaKeys} from './common';

type Actions = typeof actions;
type MetaKeys = typeof metaKeys;

type EnumModuleNames = typeof moduleNames;
type Message = typeof message;

declare global {
  type BrowserRouter = import('./modules').BrowserRouter;
  type RootState = import('./modules').RootState;
  type RouteViews = import('./modules').RouteViews;
  type LoadView = import('./modules').LoadView;
  type RouteData = RootState['route']['data'];
  type BaseRouteData = import('@medux/react-web-router').RouteData;
  type CommonErrorCode = import('./common').CommonErrorCode;
  type DispatchProp = import('react-redux').DispatchProp;
  const module: any;
  const pageNames: {[key: string]: string};
  const message: Message;
  //初始环境变量放在index.html中, 以防止被 webpack 打包
  const initEnv: {
    version: string;
    staticPath: string;
    apiServerPath: {[key: string]: string};
    production: boolean;
  };
  const loadView: LoadView;
  const actions: Actions;
  const moduleNames: EnumModuleNames;
  const metaKeys: MetaKeys;
  //BrowserRouter变量放在./index.ts中
  const historyActions: BrowserRouter['historyActions'];
  const toUrl: BrowserRouter['toUrl'];
  const transformRoute: BrowserRouter['transformRoute'];
  const global: any;
}

((data: {[key: string]: any}) => {
  Object.keys(data).forEach((key) => {
    window[key] = data[key];
  });
})({actions, moduleNames, message, pageNames});
