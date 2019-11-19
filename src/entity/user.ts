import {BaseListSearch, BaseListSummary, CommonResource} from './common';

export interface ListSearch extends BaseListSearch {
  username: string;
  createdTime: [number, number];
}
