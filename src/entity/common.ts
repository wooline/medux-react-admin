export enum CommonErrorCode {
  unknown = 'unknown',
  notFound = 'notFound',
  unauthorized = 'unauthorized',
  forbidden = 'forbidden',
  redirect = 'redirect',
  refresh = 'refresh',
  handled = 'handled',
  noToast = 'noToast',
}
export interface ProjectConfig {
  title: string;
}
export interface ErrorEntity<Detail = any> {
  code: string;
  message?: string;
  detail?: Detail;
}

export class CustomError<Detail = any> {
  private httpCode: {[key: string]: string} = {
    '401': CommonErrorCode.unauthorized,
    '403': CommonErrorCode.forbidden,
    '404': CommonErrorCode.notFound,
    '300': CommonErrorCode.refresh,
    '301': CommonErrorCode.redirect,
    '302': CommonErrorCode.redirect,
  };
  public constructor(public code: string, public message?: string, public detail?: Detail) {
    if (parseFloat(code)) {
      this.code = this.httpCode[code];
    }
  }
}

export interface BaseListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface BaseListItem {
  id: string;
}
export interface BaseListSearch {
  pageCurrent?: number;
  pageSize?: number;
  sorterOrder?: 'ascend' | 'descend';
  sorterField?: string;
}

export interface CommonResource {
  RouteParams: {listSearch: any; _listKey: string; id: string};
  ListSearch: BaseListSearch;
  ListItem: BaseListItem;
  ListSummary: BaseListSummary;
  Operation: 'detail' | 'edit' | 'create';
  CreateItem: any;
  UpdateItem: any;
}

export interface TabNav {
  id: string;
  title: string;
  url: string;
}
