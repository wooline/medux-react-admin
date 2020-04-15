import 'Global';

import {defaultRouteParams, moduleGetter, routeConfig} from 'modules';

import {buildApp} from '@medux/react-web-router';
import {createBrowserHistory} from 'history';

buildApp({
  moduleGetter,
  appModuleName: 'app',
  history: createBrowserHistory(),
  routeConfig,
  defaultRouteParams,
  beforeRender: ({store, historyActions, toBrowserUrl, transformRoute}) => {
    window['historyActions'] = historyActions;
    window['toUrl'] = toBrowserUrl;
    window['transformRoute'] = transformRoute;
    return store;
  },
}).then(() => {
  const initLoading = document.getElementById('g-init-loading');
  initLoading && initLoading.parentNode!.removeChild(initLoading);
});
