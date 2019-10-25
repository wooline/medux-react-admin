import {BaseListSummary, CommonResource, ToListSearch} from './common';

import api from 'api';

export type ListSearch = ToListSearch<api.v1.tag.listtag.Request>;
export type ListItem = api.v1.tag.listtag.listTagData;
export type ListSummary = BaseListSummary;
export type EditItem = api.v1.tag.updatetag.Request;
export type CreateItem = api.v1.tag.addtag.Request;

export interface Resource extends CommonResource {
  RouteParams: {
    listSearch: ListSearch;
  };
  ListSearch: ListSearch;
  ListItem: ListItem;
  ListSummary: ListSummary;
  EditItem: EditItem;
  CreateItem: CreateItem;
}
