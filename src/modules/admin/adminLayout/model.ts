import {ActionTypes, BaseModelHandlers, BaseModelState, effect, reducer} from '@medux/react-web-router';
import {MenuItem, menuData} from 'entity/role';

import {TabNav} from 'entity';
import {UnauthorizedError} from 'common';
import {arrayToMap} from 'common/utils';

const tabNavs: TabNav[] = JSON.parse(localStorage.getItem(metaKeys.FavoritesUrlStorageKey) || '[]');
const tabNavsMap = arrayToMap(tabNavs);

function getTabNavId(url: string): string {
  const [pathname, search] = url.split(/\?/);
  let id = pathname;
  if (search) {
    id += '?' + search.split('&').sort().join('&');
  }
  return id;
}

function getCurTabNav(): TabNav {
  const title = document.title;
  const {pathname, search} = location;
  const url = pathname + search;
  const id = getTabNavId(url);
  return {id, url, title};
}

export interface State extends BaseModelState {
  menuData: MenuItem[];
  siderCollapsed?: boolean;
  tabNavEditor?: TabNav;
  tabNavCurId?: string;
  tabNavs: TabNav[];
  tabNavsMap: {[id: string]: TabNav};
}

export const initModelState: State = {
  menuData,
  tabNavsMap,
  tabNavs,
};

export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  private inited: boolean = false;
  @reducer
  protected putMenuData(menuData: MenuItem[]): State {
    return {...this.state, menuData};
  }
  @reducer
  public putSiderCollapsed(siderCollapsed: boolean): State {
    return {...this.state, siderCollapsed};
  }
  @reducer
  public openTabNavCreator(): State {
    const {id, url, title} = getCurTabNav();
    const newItem = {
      id: '',
      title,
      url,
    };
    const item = this.state.tabNavsMap[id];
    if (item) {
      return {...this.state, tabNavEditor: item};
    } else {
      return {...this.state, tabNavEditor: newItem};
    }
  }

  @reducer
  public updateTabNav(item: TabNav): State {
    const newItem = {...item};
    let tabNavs = this.state.tabNavs;
    let tabNavsMap = this.state.tabNavsMap;
    if (!newItem.id) {
      newItem.id = getTabNavId(newItem.url);
    }
    if (tabNavsMap[newItem.id]) {
      tabNavs = tabNavs.map((tab) => (tab.id === newItem.id ? newItem : tab));
    } else {
      tabNavs = [...tabNavs, newItem];
    }
    tabNavsMap = {...tabNavsMap, [newItem.id]: newItem};
    localStorage.setItem(metaKeys.FavoritesUrlStorageKey, JSON.stringify(tabNavs));
    return {...this.state, tabNavEditor: undefined, tabNavs, tabNavsMap};
  }
  @reducer
  public delTabNav(id: string): State {
    const item = this.state.tabNavsMap[id];
    if (item) {
      const tabNavs = this.state.tabNavs.filter((tab) => tab.id !== id);
      const tabNavsMap = {...this.state.tabNavsMap, [id]: undefined} as any;
      localStorage.setItem(metaKeys.FavoritesUrlStorageKey, JSON.stringify(tabNavs));
      return {...this.state, tabNavs, tabNavsMap};
    } else {
      return this.state;
    }
  }
  @effect(null)
  public async clickTabNav(item: TabNav) {
    if (this.state.tabNavCurId !== item.id) {
      historyActions.push(item.url);
    } else {
      this.updateState({tabNavEditor: item});
    }
  }
  @effect(null)
  public async closeTabNavEditor() {
    this.updateState({tabNavEditor: undefined});
  }
  @effect(null)
  protected async [`this/${ActionTypes.MInit}, ${ActionTypes.RouteChange}`]() {
    if (this.rootState.route.data.views.adminLayout && !this.rootState.app!.curUser!.hasLogin) {
      throw new UnauthorizedError(true);
    }
    const {id, url, title} = getCurTabNav();
    if (!this.inited) {
      this.inited = true;
      if (tabNavs.length === 0) {
        this.dispatch(this.actions.updateTabNav({id: '', title, url}));
      }
    }

    this.updateState({tabNavCurId: id, tabNavEditor: undefined});
  }
}
