import {ListItem, ListSearch, ListSummary, UpdateItem} from 'entity/member';

import {CommonResourceAPI} from 'common/resource';
import ajax from 'common/request';

const apiServer: any = {};

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const {role, ...args} = request;
    args.roleId = role?.id;
    return ajax('get', '/api/member', this._filterEmpty(args));
  }
  public deleteList(ids: string[]): Promise<any> {
    return apiServer.v1.device.deldevice.call({deviceid: ids});
  }
  public changeListStatus(ids: string[], agree: boolean, auditingreason: string = ''): Promise<any> {
    return apiServer.v1.device.auditingdevice.call({deviceid: ids, agree, auditingreason});
  }
  public getDetailItem(id: string): Promise<any> {
    return ajax('get', '/api/member/:id', {id});
  }
  public createItem(item: UpdateItem): Promise<void> {
    const {username, role, ...info} = item;
    info.roleId = role?.id!;
    return ajax('post', '/api/member', {}, {username, info});
  }
}

export default new API();
