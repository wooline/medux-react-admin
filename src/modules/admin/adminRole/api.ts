import {ListItem, ListSearch, ListSummary} from 'entity/role';

import {CommonResourceAPI} from 'common/resource';
import ajax from 'common/request';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    return ajax('get', '/api/role', request);
  }
  public deleteList(ids: string[]): Promise<void> {
    return ajax('delete', '/api/role', {}, ids);
  }
}

export default new API();
