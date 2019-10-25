import {ActionTypes, BaseModelHandlers, BaseModelState, effect} from '@medux/react-web-router';
// 定义本模块的State类型
export interface State extends BaseModelState {}

// 定义本模块State的初始值
export const initModelState: State = {};

// 定义本模块的Handlers
export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @effect(null)
  protected async [`this/${ActionTypes.MInit}`]() {
    const curUser = this.rootState.session && this.rootState.session.curUser;
    if (!curUser || !curUser.hasLogin) {
      this.dispatch(actions.session.redirectLoignPage());
    }
  }
}
