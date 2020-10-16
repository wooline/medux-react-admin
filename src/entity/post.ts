import {enumOptions} from 'common/utils';
import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './index';

export enum Status {
  '待审核' = 'pending',
  '审核通过' = 'resolved',
  '审核拒绝' = 'rejected',
}
export const DStatus = enumOptions(Status);
export interface ListItem extends BaseListItem {
  title: string;
  author: {id: string; name: string};
  editors: Array<{id: string; name: string}>;
  status: Status;
  createdTime: number;
  fixed?: boolean;
}
export interface ListSearch extends BaseListSearch {
  title?: string;
  author?: string;
  editor?: {id: string; name: string};
  editorId?: string;
  createdTime?: [number, number];
  status?: Status;
}
export interface ItemDetail extends ListItem {
  content: string;
}
export interface ListSummary extends BaseListSummary {}

export interface UpdateItem {
  id: string;
  title: string;
  content: string;
  editors: Array<{id: string; name: string}>;
  editorIds: string[];
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
    title: undefined,
    author: undefined,
    editor: undefined,
    editorId: undefined,
    status: undefined,
    createdTime: undefined,
  },
  listView: '',
  _listVer: 0,
  itemId: '',
  itemView: '',
  _itemVer: 0,
};
