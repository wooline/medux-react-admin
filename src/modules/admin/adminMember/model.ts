import {CommonResourceHandlers, CommonResourceState} from 'common/resource';

import {Resource} from 'entity/member';
import api from './api';
import defaultRouteParams from './meta';

export interface State extends CommonResourceState<Resource> {}

export const initModelState: State = {routeParams: defaultRouteParams};

export class ModelHandlers extends CommonResourceHandlers<Resource, State, RootState> {
  constructor(moduleName: string, store: any) {
    super({defaultRouteParams, api, enableRoute: {list: true, detail: true, edit: true}}, moduleName, store);
  }
}
