import {ListItem, ListSearch, ListSummary} from 'entity/member';

import {CommonResourceAPI} from 'common/resource';
import ajax from 'common/request';

const apiServer: any = {};

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const roleId = request.roleId && request.roleId[0] && request.roleId[0].id;
    return ajax('get', '/api/member', {...request, roleId});
  }
  public deleteList(ids: string[]): Promise<any> {
    return apiServer.v1.device.deldevice.call({deviceid: ids});
  }
  public changeListStatus(ids: string[], agree: boolean, auditingreason: string = ''): Promise<any> {
    return apiServer.v1.device.auditingdevice.call({deviceid: ids, agree, auditingreason});
  }
}

export default new API();
