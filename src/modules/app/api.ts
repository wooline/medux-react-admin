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
    return Promise.resolve({title: 'Medux Demo'});
  }
}

export default new API();
