import {ActionTypes, BaseModelHandlers, BaseModelState, effect, reducer} from '@medux/react-web-router';
import {CurUser, LoginRequest, Notices} from 'entity/session';

import api from './api';

export interface State extends BaseModelState {
  curUser?: CurUser;
  notices: Notices;
  showLoginPop?: boolean;
}
export const initModelState: State = {
  notices: {},
};
export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  private noticesTimer: number = 0;
  private getNotice() {
    api.getNotices().then(notices => {
      this.updateState({notices});
    });
  }
  private getNoticeTimer() {
    if (this.state.curUser && this.state.curUser.hasLogin) {
      this.getNotice();
      if (!this.noticesTimer) {
        this.noticesTimer = setInterval(() => {
          this.getNotice();
        }, 15000);
      }
    }
  }
  @effect()
  public async login(params: LoginRequest) {
    const curUser = await api.login(params);
    this.updateState({curUser});
    this.getNoticeTimer();
    const redirect = sessionStorage.getItem(metaKeys.LoginRedirectSessionStorageKey) || metaKeys.UserHomePathname;
    sessionStorage.removeItem(metaKeys.LoginRedirectSessionStorageKey);
    historyActions.replace(redirect);
  }
  @effect()
  public async logout(goto?: string) {
    const curUser = await api.logout();
    this.updateState({
      curUser,
      notices: {},
    });
    if (this.noticesTimer) {
      clearInterval(this.noticesTimer);
      this.noticesTimer = 0;
    }
    goto && historyActions.replace(goto);
  }
  @effect(null)
  public async popupLoignForm() {
    if (this.state.curUser && this.state.curUser.hasLogin) {
      await this.dispatch(this.actions.logout());
    }
    this.updateState({showLoginPop: true});
  }
  @effect(null)
  public async redirectLoignPage() {
    if (this.state.curUser && this.state.curUser.hasLogin) {
      await this.dispatch(this.actions.logout());
    }
    sessionStorage.setItem(metaKeys.LoginRedirectSessionStorageKey, location.pathname + location.search);
    historyActions.replace(metaKeys.LoginPathname);
  }
  @reducer
  public closeLoignForm(): State {
    return {...this.state, showLoginPop: false};
  }
  @effect()
  protected async [`this/${ActionTypes.MInit}`]() {
    const curUser = await api.getCurUser();
    this.updateState({
      curUser,
    });
    this.getNoticeTimer();
  }
}
