import {Actions, BaseModelHandlers, BaseModelState, RouteData, effect, reducer} from '@medux/react-web-router';
import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource} from 'entity';

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

// export interface CommonResourceState<Resource extends CommonResource> extends BaseModelState<Resource['RouteParams']> {
//   listCase: {[view in Resource['ListView']]?: {_listKey?: string; list?: Resource['ListItem'][]; listSummary?: Resource['ListSummary']; listSearch?: Resource['ListSearch']}};
//   itemCase: {[view in Resource['ItemView']]?: {_itemKey?: string; itemId?: string; itemDetail?: Resource['ItemDetail']}};
//   selectedRows?: Resource['ListItem'][];
// }

export type CommonResourceState<Resource extends CommonResource> = BaseModelState<Resource['RouteParams']> &
  {[view in Resource['ListView']]?: {_listKey?: string; list?: Resource['ListItem'][]; listSummary?: Resource['ListSummary']; listSearch?: Resource['ListSearch']}} &
  {[view in Resource['ItemView']]?: {_itemKey?: string; itemId?: string; itemDetail?: Resource['ItemDetail']}} & {selectedRows?: Resource['ListItem'][]};

export interface Config<Resource extends CommonResource> {
  api: ResourceAPI;
  defaultRouteParams: Resource['RouteParams'];
  newItem?: Resource['CreateItem'];
  enableRoute?: {[view in Resource['ListView'] | Resource['ItemView']]?: boolean};
  listPaths?: string[];
  itemPaths?: string[];
}
export abstract class CommonResourceHandlers<
  Resource extends CommonResource = CommonResource,
  State extends CommonResourceState<Resource> = CommonResourceState<Resource>,
  RootState extends {route: {location: {pathname: string; search: string; hash: string}; data: RouteData}} = {route: {location: {pathname: string; search: string; hash: string}; data: RouteData}}
