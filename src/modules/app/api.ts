import {CurUser, LoginRequest, Notices, RegisterRequest, guest} from 'entity/session';

import {ProjectConfig} from 'entity';
import ajax from 'common/request';

function setCookie(name: string, value: string, expiredays: number) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + ';expires=' + exdate.toUTCString() + ';path=/';
}
export class API {
  public getCurUser(): Promise<CurUser> {
    return ajax<CurUser>('get', '/api/session').catch((err) => {
      return guest;
    });
  }
  public login(req: LoginRequest): Promise<CurUser> {
    return ajax('post', '/api/session', {}, req);
  }
  public register(req: RegisterRequest): Promise<void> {
    return ajax('post', '/api/member', {}, req);
  }
  public logout(): Promise<void> {
    return ajax('delete', '/api/session');
  }
  public getNotices(): Promise<Notices> {
    return ajax('get', '/api/notices');
  }
  public getProjectConfig(): Promise<ProjectConfig> {
    return ajax('get', '/api/projectConfig');
  }
}

export default new API();
