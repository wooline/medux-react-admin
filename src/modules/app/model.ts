import {ActionTypes, BaseModelHandlers, BaseModelState, LoadingState, effect, errorAction} from '@medux/react-web-router';
import {CommonErrorCode, ProjectConfig} from 'entity/common';

import api from './api';

// 定义本模块的State类型
export interface State extends BaseModelState {
  projectConfig?: ProjectConfig;
  loading: {
    global: LoadingState;
  };
}

// 定义本模块State的初始值
export const initModelState: State = {
  loading: {
    global: LoadingState.Stop,
  },
};

// 定义本模块的Handlers
export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @effect(null) // 不需要loading，设置为null
  protected async [ActionTypes.Error](error: {code: CommonErrorCode; message: string}) {
    if (error.code === CommonErrorCode.unauthorized) {
      this.dispatch(actions.session.popupLoignForm());
    } else {
      error.code !== CommonErrorCode.noToast && error.message && message.error(error.message);
      throw {code: CommonErrorCode.fallthrough, error};
    }
  }
  @effect(null)
  protected async [`this/${ActionTypes.MInit}`]() {
    window.onunhandledrejection = (e: {reason: any}) => {
      if (e.reason && e.reason.code !== CommonErrorCode.fallthrough) {
        this.dispatch(errorAction(e.reason));
      }
    };
    const projectConfig = await api.getProjectConfig();
    document.title = projectConfig.title;
    this.updateState({
      projectConfig,
    });
  }
}
