import {CurUser, LoginRequest, Notices, RegisterRequest, guest} from 'entity/session';

import {ProjectConfig} from 'entity/common';
import ajax from 'common/request';

function setCookie(name: string, value: string, expiredays: number) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + ';expires=' + exdate.toUTCString() + ';path=/';
}
export class API {
  public getCurUser(): Promise<CurUser> {
    return ajax<CurUser>('get', '/api/session').catch(err => {
      console.log(err);
      return guest;
    });
  }
  public login(req: LoginRequest): Promise<CurUser> {
    return ajax<CurUser>('post', '/api/session', {}, req);
  }
  public register(req: RegisterRequest): Promise<void> {
    return ajax<void>('post', '/api/user', {}, req);
  }
  public logout(): Promise<void> {
    return ajax<void>('delete', '/api/session');
  }
  public getNotices(): Promise<Notices> {
    return ajax<Notices>('get', '/api/notices');
  }
  public getProjectConfig(): Promise<ProjectConfig> {
    return Promise.resolve({
      title: 'Medux Demo',
    });
  }
}

export default new API();
