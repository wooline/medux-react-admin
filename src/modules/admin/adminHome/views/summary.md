本项目主要用来展示如何将@medux 应用于 web 后台管理系统，你可能看不到丰富的后台 UI 控件及界面，因为这不是重点，网上这样的轮子已经很多了。而本项目想着重表达的是**通用化解题思路**

# 在定制化和标准化之间妥协

通常追求极致用户体验的`UI/UE设计师`可能会让前端开发者定制各种 UI，你可能会抱怨说：这样的设计将会打乱你的模块化思想，或者让问题变得复杂化，或者失去代码重用性...然而在他们看来或许你只是想偷懒而已...无语...

用户体验当然重要，但程序的健壮性与可维护性同样重要，离开了它们，再好的用户体验都只是空中花园。别忘了人类工业革命的大爆发就是从大量制造标准件开始的，劳斯莱斯永远成不了消费的主流。

所以，我们需要在定制化和标准化之间做个妥协权衡，既保持很好的用户体验，又能够面向更多的通用业务场景。一个思路是将绝大多数场景与极少数场景分而治之，如果某个 UI 方案能切合 90%的业务场景，何必为了兼容少数场景而扭曲变形呢？

说了这么多，只是想说明本项目的立意是为了**提供一套适合大多业务场景的通用后台**，请别吐槽你的需求不能对号入座，如果是那样欢迎你对本项目进行二次开发。

# 通用的工程结构

本项目之开发目录主要结构如下：

```
src
├── assets // 存放公共静态资源
├── entity // 存放业务实体类型定义
├── common // 存放公共代码
├── components // 存放UI公共组件
├── modules
│       ├── app //主Module
│       │     ├── components
│       │     ├── views
│       │     │     ├── Main
│       │     │     ├── LoginForm
│       │     │     └── ...
│       │     ├── model.ts
│       │     └── index.ts
│       ├── admin //module分类，需要提前登录的Module
│       │     ├── adminHome
│       │     ├── adminLayout
│       │     ├── adminMember
│       │     ├── adminPost
│       │     └── adminRole
│       ├── article //module分类，游客可访问的Module
│       │     ├── articleHome
│       │     ├── articleLayout
│       │     ├── articleAbout
│       │     └── articleService
│       └── index.ts //模块配置、路由配置
└──Global.ts //将一些常用变量提升至全局，方便使用
└──index.ts 启动入口
```

- entity：首先我们要发现并定义各种业务实体的类型与数据结构，可以把他们称之为 entity，将他们放在 src/entity 下
- Component：组件通常分 2 类
  - 全局公共 Component：各个 Module 公用的组件，放在 src/components 下
  - Module 内部公共 Component：只被某个 Module 使用到的公共组件，放在 module/components 下，这样可以随 Module 按需加载
- assets：静态资源与以上 Component 一样，分为全局公用和 Module 内部公用
  - 全局静态资源放 src/assets 下
  - Module 内部静态资源放 module/assets 下
- unauthorized：从用户可访问性可以把页面分为 2 类：
  - 需要提前登录才能浏览的页面，比如本例子中的[个人中心](/admin/home)，我把他们都放在 src/modules/admin 下
  - 不需要提前登录就能浏览的页面，比如本例中的[帮助手册](/article/home)，我把他们都放在 src/modules/article 下，当然这里只是说不需要提前登录，里面部分功能还是需要**按需登录**，比如[帮助中心](/article/home) - Banner 中的`马上咨询`按钮
- login 界面：如果细心的话，登录界面也应当分 2 种：
  - 独立 Page：路由跳转到[登录页面](/login)，通常这样的独立登录页面比较有仪式感和个性化，但会中断当前的操作流
  - Pop 弹窗：轻量级登录界面，用弹窗方式会保留当前的操作流程，比如你可能费了很多时间填写一个表单，点提交时发现没有登录（可能是 session 过期了），那么此时如果应用自动将当前页面路由到/login，显然会丢失当前表单内容（当然你也可以编码保存），此时比较好的用户体验是保持当前页面状态，然后直接 Pop 登录弹窗，让用户登录后还可以继续之前的操作流。

