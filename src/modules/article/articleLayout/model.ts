import {BaseModelHandlers, BaseModelState, reducer} from '@medux/react-web-router';

export interface State extends BaseModelState {
  showConsult?: boolean;
}

export const initModelState: State = {};

export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @reducer
  public showConsult(): State {
    return {...this.state, showConsult: true};
  }
}
