import {ActionTypes, BaseModelHandlers, BaseModelState, RouteData, effect, reducer} from '@medux/react-web-router';

import {CommonResource} from 'entity/common';

export interface ResourceAPI {
  searchList?: (listSearch: any) => Promise<{list: any; listSummary: any}>;
  getDetailItem?: (id: any) => Promise<any>;
  getEditItem?: (id: any) => Promise<any>;
  deleteItem?: (id: any) => Promise<void>;
  deleteList?: (ids: any[]) => Promise<void>;
  createItem?: (data: any) => Promise<void>;
  updateItem?: (data: any) => Promise<void>;
  changeItemsStatus?: (ids: any[], status: any) => Promise<void>;
}

export interface CommonResourceState<Resource extends CommonResource> extends BaseModelState<Resource['RouteParams']> {
  list?: Resource['ListItem'][];
  listSummary?: Resource['ListSummary'];
  selectedRows?: Resource['ListItem'][];
  selectedRowKeys?: string[] | number[];
  editItem?: Resource['EditItem'];
  createItem?: Resource['CreateItem'];
  detailItem?: Resource['DetailItem'];
}

export class CommonResourceHandlers<
  Resource extends CommonResource,
  State extends CommonResourceState<Resource>,
  RootState extends {route: {location: {pathname: string}; data: RouteData}}
> extends BaseModelHandlers<State, RootState> {
  protected api: ResourceAPI = {};
  protected pathname: string = '';
  protected defaultRouteParams: Resource['RouteParams'] = null as any;
  protected enableRouteParams: boolean = false;

  protected setConfig(pathname: string, api: ResourceAPI, defaultRouteParams: Resource['RouteParams'], enableRouteParams?: boolean) {
    this.pathname = pathname;
    this.api = api;
    this.defaultRouteParams = defaultRouteParams;
    this.enableRouteParams = !!enableRouteParams;
  }

  @reducer
  public putDetailItem(detailItem?: Resource['DetailItem']): State {
    return {...this.state, detailItem, createItem: undefined, editItem: undefined};
  }
  @reducer
  public putEditItem(editItem?: Resource['EditItem']): State {
    return {...this.state, editItem, detailItem: undefined, createItem: undefined};
  }
  @reducer
  public putCreateItem(createItem?: Resource['CreateItem']): State {
    return {...this.state, createItem, detailItem: undefined, editItem: undefined};
  }
  @reducer
  public putSelectedRows({selectedRowKeys, selectedRows}: {selectedRowKeys?: string[] | number[]; selectedRows?: Resource['ListItem'][]}): State {
    return {...this.state, selectedRows, selectedRowKeys};
  }
  @effect()
  public async getDetailItem(id: string | number) {
    const itemDetail = await this.api.getDetailItem!(id);
    this.dispatch(this.actions.putDetailItem(itemDetail));
  }
  @effect()
  public async getEditItem(id: string | number) {
    const itemDetail = await this.api.getEditItem!(id);
    this.dispatch(this.actions.putDetailItem(itemDetail));
  }
  public async createItem(data: Resource['CreateItem'] & {_callback?: Function}) {
    const {_callback} = data;
    delete data._callback;
    return this.api.createItem!(data).then(
      () => {
        this.dispatch(this.actions.putCreateItem());
        message.success('创建成功');
        this.dispatch(this.actions.searchList());
      },
      err => _callback && _callback(err)
    );
  }
  @effect()
  public async updateItem(data: Resource['EditItem'] & {_callback?: Function}) {
    const {_callback} = data;
    delete data._callback;
    return this.api.updateItem!(data).then(
      () => {
        this.dispatch(this.actions.putEditItem());
        message.success('修改成功');
        this.dispatch(this.actions.searchList({}));
        _callback && _callback();
      },
      err => _callback && _callback(err)
    );
  }
  @effect()
  public async changeItemStatus({id, status}: {id: string | number; status: string | number}) {
    await this.api.changeItemsStatus!([id as any], status);
    message.success('修改状态成功');
    await this.dispatch(this.actions.searchList({}));
  }
  @effect()
  public async changeListStatus(ids: string[] | number[], status: string | number) {
    await this.api.changeItemsStatus!(ids, status);
    message.success('修改状态成功');
    await this.dispatch(this.actions.searchList({}));
  }
  @effect()
  public async deleteItem(id: string | number) {
    await this.api.deleteItem!(id);
    message.success('删除成功');
    await this.dispatch(this.actions.searchList({}));
  }
  @effect()
  public async deleteList(ids: string[] | number[]) {
    await this.api.deleteList!(ids);
    this.dispatch(this.actions.putSelectedRows({}));
    message.success('删除成功');
    await this.dispatch(this.actions.searchList({}));
  }

  @effect(null)
  public async searchList(params?: Partial<Resource['ListSearch']>) {
    if (!params) {
      params = this.defaultRouteParams.listSearch;
    }
    const listSearch = {...this.state.routeParams!.listSearch, ...params};
    if (this.enableRouteParams) {
      historyActions.push({extend: this.rootState.route.data, params: {[this.moduleName]: {listSearch}}});
    } else {
      await this.dispatch(this.actions.PreRouteParams({listSearch}));
    }
  }
  @effect('getList')
  protected async getList(listSearch: Resource['ListSearch']) {
    const {list, listSummary} = await this.api.searchList!(listSearch);
    this.dispatch(this.actions.putSearchList({list, listSearch, listSummary}));
  }
  @reducer
  public putSearchList({list, listSearch, listSummary}: {list: Resource['ListItem'][]; listSearch: Resource['ListSearch']; listSummary: Resource['ListSummary']}): State {
    return {...this.state, routeParams: {...this.state.routeParams!, listSearch}, list, listSummary};
  }
  @effect(null)
  protected async [`this/${ActionTypes.MInit}, this/${ActionTypes.MPreRouteParams}`]() {
    await this.dispatch(this.callThisAction(this.getList, this.state.preRouteParams!.listSearch));
  }
}

