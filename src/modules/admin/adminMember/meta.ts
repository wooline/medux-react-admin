import {RouteParams} from 'entity/member';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  id: '',
  _listKey: '',
  listSearch: {
    pageSize: 20,
    pageCurrent: 1,
    sorterField: 'createdTime',
    sorterOrder: 'ascend',
    username: undefined,
    createdTime: undefined,
  },
};
export default defaultRouteParams;
