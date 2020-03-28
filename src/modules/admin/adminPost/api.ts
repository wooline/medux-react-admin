import {ListItem, ListSearch, ListSummary, UpdateItem} from 'entity/post';

import {CommonResourceAPI} from 'common/resource';
import ajax from 'common/request';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const {editor, ...args} = request;
    args.editorId = editor?.id;
    return ajax('get', '/api/post', this._filterEmpty(args));
  }
  public deleteList(ids: string[]): Promise<void> {
    return ajax('delete', '/api/post', {}, {ids});
  }
  public changeListStatus(ids: string[], status: string): Promise<any> {
    return ajax('put', '/api/post', {}, {ids, status});
  }
  public getDetailItem(id: string): Promise<any> {
    return ajax('get', '/api/post/:id', {id});
  }
  public createItem(item: UpdateItem): Promise<void> {
    const {editors, ...info} = item;
    info.editorIds = editors.map((editor) => editor.id);
    return ajax('post', '/api/post', {}, info);
  }
  public updateItem(item: UpdateItem): Promise<void> {
    const {editors, ...info} = item;
    const id = item.id;
    info.editorIds = editors.map((editor) => editor.id);
    return ajax('put', '/api/post/:id', {id}, info);
  }
}

export default new API();
