import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource} from './common';

import {enumOptions} from 'common/utils';

export enum Gender {
  '男' = 'male',
  '女' = 'female',
  '未知' = 'unknow',
}

export const DGender = enumOptions(Gender);

export enum Status {
  '正常' = 'enable',
  '禁用' = 'desable',
}
export const DStatus = enumOptions(Status);

export interface ListSearch extends BaseListSearch {
  uid?: string;
  username?: string;
  createdTime?: [number, number];
  loginTime?: [number, number];
  gender?: Gender;
  status?: Status;
}
export interface ListItem extends BaseListItem {
  username: string;
  gender: Gender;
  age: number;
  createdTime: number;
}
export interface ListSummary extends BaseListSummary {}

export interface RouteParams {
  id: string;
  _listKey: string;
  listSearch: ListSearch;
}
export interface Resource extends CommonResource {
  RouteParams: RouteParams;
  ListSearch: ListSearch;
  ListItem: ListItem;
  EditItem: ListItem;
  DetailItem: ListItem;
  ListSummary: ListSummary;
}
