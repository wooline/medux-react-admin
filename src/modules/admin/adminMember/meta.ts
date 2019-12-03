import {RouteParams} from 'entity/member';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  id: '',
  _listKey: '',
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    username: undefined,
    nickname: undefined,
    status: undefined,
    gender: undefined,
    createdTime: undefined,
    loginTime: undefined,
  },
};
export default defaultRouteParams;
