import {ActionTypes, BaseModelHandlers, BaseModelState, RouteData, effect, reducer} from '@medux/react-web-router';
import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource} from 'entity/common';

export interface CommonResourceState<Resource extends CommonResource> extends BaseModelState<Resource['RouteParams']> {
  list?: Resource['ListItem'][];
  listSummary?: Resource['ListSummary'];
  selectedRows?: Resource['ListItem'][];
  selectionList?: Resource['ListItem'][];
  currentOperation?: Resource['Operation'];
  currentItem?: any;
}

export class CommonResourceHandlers<
  Resource extends CommonResource,
  State extends CommonResourceState<Resource>,
  RootState extends {route: {location: {pathname: string}; data: RouteData}}
> extends BaseModelHandlers<State, RootState> {
  protected api: ResourceAPI = {};
  protected defaultRouteParams: Resource['RouteParams'] = {} as any;

  @reducer
  public putSearchList({list, listSearch, listSummary}: {list: Resource['ListItem'][]; listSearch: Resource['ListSearch']; listSummary: Resource['ListSummary']}): State {
    return {...this.state, selectedRows: undefined, routeParams: {...this.state.routeParams!, listSearch}, list, listSummary};
  }
  @reducer
  public putCurrentItem(currentOperation?: Resource['Operation'], currentItem?: any): State {
    return {...this.state, currentOperation, currentItem};
  }
  @reducer
  public putSelectedRows(selectedRows?: Resource['ListItem'][]): State {
    return {...this.state, selectedRows};
  }
  @reducer
  public putSelectionList(selectionList?: Resource['ListItem'][]): State {
    return {...this.state, selectionList};
  }
  @effect()
  public async getDetailItem(id: string) {
    const itemDetail = await this.api.getDetailItem!(id);
    this.dispatch(this.actions.putCurrentItem('detail', itemDetail));
  }
  @effect()
  public async getEditItem(id: string) {
    const itemDetail = await this.api.getDetailItem!(id);
    this.dispatch(this.actions.putCurrentItem('edit', itemDetail));
  }
  @effect()
  public async createItem(data: Resource['CreateItem'], callback?: (res: any) => void) {
    return this.api.createItem!(data).then(
      res => {
        this.dispatch(this.actions.putCurrentItem(undefined));
        message.success('创建成功');
        this.dispatch(this.actions.searchList({}, 'none'));
        callback && callback(res);
      },
      err => callback && callback(err)
    );
  }
  @effect()
  public async updateItem(data: Resource['UpdateItem'], callback?: (res: any) => void) {
    const {_callback} = data;
    delete data._callback;
    return this.api.updateItem!(data).then(
      res => {
        this.dispatch(this.actions.putCurrentItem(undefined));
        message.success('修改成功');
        this.dispatch(this.actions.searchList({}, 'current'));
        callback && callback(res);
      },
      err => callback && callback(err)
    );
  }
  @effect()
  public async changeListStatus({ids, status, remark}: {ids: string[]; status: any; remark?: string}) {
    await this.api.changeListStatus!(ids, status, remark);
    message.success('操作成功');
    await this.dispatch(this.actions.searchList({}, 'current'));
  }
  @effect()
  public async deleteList(ids: string[]) {
    await this.api.deleteList!(ids);
    message.success('删除成功');
    await this.dispatch(this.actions.searchList({}, 'current'));
  }
  @effect()
  protected async fetchList(listSearch: Resource['ListSearch']) {
    const {list, listSummary} = await this.api.searchList!(listSearch);
    this.dispatch(this.actions.putSearchList({list, listSearch, listSummary}));
  }
  @effect(null)
  public async searchList(listSearch: Resource['ListSearch'], extend: 'default' | 'current' | 'none', disableRoute?: boolean) {
    if (extend === 'default') {
      listSearch = {...this.defaultRouteParams.listSearch, ...listSearch};
    } else if (extend === 'current') {
      listSearch = {...this.state.routeParams!.listSearch, ...listSearch};
    }
    if (disableRoute) {
      //不使用路由需要手动触发Action PreRouteParams
      this.dispatch(this.actions.PreRouteParams({...this.state.routeParams, listSearch}));
    } else {
      //路由变换时会自动触发Action PreRouteParams
      historyActions.push({extend: this.rootState.route.data, params: {[this.moduleName]: {listSearch}}});
    }
  }
  @effect(null)
  protected async [`this/${ActionTypes.MInit}, this/${ActionTypes.MPreRouteParams}`]() {
    await this.dispatch(this.callThisAction(this.fetchList, this.state.preRouteParams!.listSearch));
  }
}

export interface ResourceAPI {
  searchList?: (listSearch: BaseListSearch) => Promise<{list: any[]; listSummary: BaseListSummary}>;
  getDetailItem?: (id: string) => Promise<BaseListItem>;
  deleteList?: (ids: string[]) => Promise<void>;
  createItem?: (data: BaseListItem) => Promise<void>;
  updateItem?: (data: BaseListItem) => Promise<void>;
  changeListStatus?: (ids: string[], status: any, remark?: string) => Promise<void>;
}
export class CommonResourceAPI implements ResourceAPI {
  getDetailItem(id: string) {
    return Promise.resolve({id: '1'});
  }
  protected _pickFields<T, K extends keyof T>(source: T, fields: K[]): Pick<T, K> {
    return fields.reduce((prev, cur) => {
      prev[cur] = source[cur];
      return prev;
    }, {} as any);
  }
}
