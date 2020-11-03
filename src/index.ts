import 'Global';

import {defaultRouteParams, moduleGetter, routeConfig} from 'modules';
import {buildApp} from '@medux/react-web-router';

const global: any = window;

if (initEnv.production) {
  global.console = {
    log: () => undefined,
    info: () => undefined,
    error: () => undefined,
    warn: () => undefined,
  };
}

buildApp({
  moduleGetter,
  routeConfig,
  defaultRouteParams,
  beforeRender: ({store, historyActions}) => {
    global.historyActions = historyActions;
    return store;
  },
}).then(() => {
  const initLoading = document.getElementById('g-init-loading');
  if (initLoading) {
    initLoading.parentNode!.removeChild(initLoading);
  }
});
