import {ListItem, ListSearch, ListSummary, UpdateItem} from 'entity/article';

import {CommonResourceAPI} from 'common/resource';
import ajax from 'common/request';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const {editor, ...args} = request;
    args.editorId = editor?.id;
    return ajax('get', '/api/article', this._filterEmpty(args));
  }
  public deleteList(ids: string[]): Promise<void> {
    return ajax('delete', '/api/article', {}, {ids});
  }
  public changeListStatus(ids: string[], status: string): Promise<any> {
    return ajax('put', '/api/article', {}, {ids, status});
  }
  public getDetailItem(id: string): Promise<any> {
    return ajax('get', '/api/article/:id', {id});
  }
  public createItem(item: UpdateItem): Promise<void> {
    return ajax('post', '/api/article', {}, item);
  }
  public updateItem(item: UpdateItem): Promise<void> {
    const {id} = item;
    return ajax('put', '/api/article/:id', {id: item.id}, item);
  }
}

export default new API();
