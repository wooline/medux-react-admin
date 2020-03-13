import {ActionTypes, BaseModelHandlers, BaseModelState, RouteData, effect, reducer} from '@medux/react-web-router';
import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource} from 'entity/common';

import {simpleEqual} from 'common/utils';

export interface ResourceAPI {
  searchList?: (listSearch: BaseListSearch) => Promise<{list: any[]; listSummary: BaseListSummary}>;
  getDetailItem?: (id: string) => Promise<BaseListItem>;
  deleteList?: (ids: string[]) => Promise<void>;
  createItem?: (data: any) => Promise<void>;
  updateItem?: (data: any) => Promise<void>;
  changeListStatus?: (ids: string[], status: any, remark?: string) => Promise<void>;
}
export class CommonResourceAPI implements ResourceAPI {
  getDetailItem(id: string) {
    return Promise.resolve({id: '1'});
  }
  protected _filterEmpty<T extends {[key: string]: any}>(params: T): T {
    return Object.keys(params).reduce((pre, cur) => {
      let value = params[cur];
      const ntype = typeof value;
      if (ntype === 'string') {
        value = value.trim();
      }
      if (Array.isArray(value) && value.length === 0) {
        pre[cur] = undefined;
        return pre;
      }
      if (ntype === 'number' || ntype === 'boolean' || value) {
        pre[cur] = value;
      } else {
        pre[cur] = undefined;
      }
      return pre;
    }, {}) as T;
  }
  protected _pickFields<T, K extends keyof T>(source: T, fields: K[]): Pick<T, K> {
    return fields.reduce((prev, cur) => {
      prev[cur] = source[cur];
      return prev;
    }, {} as any);
  }
}

export interface CommonResourceState<Resource extends CommonResource> extends BaseModelState<Resource['RouteParams']> {
  list?: Resource['ListItem'][];
  listSummary?: Resource['ListSummary'];
  selectedRows?: Resource['ListItem'][];
  currentItem?: any;
}

export class CommonResourceHandlers<
  Resource extends CommonResource,
  State extends CommonResourceState<Resource>,
  RootState extends {route: {location: {pathname: string; search: string; hash: string}; data: RouteData}}
