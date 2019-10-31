import {ActionTypes, BaseModelHandlers, BaseModelState, LoadingState, effect, errorAction, reducer} from '@medux/react-web-router';
import {CommonErrorCode, CustomError, ProjectConfig} from 'entity/common';
import {CurUser, LoginRequest, Notices} from 'entity/session';

import {HandledError} from 'common';
import api from './api';

// 定义本模块的State类型
export interface State extends BaseModelState {
  projectConfig?: ProjectConfig;
  curUser?: CurUser;
  notices: Notices;
  showLoginOrRegisterPop?: 'login' | 'register';
  showRegistrationAgreement?: boolean;
  loading: {
    global: LoadingState;
  };
}

// 定义本模块State的初始值
export const initModelState: State = {
  notices: {},
  loading: {
    global: LoadingState.Stop,
  },
};

// 定义本模块的Handlers
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
    const isPop = !!this.state.showLoginOrRegisterPop;
    this.updateState({curUser, showLoginOrRegisterPop: undefined});
    this.getNoticeTimer();
    const redirect = sessionStorage.getItem(metaKeys.LoginRedirectSessionStorageKey) || metaKeys.UserHomePathname;
    sessionStorage.removeItem(metaKeys.LoginRedirectSessionStorageKey);
    if (!isPop) {
      historyActions.push(redirect);
    }
  }
  @effect()
  public async logout() {
    const curUser = await api.logout();
    this.updateState({
      curUser,
      notices: {},
    });
    if (this.noticesTimer) {
      clearInterval(this.noticesTimer);
      this.noticesTimer = 0;
    }
    sessionStorage.setItem(metaKeys.LoginRedirectSessionStorageKey, location.pathname + location.search + location.hash);
    historyActions.push(metaKeys.LoginPathname);
  }
  @reducer
  public closesLoginOrRegisterPop(): State {
    return {...this.state, showLoginOrRegisterPop: undefined};
  }
  @reducer
  public openLoginOrRegisterPop(showLoginOrRegisterPop: 'login' | 'register'): State {
    return {...this.state, showLoginOrRegisterPop};
  }
  @reducer
  public showRegistrationAgreement(showRegistrationAgreement: boolean): State {
    return {...this.state, showRegistrationAgreement};
  }
  @effect(null) // 不需要loading，设置为null
  protected async [ActionTypes.Error](error: CustomError) {
    if (error.code === CommonErrorCode.unauthorized) {
      const redirect: boolean = error.detail;
      if (redirect) {
        sessionStorage.setItem(metaKeys.LoginRedirectSessionStorageKey, location.pathname + location.search + location.hash);
        historyActions.push(metaKeys.LoginPathname);
      } else {
        this.dispatch(this.actions.openLoginOrRegisterPop('login'));
      }
      throw new HandledError(error);
    } else {
      error.code !== CommonErrorCode.noToast && error.message && message.error(error.message);
      throw new HandledError(error);
    }
  }
  @effect(null)
  protected async [`this/${ActionTypes.MInit}`]() {
    window.onunhandledrejection = (e: {reason: any}) => {
      if (e.reason && e.reason.code !== CommonErrorCode.handled) {
        this.dispatch(errorAction(e.reason));
      }
    };
    window.onerror = (message: any, url: any, line: any, column: any, error: any) => {
      if (error.code !== CommonErrorCode.handled && !error.dispatched) {
        error.dispatched = true;
        this.dispatch(errorAction(error));
      }
    };
    const projectConfig = await api.getProjectConfig();
    const curUser = await api.getCurUser();
    document.title = projectConfig.title;
    this.updateState({
      curUser,
      projectConfig,
    });
    this.getNoticeTimer();
  }
}
