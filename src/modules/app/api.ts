import {CurUser, LoginRequest, Notices} from 'entity/session';

import {ProjectConfig} from 'entity/common';

const guest: CurUser = {
  username: 'guest',
  hasLogin: false,
  sessionId: '',
  avatar: initEnv.staticPath + 'imgs/u1.jpg',
};
const admin: CurUser = {
  username: 'admin',
  hasLogin: true,
  sessionId: 'afdsfasdfasf',
  avatar: initEnv.staticPath + 'imgs/u1.jpg',
};
export class API {
  public getCurUser(): Promise<CurUser> {
    return Promise.resolve(admin);
  }
  public login(req: LoginRequest): Promise<CurUser> {
    return Promise.resolve(admin).then(curUser => {
      sessionStorage.setItem(metaKeys.SessionIDSessionStorageKey, curUser.sessionId);
      return curUser;
    });
  }
  public logout(): Promise<CurUser> {
    sessionStorage.removeItem(metaKeys.SessionIDSessionStorageKey);
    return Promise.resolve(guest);
  }
  public getNotices(): Promise<Notices> {
    return Promise.resolve({messages: []});
  }
  public getProjectConfig(): Promise<ProjectConfig> {
    return Promise.resolve({
      title: 'Medux Demo',
      menuData: [
        {
          name: '用户管理',
          icon: 'team',
          keys: '/admin/user',
          children: [
            {name: '用户一览表', keys: ['/admin/user/userOverview', 'aaa', 'bbbb']},
            {name: '用户账户明细', keys: '/admin/user/transaction', disable: true},
            {name: '用户账户充值', keys: '/admin/user/topup'},
            {name: '黑名单管理', keys: '/admin/user/blacklist'},
          ],
        },
        {
          name: '代理管理',
          icon: 'user-add',
          keys: '/admin/agent',
          children: [
            {name: '总代开户管理', keys: '/admin/agent/primaryAgent'},
            {name: '团队列表', keys: '/admin/agent/agentOverview'},
            {name: '团队盈亏报表', keys: '/admin/agent/teamProfit'},
            {name: '团队充提报表', keys: '/admin/agent/depositWithdrawal'},
            {name: '代理团队人数分析', keys: '/admin/agent/statistics'},
            {name: '代理销量查询', keys: '/admin/agent/agentSale'},
            {name: '分红列表', keys: '/admin/agent/bonus'},
            {name: '工资列表', keys: '/admin/agent/salary'},
            {name: '佣金查询', keys: '/admin/agent/commission'},
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
          children: [{name: '方案查询', keys: '/admin/game/order'}, {name: '追号查询', keys: '/admin/game/autoBet'}, {name: '游戏盈亏监控', keys: '/admin/game/3'}],
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
      ],
    });
  }
}

export default new API();
