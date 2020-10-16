import 'Global';

import {defaultRouteParams, moduleGetter, routeConfig} from 'modules';

import {buildApp} from '@medux/react-web-router';
import {createBrowserHistory} from 'history';

const global: any = window;
if (initEnv.production) {
  global.console = {
    log: () => undefined,
    info: () => undefined,
    error: () => undefined,
    warn: () => undefined,
  };
}
const history = createBrowserHistory();

buildApp({
  moduleGetter,
  history,
  routeConfig,
  defaultRouteParams,
  beforeRender: ({store, historyActions, toBrowserUrl, transformRoute}) => {
    global.historyActions = historyActions;
    global.toUrl = toBrowserUrl;
    global.transformRoute = transformRoute;
    return store;
  },
}).then(() => {
  const initLoading = document.getElementById('g-init-loading');
  if (initLoading) {
    initLoading.parentNode!.removeChild(initLoading);
  }
});
