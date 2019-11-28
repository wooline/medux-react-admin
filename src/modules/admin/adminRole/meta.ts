import {RouteParams} from 'entity/role';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  id: '',
  _listKey: '',
  listSearch: {
    roleName: undefined,
    purview: undefined,
    pageSize: 100,
    pageCurrent: 1,
  },
};
export default defaultRouteParams;
