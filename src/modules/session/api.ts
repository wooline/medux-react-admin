import {CurUser, LoginRequest, Notices} from 'entity/session';

const guest: CurUser = {
  username: 'guest',
  hasLogin: false,
  sessionId: '',
};
const admin: CurUser = {
  username: 'admin',
  hasLogin: true,
  sessionId: 'afdsfasdfasf',
};
export class API {
  public getCurUser(): Promise<CurUser> {
    return Promise.resolve(guest);
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
}

export default new API();
