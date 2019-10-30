import {CommonErrorCode, CustomError} from 'entity/common';
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
