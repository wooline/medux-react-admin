import {ListItem, ListSearch, ListSummary, UpdateItem} from 'entity/role';

import {CommonResourceAPI} from 'common/resource';
import ajax from 'common/request';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    return ajax('get', '/api/role', request);
  }
  public deleteList(ids: string[]): Promise<void> {
    return ajax('delete', '/api/role', {}, {ids});
  }
  public updateItem(item: UpdateItem): Promise<void> {
    return ajax('put', '/api/role', {}, item);
  }
  public createItem(item: UpdateItem): Promise<void> {
    return ajax('post', '/api/role', {}, item);
  }
}

export default new API();
