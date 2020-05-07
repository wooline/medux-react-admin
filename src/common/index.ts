import {message as antdMessage} from 'antd';
export enum CommonErrorCode {
  unknown = 'unknown',
  notFound = 'notFound',
  unauthorized = 'unauthorized',
  forbidden = 'forbidden',
  redirect = 'redirect',
  refresh = 'refresh',
  authorizeExpired = 'authorizeExpired',
  handled = 'handled',
  noToast = 'noToast',
}
export class CustomError<Detail = any> {
  private httpCode: {[key: string]: string} = {
    '401': CommonErrorCode.unauthorized,
    '402': CommonErrorCode.authorizeExpired,
    '403': CommonErrorCode.forbidden,
    '404': CommonErrorCode.notFound,
    '300': CommonErrorCode.refresh,
    '301': CommonErrorCode.redirect,
    '302': CommonErrorCode.redirect,
  };
  public constructor(public code: string, public message: string, public detail?: Detail) {
    if (parseFloat(code)) {
      this.code = this.httpCode[code];
    }
  }
}
export interface ErrorEntity<Detail = any> {
  code: string;
  message?: string;
  detail?: Detail;
}
export class RedirectError extends CustomError {
  public constructor(url: string) {
    super(CommonErrorCode.redirect, '跳转中', url);
  }
}
export class UnauthorizedError extends CustomError {
  public constructor(redirect: boolean) {
    super(CommonErrorCode.unauthorized, '请登录', redirect);
  }
}

export class HandledError extends CustomError {
  public constructor(oerror: CustomError) {
    super(CommonErrorCode.handled, oerror.message || '', oerror);
  }
}
export const safeCheckd = Symbol();
export type SafeChecked = typeof safeCheckd;

export type ExcludeNull<T> = {[K in keyof T]-?: T[K] extends null ? never : K}[keyof T];
export type ExtractArray<T extends any[]> = T[Extract<keyof T, number>];
export type OmitSelf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

export const metaKeys = {
  LoginPathname: '/login',
  RegisterPathname: '/register',
  UserHomePathname: '/admin/home',
  ArticleHomePathname: '/article/home',
  LoginRedirectSessionStorageKey: 'LoginRedirectTo',
  FavoritesUrlStorageKey: 'FavoritesUrl',
};
export const message = {
  success: (content: string) => {
    antdMessage.success(content);
  },
  error: (content: string) => {
    const initLoading = document.getElementById('g-init-loading');
    antdMessage.error(content, initLoading ? 9999999 : 3);
  },
};
