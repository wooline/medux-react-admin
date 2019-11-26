export enum CommonErrorCode {
  unknown = 'unknown',
  notFound = 'notFound',
  unauthorized = 'unauthorized',
  redirect = 'redirect',
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
  public constructor(public code: string, public message?: string, public detail?: Detail) {}
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
  sorterOrder?: 'ascend';
  sorterField?: string;
}

export interface CommonResource {
  RouteParams: {listSearch: any};
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
