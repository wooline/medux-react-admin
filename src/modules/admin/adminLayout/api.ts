import {CurUser, MenuItem} from 'entity/session';

import ajax from 'common/request';
export class API {
  public getMenuData(curUser: CurUser): Promise<MenuItem[]> {
    return ajax<MenuItem[]>('get', '/api/menu');
  }
}

export default new API();
