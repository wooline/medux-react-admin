import {ListSearch} from 'entity/role';
// 定义本模块的路由参数类型
export interface RouteParams {
  listSearch: ListSearch;
}
const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 20,
    pageCurrent: 1,
  },
};
export default defaultRouteParams;
