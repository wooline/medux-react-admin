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
  '禁用' = 'disable',
}
export const DStatus = enumOptions(Status);

export interface ListSearch extends BaseListSearch {
  username?: string;
  nickname?: string;
  roleId?: string;
  createdTime?: [number, number];
  loginTime?: [number, number];
  gender?: Gender;
  status?: Status;
}
export interface ListItem extends BaseListItem {
  username: string;
  nickname: string;
  gender: Gender;
  age: number;
  roleId: string;
  roleName: string;
  status: Status;
  loginTime: number;
  createdTime: number;
  email: string;
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
