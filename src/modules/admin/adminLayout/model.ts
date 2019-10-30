import {ActionTypes, BaseModelHandlers, BaseModelState, effect} from '@medux/react-web-router';

import {UnauthorizedError} from 'common';

export interface State extends BaseModelState {}

export const initModelState: State = {};

export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @effect(null)
  protected async [`this/${ActionTypes.MInit}, ${ActionTypes.RouteChange}`]() {
    if (this.rootState.route.data.views.adminLayout && !this.rootState.app!.curUser!.hasLogin) {
      throw new UnauthorizedError(true);
    }
  }
}
