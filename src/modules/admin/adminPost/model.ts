import {CommonResourceHandlers, CommonResourceState} from 'common/resource';
import {Resource, defaultRouteParams} from 'entity/post';

import api from './api';

export interface State extends CommonResourceState<Resource> {}

export const initModelState: State = {routeParams: defaultRouteParams, listCase: {}, itemCase: {}};

export class ModelHandlers extends CommonResourceHandlers<Resource, State, RootState> {
  constructor(moduleName: string, store: any) {
    super({defaultRouteParams, api}, moduleName, store);
  }
}
