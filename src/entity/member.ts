import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './index';

import {enumOptions} from 'common/utils';

export enum Gender {
  '男' = 'male',
  '女' = 'female',
  '未知' = 'unknow',
}

export const DGender = enumOptions(Gender);

export enum Status {
  '启用' = 'enable',
  '禁用' = 'disable',
}
export const DStatus = enumOptions(Status);

export interface ListSearch extends BaseListSearch {
  username?: string;
  nickname?: string;
  email?: string;
  role?: {id: string; name: string};
  roleId?: string;
  loginTime?: [number, number];
  status?: Status;
}
export interface ListItem extends BaseListItem {
  username: string;
  nickname: string;
  gender: Gender;
  post: number;
  role: {id: string} | undefined;
  roleId: string;
  roleName: string;
  status: Status;
  loginTime: number;
  createdTime: number;
  email: string;
  fixed?: boolean;
}
export interface ItemDetail extends ListItem {
  score: number;
  account: number;
}
export interface ListSummary extends BaseListSummary {}

export interface UpdateItem {
  id: string;
  username: string;
  nickname: string;
  gender: Gender;
  role: {id: string} | undefined;
  roleId: string;
  status: Status;
  email: string;
}
export interface RouteParams extends CommonResourceRouteParams {
  listSearch: ListSearch;
}
export interface Resource extends CommonResource {
  RouteParams: RouteParams;
  ListSearch: ListSearch;
  ListItem: ListItem;
  ListSummary: ListSummary;
  ItemDetail: ItemDetail;
  UpdateItem: UpdateItem;
}

// 定义本模块的路由参数类型
export const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    term: undefined,
    category: undefined,
    sorterField: undefined,
    sorterOrder: undefined,
    username: undefined,
    nickname: undefined,
    status: undefined,
    email: undefined,
    role: undefined,
    roleId: undefined,
    loginTime: undefined,
  },
  listView: '',
  _listVer: 0,
  itemId: '',
  itemView: '',
  _itemVer: 0,
};
