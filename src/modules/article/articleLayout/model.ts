import {BaseModelHandlers, BaseModelState, effect, reducer} from '@medux/react-web-router';

import {UnauthorizedError} from 'common/errors';

export interface State extends BaseModelState {
  showConsult?: boolean;
}

export const initModelState: State = {};

export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @effect(null)
  public async showConsult() {
    if (!this.rootState.app!.curUser.hasLogin) {
      throw new UnauthorizedError(false);
    }
    this.updateState({showConsult: true});
  }

  @reducer
  public closeConsult(): State {
    return {...this.state, showConsult: false};
  }
}
