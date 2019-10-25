// 将某些常用变量提升至global，对全局变量有洁癖者可忽略此文件
import './Prepose';

import {actions, historyActions, moduleNames, toUrl} from './modules';
import {message, metaKeys} from './common/utils';

type HistoryActions = typeof historyActions;
type ToUrl = typeof toUrl;
type Actions = typeof actions;
type MetaKeys = typeof metaKeys;

type EnumModuleNames = typeof moduleNames;
type Message = typeof message;

declare global {
  type RootState = import('./modules').RootState;
  type LoadView = import('./modules').LoadView;
  type RouteData = RootState['route']['data'];
  type BaseRouteData = import('@medux/react-web-router').RouteData;
  type CommonErrorCode = import('./entity/common').CommonErrorCode;
  type DispatchProp = import('react-redux').DispatchProp;
  const message: Message;
  //初始环境变量放在index.html中, 以防止被 webpack 打包
  const initEnv: {
    siteName: string;
    pageNames: {[pathname: string]: string};
    version: string;
    staticPath: string;
    apiServerPath: {[key: string]: string};
  };
  const loadView: LoadView;
  const actions: Actions;
  const moduleNames: EnumModuleNames;
  const metaKeys: MetaKeys;
  const historyActions: HistoryActions;
  const toUrl: ToUrl;
  const global: any;
}

((data: {[key: string]: any}) => {
  Object.keys(data).forEach(key => {
    window[key] = data[key];
  });
})({actions, moduleNames, toUrl, historyActions, message});
