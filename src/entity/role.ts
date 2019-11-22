import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource} from './common';

import {enumOptions} from 'common/utils';

export enum Purview {
  '用户查看' = '',
  '用户管理' = '',
  '文章查看' = '',
  '文章管理' = '',
}

export const DPurview = enumOptions(Purview);

export interface ListSearch extends BaseListSearch {
  roleName?: string;
  purview?: Purview;
}

export interface ListItem extends BaseListItem {
  roleName: string;
  purviews: Purview[];
  updateTime: number;
  remark: string;
}
export interface ListSummary extends BaseListSummary {}

export interface Resource extends CommonResource {
  RouteParams: {
    listSearch: ListSearch;
  };
  ListSearch: ListSearch;
  ListItem: ListItem;
  EditItem: ListItem;
  ListSummary: ListSummary;
}
