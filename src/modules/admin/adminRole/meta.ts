import {RouteParams} from 'entity/role';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    term: undefined,
    sorterField: undefined,
    sorterOrder: undefined,
    roleName: undefined,
    purviews: undefined,
  },
  currentOperation: undefined,
  listView: '',
  _listKey: '',
  itemId: '',
  itemView: '',
  _itemKey: '',
};
export default defaultRouteParams;
