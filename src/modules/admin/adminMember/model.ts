import {CommonResourceHandlers, CommonResourceState} from 'common/resource';

import {Resource} from 'entity/member';
import api from './api';
import defaultRouteParams from './meta';

export interface State extends CommonResourceState<Resource> {}

export const initModelState: State = {};

export class ModelHandlers extends CommonResourceHandlers<Resource, State, RootState> {
  protected defaultRouteParams = defaultRouteParams;
  protected api = api;
}