![pop弹窗登录](/client/imgs/r-login.jpg)

- refresh：登录/登出之后要不要刷新页面
  - 刷新页面当然是 100%有效的，但是可能用户体验没那么好
  - 不刷新页面体验最好，但是你可能必须手动清理和替换一大堆当前状态，有时这会让问题和代码变得很繁琐，而且很容易引起 Bug。那么可以牺牲一下用户体验吗？其实登录登出对同用户来说并不是一个高频的操作，而且刷新页面除了时间上的等待，似乎也没有太大副作用，除了一种场景：**用户在提交表单时发现 session 刚刚过期了**，上面说过此时刷新页面会导致用户当前操作状态丢失。而且如果 session 过期只是在短时间内通常不会引起应用的当前状态出现失效，此时弹出一个`轻量级的 Login POP 让用户得以续期`是更好的解决方案
- synchronized：如何保持 client 和 server 中用户状态的同步，通常需要一个 socket 长连接推送或是 ajax 轮询，为了减少并发的压力通常使用一个 channel 就够了，可以自己定义这个 channel 的数据结构，通常只是用来推送增量差异化的数据
- tabFrame：在 singlePage 单页应用中，通常上一个页面会直接覆盖下一个页面内容，没有所谓`在新窗口中打开`这个用户体验，那么当我想比较 2 个页面时变得很难做到。比如我想快速的比较一下不同搜索条件的列表结果，当你用第 2 个搜索条件重新搜索时，发现直接把原来的结果覆盖了...
  当然你可以设计成类似于浏览器一样的多 Tab 窗口，但是那样会马上让问题复杂化，比如 Dom 要销毁吗？考虑到此需求不一定是非常高频，所以本项目利用类似浏览器`收藏夹`的功能来变相实现多窗口，如图：

![pop弹窗登录](/client/imgs/tab-frame.png)

# 面向通用资源的维护

从 Restful 得到启发，现实中纷繁复杂的业务规则其实都可以认为是面向资源 Resource 的维护，即对资源的增删改查，我们的 UI 开发其实也可以围绕这个主题展开，比如本项目中的 adminRole、adminMember、adminPost 都是对一种 Resource 的维护。

- Module：首先将每个需要维护的资源定义为一个独立的 Module，然后在 src/entity/index.ts 中定义了一些 CommonResource 的抽象类型，一个通用的 CommonResourceState 似乎应当是这样的结构：

```TS
interface CommonResourceState{
  routeParams: Resource['RouteParams'], //查询条件放在路由参数中
  list: Resource['ListItem'][]; //资源的搜索列表展示
  listSummary: Resource['ListSummary']; //资源的搜索列表摘要信息
  selectedRows: Resource['ListItem'][]; //当前选中了哪些列表项
  currentItem: any; //当前要操作哪一条资源
}
```

- List：资源的索引或叫列表查询，通常这是一个资源展示的入口视图，一般包括若干搜索条件、一个返回列表和一些摘要信息

```TS
//通用的查询条件
interface BaseListSearch {
  pageCurrent?: number;
  pageSize?: number;
  term?: string; //实时模糊搜索
  sorterOrder?: 'ascend'|'descend';
  sorterField?: string;
}
//通用的列表数据结构
interface BaseListItem {
  id: string; //不同Resource列表结构不一样，但都会有一个id
}
//通用的列表查询摘要
interface BaseListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

```

