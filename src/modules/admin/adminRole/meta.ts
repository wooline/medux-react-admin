import {RouteParams} from 'entity/role';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  id: '',
  _listKey: '',
  listSearch: {
    pageSize: 100,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    roleName: undefined,
    purview: undefined,
  },
};
export default defaultRouteParams;
