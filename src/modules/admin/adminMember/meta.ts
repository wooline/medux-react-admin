import {ListSearch} from 'entity/member';
// 定义本模块的路由参数类型
export interface RouteParams {
  listSearch: ListSearch;
}
const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 20,
    pageCurrent: 1,
    sorterField: 'createdTime',
    sorterOrder: 'ascend',
    username: 'aaa',
    createdTime: undefined,
  },
};
export default defaultRouteParams;