> extends BaseModelHandlers<State, RootState> {
  protected api: ResourceAPI = {};
  protected defaultRouteParams: Resource['RouteParams'] = {} as any;
  protected listPaths: string[] = [];
  protected itemPaths: string[] = [];
  protected listLoading = false;
  protected itemLoading = false;

  protected getListPaths(): string[] {
    if (this.listPaths.length) {
      return this.listPaths;
    } else {
      return ['app.Main', 'adminLayout.Main', this.moduleName + '.List'];
    }
  }
  protected getItemPaths(): string[] {
    if (this.itemPaths.length) {
      return this.itemPaths;
    } else {
      return ['app.Main', 'adminLayout.Main', this.moduleName + '.List', this.moduleName + '.Detail'];
    }
  }
  @reducer
  public putSearchList(list: Resource['ListItem'][], listSummary: Resource['ListSummary'], listSearch: Resource['ListSearch'], _listKey: string = ''): State {
    return {...this.state, routeParams: {...this.state.routeParams, listSearch, _listKey}, list, listSummary, listLoading: undefined};
  }
  @reducer
  public putCurrentItem(currentOperation?: Resource['Operation'], currentItem?: any, itemId: string = '', itemView: string = '', _itemKey: string = ''): State {
    //currentItem = currentItem || this.state.currentItem;
    return {...this.state, routeParams: {...this.state.routeParams, itemView, currentOperation, itemId, _itemKey}, currentItem, itemLoading: undefined};
  }
  @effect(null)
  public async execCurrentItem(currentOperation?: Resource['Operation'], currentItem?: any, itemView?: string, disableRoute?: boolean) {
    currentItem = currentItem || this.state.currentItem;
    const listView = this.state.routeParams?.listView || 'list';
    if (!currentOperation) {
      //关闭
      this.dispatch(this.actions.putCurrentItem());
      const routeData = this.rootState.route.data;
      const detailView = `${this.moduleName}.Detail`;
      if (routeData.paths[routeData.paths.length - 1] === detailView) {
        historyActions.push({
          extend: routeData,
          params: {[this.moduleName]: {itemId: '', itemView: '', _itemKey: '', currentOperation: undefined, listView}},
          paths: this.getListPaths(),
        });
      }
    } else {
      //展示
      itemView = itemView || this.state.routeParams?.itemView || 'detail';
      const _itemKey = Date.now().toString();
      if (typeof currentItem === 'string') {
        if (disableRoute) {
          await this.dispatch(this.actions.RouteParams({...this.state.routeParams, itemId: currentItem, itemView, _itemKey, currentOperation, listView}));
        } else {
          // extend: this.rootState.route.data,
          historyActions.push({params: {[this.moduleName]: {itemId: currentItem, itemView, _itemKey, currentOperation, listView}}, paths: this.getItemPaths()});
        }
      } else {
        this.dispatch(this.actions.putCurrentItem(currentOperation, currentItem, currentItem.id, itemView, _itemKey));
      }
    }
  }

  @reducer
  public putSelectedRows(selectedRows?: Resource['ListItem'][]): State {
    return {...this.state, selectedRows};
  }

  @effect()
  public async createItem(data: Resource['CreateItem'], callback?: (res: any) => void) {
    return this.api.createItem!(data).then(
      res => {
        this.dispatch(this.actions.putCurrentItem());
        message.success('创建成功');
        this.dispatch(this.actions.searchList({sorterField: 'createdTime', sorterOrder: 'descend', pageCurrent: 1, pageSize: 10}, 'none'));
        callback && callback(res);
      },
      err => {
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      }
    );
  }
  @effect()
  public async updateItem(data: Resource['UpdateItem'], callback?: (res: any) => void) {
    return this.api.updateItem!(data).then(
      res => {
        this.dispatch(this.actions.putCurrentItem());
        message.success('修改成功');
        this.dispatch(this.actions.searchList());
        callback && callback(res);
      },
      err => {
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      }
    );
  }
  @effect()
  public async changeListStatus({ids, status, remark}: {ids?: string[]; status: any; remark?: string}) {
    ids = ids || this.state.selectedRows!.map(item => item.id);
    if (!ids.length) {
      return;
    }
    await this.api.changeListStatus!(ids, status, remark);
    message.success('操作成功');
    await this.dispatch(this.actions.searchList());
  }
  @effect()
  public async deleteList(ids?: string[]) {
    ids = ids || this.state.selectedRows!.map(item => item.id);
    if (!ids.length) {
      return;
    }
    await this.api.deleteList!(ids);
    this.dispatch(this.actions.putSelectedRows());
    message.success('删除成功');
    await this.dispatch(this.actions.searchList());
  }
  @effect(null)
  public async searchList(
    listSearchOptional: Partial<Resource['ListSearch']> = {},
    extend: 'default' | 'current' | 'none' = 'current',
    listView?: string,
    disableRoute?: boolean,
    clearList?: boolean
  ) {
    let listSearch: Resource['ListSearch'];
    if (extend === 'default') {
      listSearch = {...this.defaultRouteParams.listSearch, ...listSearchOptional};
    } else if (extend === 'current') {
      listSearch = {...this.state.routeParams!.listSearch, ...listSearchOptional};
    } else {
      const defaultSearch = this.defaultRouteParams.listSearch;
      const noneSearch = Object.keys(defaultSearch).reduce((prev, cur) => {
        prev[cur] = undefined;
        return prev;
      }, {}) as Resource['ListSearch'];
      listSearch = {
        ...noneSearch,
        ...listSearchOptional,
      };
    }
    const _listKey = Date.now().toString();
    listView = listView || this.state.routeParams?.listView || 'list';
    if (clearList) {
      this.updateState({list: undefined});
    }
    if (disableRoute) {
      //不使用路由需要手动触发Action RouteParams
      await this.dispatch(this.actions.RouteParams({...this.state.routeParams, listView, listSearch, _listKey}));
    } else {
      //路由变换时会自动触发Action RouteParams
      //extend: this.rootState.route.data,
      historyActions.push({paths: this.getListPaths(), params: {[this.moduleName]: {listView, listSearch, _listKey}}});
    }
  }
  @effect()
  protected async fetchList(listSearch: Resource['ListSearch'], _listKey: string) {
    this.listLoading = true;
    const {list, listSummary} = await this.api.searchList!(listSearch).catch(e => {
      this.listLoading = false;
      throw e;
    });
    this.listLoading = false;
    this.dispatch(this.actions.putSearchList(list, listSummary, listSearch, _listKey));
  }
  @effect()
  protected async fetchItem(currentOperation: 'detail' | 'edit' | 'create', itemId: string, itemView: string, _itemKey: string) {
    this.itemLoading = true;
    const currentItem = await this.api.getDetailItem!(itemId).catch(e => {
      this.itemLoading = false;
      throw e;
    });
    this.itemLoading = false;
    this.dispatch(this.actions.putCurrentItem(currentOperation || 'detail', currentItem, itemId, itemView, _itemKey));
  }
  @effect(null)
  protected async [`this/${ActionTypes.MInit},this/${ActionTypes.MRouteParams}`](args: any) {
    const preRouteParams: Resource['RouteParams'] = this.beforeState?.routeParams! || {};
    //const preRouteParams: Resource['RouteParams'] = this.state.preRouteParams! || {};
    const routeParams: Resource['RouteParams'] = this.state.routeParams! || {};
    const {listView, listSearch, _listKey, itemView, itemId, _itemKey, currentOperation = 'detail'} = routeParams;
    if (!this.listLoading) {
      if (listView) {
        if (preRouteParams._listKey !== _listKey || !simpleEqual(preRouteParams.listSearch, listSearch)) {
          await this.dispatch(this.callThisAction(this.fetchList, listSearch, _listKey));
        }
      }
    }

    if (!this.itemLoading) {
      if (itemView) {
        if (preRouteParams._itemKey !== _itemKey || preRouteParams.itemId !== itemId) {
          await this.dispatch(this.callThisAction(this.fetchItem, currentOperation, itemId, itemView, _itemKey));
        }
      } else if (routeParams.itemView) {
        this.dispatch(this.actions.putCurrentItem());
      }
    }
  }
}