> extends BaseModelHandlers<State, RootState> {
  protected config: Required<Config<Resource>> & {noneListSearch: Resource['RouteParams']['listSearch']};
  protected listLoading = false;
  protected itemLoading = false;

  constructor(configOptions: Config<Resource>, moduleName: string, store: any) {
    super(moduleName, store);
    const defConfig = {
      newItem: {},
      enableRoute: {list: true, detail: false},
      listPaths: ['app.Main', 'adminLayout.Main', this.moduleName + '.List'],
      itemPaths: ['app.Main', 'adminLayout.Main', this.moduleName + '.List', this.moduleName + '.Item'],
    };
    this.config = {...defConfig, ...configOptions} as any;
    this.config.noneListSearch = Object.keys(this.config.defaultRouteParams.listSearch).reduce((prev, cur) => {
      prev[cur] = undefined;
      return prev;
    }, {});
  }

  protected getCurrentListSearch(): Resource['ListSearch'] {
    return this.state.routeParams!.listSearch;
  }
  protected getDefaultListSearch(): Resource['ListSearch'] {
    return this.config.defaultRouteParams.listSearch;
  }
  protected getNoneListSearch(): Resource['ListSearch'] {
    return this.config.noneListSearch;
  }
  @reducer
  public putSearchList(list: Resource['ListItem'][], listSummary: Resource['ListSummary'], listSearch: Resource['ListSearch'], listView: string, _listKey: string): State {
    return {...this.state, listCase: {...this.state.listCase, [listView]: {_listKey, listSearch, list, listSummary}}, listLoading: undefined};
  }
  @reducer
  public putCurrentItem(itemDetail: any, itemId: string, itemView: string, _itemKey: string): State {
    return {...this.state, itemCase: {...this.state.itemCase, [itemView]: {_itemKey, itemId, itemDetail}}, itemLoading: undefined};
  }
  @reducer
  public putSelectedRows(selectedRows?: Resource['ListItem'][]): State {
    return {...this.state, selectedRows};
  }
  @effect(null)
  public async closeCurrentItem() {
    const itemView = this.state.routeParams!.itemView;
    const enableRoute = this.config.enableRoute[itemView];
    const routeData = this.state.routeParams;
    if (enableRoute) {
      historyActions.push({
        params: {[this.moduleName]: {...routeData, itemId: '', itemView: '', _itemKey: ''}},
        paths: this.config.listPaths,
      });
    } else {
      this.dispatch(this.actions.RouteParams({...routeData, itemId: '', itemView: '', _itemKey: ''}));
    }
  }
  @effect(null)
  public async openCurrentItem(currentItem: any, view?: Resource['ItemView']) {
    const itemView = view || this.state.routeParams?.itemView || 'detail';
    const _itemKey = Date.now().toString();
    if (!currentItem) {
      currentItem = {...this.config.newItem, id: ''};
    }
    let itemId = currentItem;
    if (typeof currentItem !== 'string') {
      itemId = currentItem.id;
      this.dispatch(this.actions.putCurrentItem(currentItem, itemId, itemView, _itemKey));
    }
    const enableRoute = this.config.enableRoute[itemView];
    const routeData = this.state.routeParams;
    if (enableRoute) {
      historyActions.push({params: {[this.moduleName]: {...routeData, itemId, itemView, _itemKey}}, paths: this.config.itemPaths});
    } else {
      this.dispatch(this.actions.RouteParams({...routeData, itemId, itemView, _itemKey}));
    }
  }

  @effect()
  public async createItem(data: Resource['CreateItem'], callback?: (res: any) => void) {
    return this.config.api.createItem!(data).then(
      (res) => {
        this.dispatch(this.actions.closeCurrentItem());
        message.success('创建成功');
        this.dispatch(this.actions.latestListSearch());
        callback && callback(res);
      },
      (err) => {
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
    return this.config.api.updateItem!(data).then(
      (res) => {
        this.dispatch(this.actions.closeCurrentItem());
        message.success('修改成功');
        this.dispatch(this.actions.refreshListSearch());
        callback && callback(res);
      },
      (err) => {
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
    ids = ids || this.state.selectedRows!.map((item) => item.id);
    if (!ids.length) {
      return;
    }
    await this.config.api.changeListStatus!(ids, status, remark);
    message.success('操作成功');
    await this.dispatch(this.actions.refreshListSearch());
  }
  @effect()
  public async deleteList(ids?: string[]) {
    ids = ids || this.state.selectedRows!.map((item) => item.id);
    if (!ids.length) {
      return;
    }
    await this.config.api.deleteList!(ids);
    message.success('删除成功');
    await this.dispatch(this.actions.refreshListSearch());
  }
  @effect(null)
  public async latestListSearch() {
    await this.searchList({params: {sorterField: 'createdTime', sorterOrder: 'descend'}, extend: 'none'});
  }
  @effect(null)
  public async refreshListSearch() {
    this.dispatch(this.actions.putSelectedRows());
    await this.searchList({params: {}, extend: 'current'});
  }
  @effect(null)
  public async sortListSearch(sorterField: string, sorterOrder: 'ascend' | 'descend' | undefined) {
    await this.searchList({params: {sorterField, sorterOrder, pageCurrent: 1}, extend: 'current'});
  }
  @effect(null)
  public async changeListPage(pageCurrent: number) {
    await this.searchList({params: {pageCurrent}, extend: 'current'});
  }
  @effect(null)
  public async changeListPageSize(pageSize: number) {
    await this.searchList({params: {pageCurrent: 1, pageSize}, extend: 'current'});
  }
  @effect(null)
  public async resetListSearch(options: Resource['ListSearch'] = {}) {
    await this.searchList({params: options, extend: 'default'});
  }
  @effect(null)
  public async noneListSearch(options: Resource['ListSearch'] = {}) {
    await this.searchList({params: options, extend: 'none'});
  }
  @effect(null)
  public async doListSearch(options: Resource['ListSearch'] = {}) {
    await this.searchList({params: {...options, pageCurrent: 1}, extend: 'current'});
  }
  @effect(null)
  public async searchList({params, extend}: {params: Resource['ListSearch']; extend: 'default' | 'current' | 'none'}, view?: Resource['ListView']) {
    let listSearch: Resource['ListSearch'];
    if (extend === 'default') {
      listSearch = {...this.getDefaultListSearch(), ...params};
    } else if (extend === 'current') {
      listSearch = {...this.getCurrentListSearch(), ...params};
    } else {
      listSearch = {...this.getNoneListSearch(), ...params};
    }

    const _listKey = Date.now().toString();
    const listView = view || this.state.routeParams?.listView || 'list';
    const enableRoute = this.config.enableRoute[listView];
    const routeData = this.state.routeParams;
    if (enableRoute) {
      //路由变换时会自动触发Action RouteParams
      //extend: this.rootState.route.data,
      historyActions.push({paths: this.config.listPaths, params: {[this.moduleName]: {...routeData, listView, listSearch, _listKey}}});
    } else {
      //不使用路由需要手动触发Action RouteParams
      await this.dispatch(this.actions.RouteParams({...routeData, listView, listSearch, _listKey}));
    }
  }
  @effect()
  protected async fetchList(listSearch: Resource['ListSearch'], listView: string, _listKey: string) {
    this.listLoading = true;
    const {list, listSummary} = await this.config.api.searchList!(listSearch).catch((e) => {
      this.listLoading = false;
      throw e;
    });
    this.listLoading = false;
    this.dispatch(this.actions.putSearchList(list, listSummary, listSearch, listView, _listKey));
  }
  @effect()
  protected async fetchItem(itemId: string, itemView: string, _itemKey: string) {
    this.itemLoading = true;
    const item = await this.config.api.getDetailItem!(itemId).catch((e) => {
      this.itemLoading = false;
      throw e;
    });
    this.itemLoading = false;
    this.dispatch(this.actions.putCurrentItem(item, itemId, itemView, _itemKey));
  }
  @effect(null)
  protected async ['this.Init,this.RouteParams']() {
    const routeParams: Resource['RouteParams'] = this.state.routeParams! || {};
    const {listView, listSearch, _listKey, itemView, itemId, _itemKey} = routeParams;
    if (!this.listLoading) {
      if (listView) {
        const {_listKey: _prevListkey, listSearch: prevListSearch} = this.state[listView] || {};
        if (_listKey !== _prevListkey || !simpleEqual(listSearch, prevListSearch)) {
          await this.dispatch(this.callThisAction(this.fetchList, listSearch, listView, _listKey));
        }
      }
    }
    if (!this.itemLoading) {
      if (itemView) {
        const {_itemKey: _prevItemkey, itemId: prevItemId} = this.state[itemView] || {};
        if (_itemKey !== _prevItemkey || itemId !== prevItemId) {
          await this.dispatch(this.callThisAction(this.fetchItem, itemId, itemView, _itemKey));
        }
      }
    }
  }
}
export type CommonResourceActions = Actions<CommonResourceHandlers>;
