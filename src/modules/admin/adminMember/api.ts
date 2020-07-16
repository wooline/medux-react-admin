import {ListItem, ListSearch, ListSummary, UpdateItem} from 'entity/member';

import {CommonResourceAPI} from 'common/resource';
import ajax from 'common/request';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const {role, ...args} = request;
    args.roleId = role?.id;
    return ajax('get', '/api/member', this._filterEmpty(args));
  }
  public deleteList(ids: string[]): Promise<void> {
    return ajax('delete', '/api/member', {}, {ids});
  }
  public changeListStatus(ids: string[], status: string): Promise<any> {
    return ajax('put', '/api/member', {}, {ids, status});
  }
  public getDetailItem(id: string): Promise<any> {
    return ajax('get', '/api/member/:id', {id});
  }
  public createItem(item: UpdateItem): Promise<void> {
    const {username, role, ...info} = item;
    info.roleId = role?.id!;
    return ajax('post', '/api/member', {}, {username, info});
  }
  public updateItem(item: UpdateItem): Promise<void> {
    const {id, role, ...info} = item;
    info.roleId = role?.id!;
    return ajax('put', '/api/member/:id', {id}, {id, info});
  }
}

export default new API();
