import {RouteParams} from 'entity/member';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    username: undefined,
    nickname: undefined,
    status: undefined,
    email: undefined,
    role: undefined,
    roleId: undefined,
    loginTime: undefined,
  },
  listView: '',
  _listKey: '',
  itemId: '',
  itemView: '',
  _itemKey: '',
};
export default defaultRouteParams;
