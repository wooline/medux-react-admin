import {ActionTypes, BaseModelHandlers, BaseModelState, LoadingState, effect, errorAction, reducer} from '@medux/react-web-router';
import {CommonErrorCode, CustomError, ProjectConfig} from 'entity/common';
import {CurUser, LoginRequest, Notices, RegisterRequest, guest} from 'entity/session';

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
  notices: {count: 0},
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
        }, 5000);
      }
    }
  }
  private getIdelTime() {
    // 如果因为token过期，且过期时间在某个范围内，允许登录后不刷新页面，从而不打断当前操作流程
    // 在过期后10分钟内登录成功，不刷新页面
    if (initEnv.lastActivedTime) {
      return Date.now() - initEnv.lastActivedTime < 60000 ? initEnv.lastActivedTime : 0;
    } else {
      return 0;
    }
  }
  private checkLoginRedirect() {
    if (this.state.curUser && this.state.curUser.hasLogin) {
      let redirect = sessionStorage.getItem(metaKeys.LoginRedirectSessionStorageKey);
      sessionStorage.removeItem(metaKeys.LoginRedirectSessionStorageKey);
      if (redirect === metaKeys.LoginPathname) {
        redirect = metaKeys.UserHomePathname;
      }
      redirect && historyActions.push(redirect);
    }
  }
  @reducer
  public putCurUser(curUser: CurUser): State {
    if (curUser.hasLogin) {
      initEnv.lastActivedTime = Date.now();
    } else {
      initEnv.lastActivedTime = undefined;
    }
    return {...this.state, curUser};
  }
  @effect()
  public async register(params: RegisterRequest) {
    await api.register(params);
    this.dispatch(this.actions.login(params));
  }
  @effect()
  public async login(params: LoginRequest) {
    const oCurUser = this.state.curUser!;
    const curUser = await api.login(params);
    const isPop = !!this.state.showLoginOrRegisterPop;
    const idleTime = this.getIdelTime();
    if (isPop && oCurUser.id === curUser.id && idleTime) {
      this.dispatch(this.actions.putCurUser(curUser));
      this.dispatch(this.actions.closesLoginOrRegisterPop());
      this.getNoticeTimer();
    } else {
      location.reload();
    }
  }

  @effect()
  public async logout(expired?: number) {
    if (expired) {
      if (this.noticesTimer) {
        clearInterval(this.noticesTimer);
        this.noticesTimer = 0;
      }
      this.dispatch(this.actions.putCurUser({...this.state.curUser!, expired}));
    } else {
      await api.logout();
      location.reload();
    }
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
      sessionStorage.setItem(metaKeys.LoginRedirectSessionStorageKey, location.pathname + location.search + location.hash);
      const curUser = this.state.curUser || guest;
      const idleTime = this.getIdelTime();
      if (curUser.hasLogin) {
        await this.dispatch(this.actions.logout(idleTime));
      }
      if (idleTime || !error.detail) {
        this.dispatch(this.actions.openLoginOrRegisterPop('login'));
      } else {
        historyActions.push(metaKeys.LoginPathname);
      }
      throw new HandledError(error);
    } else if (error.code === CommonErrorCode.refresh) {
      location.reload();
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
    this.updateState({projectConfig});
    document.title = projectConfig.title;
    const curUser = await api.getCurUser();
    this.dispatch(this.actions.putCurUser(curUser));
    if (curUser.hasLogin) {
      this.getNoticeTimer();
      this.checkLoginRedirect();
    }
  }
}