- ListRouteParams：如果你阅读过[@medux 路由](https://github.com/wooline/medux/tree/master/packages/route-plan-a)应当知道 medux 是将路由视为 State 的，所以我们把列表的查询条件放在 RouteParams 中，这样既可以通过 redux 控制，也可用 url 控制，于是路由参数应当长这样：

  ```TS
  //通用的路由参数
  interface BaseRouteParams {
    listSearch: BaseListSearch; //查询条件
    listView: string; //用哪一个列表view来展示数据
    _listKey: string; //刷新hash
  }
  ```

  注意到以上结构中 listSearch 还好理解，那么 listView 和\_listKey 是什么鬼？

  - \_listKey 你可以把它理解为对当前搜索条件的一个 version 控制，如果\_listKey 发生了变化，即使搜索条件没有变化依然会强制重新搜索，类似于我们常为静态资源 URL 后加一个随机数强制更新。另外加\_前缀可以将这笔数据放入 hash 中保存，参见[@medux 路由](https://github.com/wooline/medux/tree/master/packages/route-plan-a)
  - listView 指示用哪个 view 来展示列表数据，下面详细讨论一下，如下图：

![多个listView](/client/imgs/list-view.png)

- ListView 与 Selector：不同的业务场景可能会有不同的 view 来渲染同一份数据，在上图中我们看到，对于角色列表有 2 种展示方式：

  - 图 1 所示，在它自己的页面可能就是一个普通的列表搜索，可以按照角色名称和用户权限来搜索。
  - 图 2 所示，它被用户列表页面作为下拉选框弹出。此时虽然它被用在了别的模块，但其实还是属于角色搜索列表，搜索条件是角色名称，列表项只有角色名称一个字段。所以我们可以把这个`搜索下拉控件`当成是角色列表的另一个 listView。

  推广开来，任何 Resource 其实都可能存在至少 2 种列表视图，一种是自己的维护列表，另一种是本资源如何被其它资源选择与引用。我们可以将它们分别命名为：List 和 Selector。对于复杂的 Selector 可能还需要多个查询条件，例如下图“信息列表”中选择“责任编辑”

![多个listView](/client/imgs/selector-view.png)

- ItemDetail：详细展示某一条资源也是最常见的视图，通常有 2 种入口方式：

  - 从 listView 资源列表中点击“详细”按钮进入，这是最常见的方式
  - 直接从路由中通过 ID 进入，这样的好处是可以快速进入某一条资源，而且可以通过 url 分享给其它人，方便交流。比如[/admin/member/list/detail/superadmin](/admin/member/list/detail/superadmin)

  除了入口方式不同，详情视图本身也通常有 2 中展现方式：

  - pop 弹窗展示：轻量级交互，优点是可以维持当前页面其它状态，比如资源列表；缺点是展示区域比较狭小。
  - 独立页面展示：相对重量级交互，优点是可以展示更多内容，缺点是破坏了原页面，返回时不得不再次刷新原页面。

  至于 pop 弹窗能否通过路由到达？当然也是可以的，比如[/admin/member/list/detail/superadmin](/admin/member/list/detail/superadmin)

- Create/Update：新建与修改通常可以重用一个 Form，但有时候 2 个操作的所需的字段并不一样，所以视情况而定，能重用还是重用吧。
- ItemView：其实不管是`"详细/新建/修改"`，都可以看作是对某一条具体 Resource 进行展示，只是使用了 3 种不同的 ItemView 而已，这也可以类比 ListView。同样我们将状态 ItemView 放入路由中保存：

  ```TS
  //通用的路由参数变成
  interface BaseRouteParams {
    listSearch: BaseListSearch; //查询条件
    listView: string; //用哪一个列表view来展示数据
    _listKey: string; //刷新hash
    itemId: string;
    itemView: string; //用哪一个单条view来展示数据
    _itemKey: string; //刷新hash
  }
  ```

  - 详情：[/admin/member/list/`detail`/superadmin](/admin/member/list/detail/superadmin)
  - 修改：[/admin/member/list/`edit`/superadmin](/admin/member/list/edit/superadmin)

- ChangeStatus：其它操作比如“启用/禁用”、“审核通过/审核拒绝”等等，其实都可以抽象的当作是对资源进行 ChangeStatus
- 其它细节都比较好理解：
  - 对资源的操作可分为单条操作和批量操作
  - 点击搜索时应当把当前页码设为 1
  - 点击字段排序时也应当把页码设为 1
  - 新增一条数据后，应当将当前列表设置为按创建时间排序，并把当前页码设为 1，这样才能在列表中被及时展示
  - 修改一条数据后，应当按当前条件及页码刷新列表，这样才能看到变化
  - ...不一一例举了，大家查看项目吧
