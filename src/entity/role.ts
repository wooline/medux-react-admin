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
      {name: '用户列表', keys: '/admin/member/list#q=%7B"adminMember"%3A%7B"_listKey"%3A"${listKey}"%7D%7D'},
      {name: '角色管理', keys: '/admin/role/list#q=%7B"adminRole"%3A%7B"_listKey"%3A"${listKey}"%7D%7D'},
    ],
  },
  {
    name: '财务管理',
    icon: 'pay-circle',
    keys: '/admin/finance',
    children: [
      {name: '-商户银行帐变明细', keys: '/admin/finance/wallet1'},
      {name: '-用户充值明细表', keys: '/admin/finance/wallet2'},
      {name: '-审核提款列表', keys: '/admin/finance/wallet3'},
      {name: '-充提任务管理', keys: '/admin/finance/wallet4'},
      {name: '-充值提现分析', keys: '/admin/finance/wallet5'},
    ],
  },
  {
    name: '内容管理',
    icon: 'file-text',
    keys: '/admin/content',
    children: [
      {name: '广告图管理', keys: '/admin/content/banner'},
      {name: '公告管理', keys: '/admin/content/announcement'},
      {name: '-热门彩种推荐', keys: '/admin/content/announcement2'},
      {name: '站内信管理', keys: '/admin/content/notification'},
      {name: '意见反馈', keys: '/admin/content/feedback'},
      {name: '-中奖排行榜', keys: '/admin/content/feedback1'},
      {name: '-APP消息推送', keys: '/admin/content/feedback2'},
    ],
  },
  {
    name: '游戏管理',
    icon: 'rocket',
    keys: '/admin/game',
    children: [
      {name: '方案查询', keys: '/admin/game/order'},
      {name: '追号查询', keys: '/admin/game/autoBet'},
      {name: '游戏盈亏监控', keys: '/admin/game/3'},
    ],
  },
  {
    name: '报表管理',
    icon: 'share-alt',
    keys: '/admin/settings3',
    children: [{name: '总代套餐管理', keys: '/admin/settings/incomePlan3'}],
  },
  {
    name: '活动管理',
    icon: 'car',
    keys: '/admin/settings2',
    children: [{name: '总代套餐管理', keys: '/admin/settings/incomePlan2'}],
  },
  {
    name: '系统管理',
    icon: 'setting',
    keys: '/admin/settings',
    children: [{name: '总代套餐管理', keys: '/admin/settings/incomePlan'}],
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
