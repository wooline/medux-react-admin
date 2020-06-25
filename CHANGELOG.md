# 2020-06-25

## v1.1.0

### feature

- commonResource -> routeParams 中的 listKey、itemKey 改名为 listVer、itemVer，类型由 string 改为 number，它被当做当前搜索条件的 version。搜索条件相同的 2 次搜索，如果后面一次的 version 大于前一次的 version，则会重新搜索，否则将直接复用上次搜索结果。

- commonResource -> listView 增加一种通用列表视图：category，它将当前的 list 搜索结果归类为不同的 group，适合用来展示含有子栏目的列表等。

- commonResource 的 ModuleState 原来只支持一个 list 搜索结果和一个 currentItem 详情数据，支持多 list 和多 item，结构调整为：

  ```JS
  //原结构：
  {
    isModule: true,
    routeParams: {...} //路由参数，包含列表搜索条件、详情搜索条件(itemId)
    list: [] //列表搜索结果
    listSummary: {...} //列表搜索结果的摘要信息
    currentItem: {...} //详情搜索结果
  }
  //新结构：
  {
    isModule: true,
    routeParams: {...} //路由参数，包含列表搜索条件、详情搜索条件(itemId)
    list: { //listView 为 list的列表数据
      _listVer: 433243534634, //当前列表搜索结果的version
      listSearch: {...}, //当前列表搜索条件
      list: [] //列表搜索结果
      listSummary: {...} //列表搜索结果的摘要信息
    },
    selector: { //listView 为 selector的列表数据
      _listVer: 433243534634, //当前列表搜索结果的version
      listSearch: {...}, //当前列表搜索条件
      list: [] //列表搜索结果
      listSummary: {...} //列表搜索结果的摘要信息
    },
    category: { //listView 为 category的列表数据
      _listVer: 433243534634, //当前列表搜索结果的version
      listSearch: {...}, //当前列表搜索条件
      list: [] //列表搜索结果
      listSummary: {...} //列表搜索结果的摘要信息
    },
    detail: { //itemView 为 detail的详情数据
      _itemVer: 433243534634,
      itemId: 2,
      itemDetail: {...}
    },
    edit: { //itemView 为 edit的详情数据
      _itemVer: 433243534634,
      itemId: 2,
      itemDetail: {...}
    }
  }
  ```
