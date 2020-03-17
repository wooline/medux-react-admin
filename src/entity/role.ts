import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './index';

export const purviewNames: {[key: string]: string} = {
  role: '角色',
  'role.all': '角色管理',
  user: '用户',
  'user.create': '新增',
  'user.delete': '删除',
  'user.update': '修改',
  'user.list': '列表',
  'user.detail': '详情',
  'user.review': '审核',
  post: '信息',
  'post.create': '新增',
  'post.delete': '删除',
  'post.update': '修改',
  'post.list': '列表',
  'post.detail': '详情',
  'post.review': '审核',
};

export interface Purview {
  [resource: string]: string[];
}
export const purviewData: Purview = {
  user: ['list', 'create', 'update', 'delete', 'detail', 'review'],
  post: ['list', 'create', 'update', 'delete', 'detail', 'review'],
};
export interface MenuItem {
  name: string;
  icon?: string;
  keys: string | string[];
  link?: string;
  children?: MenuItem[];
  target?: string;
  disable?: boolean;
}

export const menuData: MenuItem[] = [
  {
    name: '概要总览',
    icon: 'dashboard',
    keys: '/admin/home',
  },
  {
    name: '用户管理',
    icon: 'user-add',
    keys: 'member',
    children: [
      {name: '用户列表', keys: ['/admin/member/list', '/admin/member/list/detail/:id'], link: '/admin/member/list#q=%7B"adminMember"%3A%7B"_listKey"%3A"${listKey}"%7D%7D'},
      {name: '角色管理', keys: '/admin/role/list#q=%7B"adminRole"%3A%7B"_listKey"%3A"${listKey}"%7D%7D'},
    ],
  },
  {
    name: '信息管理',
    icon: 'pay-circle',
    keys: '/admin/finance',
    children: [{name: '信息列表', keys: ['/admin/post/list', '/admin/post/list/detail/:id'], link: '/admin/post/list#q=%7B"adminPost"%3A%7B"_listKey"%3A"${listKey}"%7D%7D'}],
  },
];
export interface ListSearch extends BaseListSearch {
  roleName?: string;
  purviews?: string[];
}

export interface ListItem extends BaseListItem {
  roleName: string;
  purviews: string[];
  owner: number;
  createdTime: number;
  remark: string;
  fixed?: boolean;
}

export interface ItemDetail extends ListItem {}
export interface UpdateItem {
  id: string;
  roleName: string;
  purviews: string[];
  remark: string;
}

export interface ListSummary extends BaseListSummary {}
export interface RouteParams extends CommonResourceRouteParams {
  listSearch: ListSearch;
}
export interface Resource extends CommonResource {
  RouteParams: RouteParams;
  ListSearch: ListSearch;
  ListItem: ListItem;
  ListSummary: ListSummary;
  UpdateItem: UpdateItem;
}
