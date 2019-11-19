import {CurUser, LoginRequest, Notices, RegisterRequest} from 'entity/session';

import {ProjectConfig} from 'entity/common';
import ajax from 'common/request';

const guest: CurUser = {
  username: 'guest',
  hasLogin: false,
  sessionId: '',
  avatar: initEnv.staticPath + 'imgs/u1.jpg',
};

function setCookie(name: string, value: string, expiredays: number) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + ';expires=' + exdate.toUTCString() + ';path=/';
}
export class API {
  public getCurUser(): Promise<CurUser> {
    return ajax<CurUser>('get', '/api/session').catch(() => {
      return guest;
    });
  }
  public login(req: LoginRequest): Promise<CurUser> {
    const {username, password} = req;
    return ajax<CurUser>('post', '/api/session', {}, {username, password});
  }
  public register(req: RegisterRequest): Promise<CurUser> {
    const {username, password, phone} = req;
    return ajax<CurUser>('post', '/api/user', {}, {username, password, phone});
  }
  public logout(): Promise<CurUser> {
    setCookie('token', '', -1);
    return Promise.resolve(guest);
  }
  public getNotices(): Promise<Notices> {
    return Promise.resolve({messages: []});
  }
  public getProjectConfig(): Promise<ProjectConfig> {
    return Promise.resolve({
      title: 'Medux Demo',
    });
  }
}

export default new API();
