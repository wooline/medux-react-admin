export enum CommonErrorCode {
  unknown = 'unknown',
  notFound = 'notFound',
  unauthorized = '401',
  redirect = '301',
  fallthrough = 'fallthrough',
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
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface BaseListSearch {
  page: number;
  pageSize: number;
}

export interface CommonResource {
  RouteParams: {listSearch: any};
  ListSearch: any;
  ListItem: any;
  ListSummary: any;
  DetailItem: any;
  EditItem: any;
  CreateItem: any;
}
