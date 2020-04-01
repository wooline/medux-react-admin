import {RouteParams} from 'entity/post';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    title: undefined,
    author: undefined,
    editor: undefined,
    editorId: undefined,
    status: undefined,
    createdTime: undefined,
  },
  listView: '',
  _listKey: '',
  itemId: '',
  itemView: '',
  _itemKey: '',
};
export default defaultRouteParams;
