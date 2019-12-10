import {RouteParams} from 'entity/role';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  id: '',
  _listKey: '',
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    roleName: undefined,
    purviews: undefined,
  },
};
export default defaultRouteParams;
