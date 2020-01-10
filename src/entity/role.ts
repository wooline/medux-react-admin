import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './common';

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
  article: '文章',
  'article.create': '新增',
  'article.delete': '删除',
  'article.update': '修改',
  'article.list': '列表',
  'article.detail': '详情',
  'article.review': '审核',
};

export interface Purview {
  [resource: string]: string[];
}
export const purviewData: Purview = {
  user: ['list', 'create', 'update', 'delete', 'detail', 'review'],
  article: ['list', 'create', 'update', 'delete', 'detail', 'review'],
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
    name: '文章管理',
    icon: 'pay-circle',
    keys: '/admin/finance',
    children: [{name: '文章列表', keys: ['/admin/article/list', '/admin/article/list/detail/:id'], link: '/admin/article/list#q=%7B"adminArticle"%3A%7B"_listKey"%3A"${listKey}"%7D%7D'}],
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
