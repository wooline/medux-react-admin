import {CommonErrorCode, CustomError} from 'entity/common';
export class RedirectError extends CustomError {
  public constructor(url: string) {
    super(CommonErrorCode.redirect, '跳转中', url);
  }
}
export class UnauthorizedError extends CustomError {
  public constructor() {
    super(CommonErrorCode.unauthorized, '请登录');
  }
}
