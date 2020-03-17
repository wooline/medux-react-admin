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
  term?: string;
  sorterOrder?: 'ascend' | 'descend';
  sorterField?: string;
}

export type ListSearchFormData<F> = Required<Omit<F, keyof BaseListSearch>>;
export interface CommonResourceRouteParams {
  listView: string;
  listSearch: any;
  _listKey: string;
  itemView: string;
  itemId: string;
  _itemKey: string;
  currentOperation?: 'detail' | 'edit' | 'create';
}
export interface CommonResource {
  RouteParams: CommonResourceRouteParams;
  ListSearch: BaseListSearch;
  ListItem: BaseListItem;
  ListSummary: BaseListSummary;
  Operation: 'detail' | 'edit' | 'create';
  CreateItem: any;
  UpdateItem: any;
}
export interface ProjectConfig {
  tokenRenewalTime: number;
  noticeTimer: number;
}
export interface TabNav {
  id: string;
  title: string;
  url: string;
}
