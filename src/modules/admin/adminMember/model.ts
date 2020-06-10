import {CommonResourceHandlers, CommonResourceState} from 'common/resource';
import {Resource, defaultRouteParams} from 'entity/member';

import api from './api';

export interface State extends CommonResourceState<Resource> {}

export const initModelState: State = {routeParams: defaultRouteParams};

export class ModelHandlers extends CommonResourceHandlers<Resource, State, RootState> {
  constructor(moduleName: string, store: any) {
    super({defaultRouteParams, api, enableRoute: {list: true, detail: true, edit: true}}, moduleName, store);
  }
}