// export abstract class CommonResourceWithoutHandlers<
//   State extends CommonResourceStateWithout<ListSearch, ListItem, ListSummary, DetailItem, EditItem, CreateItem>,
//   RootState extends {route: {location: {pathname: string}}},
//   ListSearch = any,
//   ListItem = any,
//   ListSummary = any,
//   DetailItem = ListItem,
//   EditItem = ListItem,
//   CreateItem = ListItem
// > extends CommonResourceHandlers<State, RootState, {}, ListSearch, ListItem, ListSummary, DetailItem, EditItem, CreateItem> {
//   protected defaultListSearch: ListSearch = null as any;

//   protected setConfig(pathname: string, api: ResourceAPI, defaultListSearch: ListSearch) {
//     super.setConfig(pathname, api, defaultListSearch);
//     this.defaultListSearch = defaultListSearch;
//   }
//   @reducer
//   public putSearchList({list, listSearch, listSummary}: {list: ListItem[]; listSearch: ListSearch; listSummary: ListSummary}): State {
//     return {...this.state, list, listSearch, listSummary};
//   }
//   @effect('searchList')
//   public async searchList(params?: Partial<ListSearch>) {
//     if (!params) {
//       params = this.defaultListSearch;
//     }
//     const listSearch = {...this.state.listSearch, ...params};
//     const {list, listSummary} = await this.api.searchList!(listSearch);
//     this.dispatch(this.actions.putSearchList({list, listSearch, listSummary}));
//   }
// }

// export abstract class CommonResourceWithParamsHandlers<
//   State extends CommonResourceStateWithParams<RouteParams, ListSearch, ListItem, ListSummary, DetailItem, EditItem, CreateItem>,
//   RootState extends {route: {location: {pathname: string}; data: {params: {}}}},
//   RouteParams extends ResourceRouteParams<ListSearch> = any,
//   ListSearch = any,
//   ListItem = any,
//   ListSummary = any,
//   DetailItem = ListItem,
//   EditItem = ListItem,
//   CreateItem = ListItem
// > extends CommonResourceHandlers<State, RootState, RouteParams, ListSearch, ListItem, ListSummary, DetailItem, EditItem, CreateItem> {
//   protected defaultRouteParams: RouteParams = null as any;

//   protected setConfig(pathname: string, api: ResourceAPI, defaultRouteParams: RouteParams) {
//     super.setConfig(pathname, api, defaultRouteParams);
//     this.defaultRouteParams = defaultRouteParams;
//   }
//   @reducer
//   public putSearchList({list, listSearch, listSummary}: {list: ListItem[]; listSearch: ListSearch; listSummary: ListSummary}): State {
//     const routeParams: RouteParams = {...this.state.routeParams!, listSearch};
//     return {...this.state, routeParams, list, listSummary};
//   }
//   @effect('searchList')
//   public async searchList(params?: Partial<ListSearch>) {
//     if (!params) {
//       params = this.defaultRouteParams.listSearch;
//     }
//     const listSearch = {...this.state.routeParams!.listSearch, ...params};
//     const {list, listSummary} = await this.api.searchList!(listSearch);
//     this.dispatch(this.actions.putSearchList({list, listSearch, listSummary}));
//   }
//   @effect(null)
//   protected async [`this/${ActionTypes.MInit}, ${ActionTypes.RouteChange}`]() {
//     if (this.rootState.route.location.pathname === this.pathname) {
//       await this.dispatch(this.actions.searchList(this.rootState.route.data.params[this.moduleName].listSearch));
//     }
//   }
// }
