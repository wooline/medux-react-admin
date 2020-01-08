import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './common';

import {enumOptions} from 'common/utils';

export enum Status {
  '待审核' = 'pending',
  '已审核' = 'resolved',
  '已拒绝' = 'rejected',
}

export interface ListItem extends BaseListItem {
  title: string;
  cover: string;
  authorName: string;
  authorId: string;
  editors: string[];
  status: Status;
  loginTime: number;
  createdTime: number;
  email: string;
}
