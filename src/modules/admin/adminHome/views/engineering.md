本项目使用[@medux/react-web-router](https://github.com/wooline/medux/tree/master/packages/react-web-router) + [ANTD 4](https://ant.design/index-cn) 开发，全程使用 React Hooks，请先了解一下:[**为什么你需要 medux**](https://github.com/wooline/medux)

# 安装及运行

```
// 注意一下，因为本项目风格检查要求以 LF 为换行符
// 所以请先关闭 Git 配置中 autocrlf
git config --global core.autocrlf false
git clone https://github.com/wooline/medux-react-admin.git
cd medux-react-admin
yarn install
```

### 以开发模式运行

- 首先 copy 一份环境配置：将/conf/dev 目录复制一份并改名为 local，这是本地的项目配置文件，你可以修改里面的配置而不影响其它人。
- 然后运行 `yarn start`，会自动启动一个开发服务器

### 以产品模式运行

- 首先运行 `yarn build-local`，会将代码编译到 /dist/local 目录
- 然后进入 /dist/local 目录下，运行 `node start.js`，会启动一个产品服务器 Demo

### 配置不同的运行环境

- /conf 目录下可以为不同的运行环境设置不同的配置
- /public 目录下的文件将直接 copy 到发布目录
- /conf/xxx/public 目录下的文件将直接覆盖发布目录

# 关于脚手架

- 强烈推荐使用 vscode 做 IDE，已经配置好插件及自动 Fix 并格式化，配置文件也已经上传
- 使用 webpack 4.0 为核心搭建，无二次封装，干净透明
- 使用 typescript 作开发语言，直接用 babel 编译，使用 eslint + prettier 做风格检查
- 使用 Postcss + less + cssModule 构建 css，使用 style + prettier 做风格检查
- 开发环境需要很多的 dependencies，如无特殊要求，建议使用@medux/dev-pkg，它已经包含了大部分通用依赖
- 运行脚本及 webpack 配置放在/build 中
- mock 数据放在/mock 中，关于 mock 数据后面有详细说明

### 改良的 CSSModule

CSSModule 主要用来防止命名出现冲突，但是有一些缺点，比如命名过长、hash 值丑陋、不适合重用、不适合调试、编译慢等...所以本项目改良了它命名规则与用法：

- 对于使用了 cssModule 的 less 我们命名为\*.m.less，以此来区别普通的 less，加快编译速度
- 使用命名空间做约束，不必为每个 classname 都使用 cssModule 自动生成
- 我们通常只在 component 或 view 的根节点上使用 cssModule 自动生成，然后以此为命名空间来约束下级的 css，比如：

```LESS
// CSS定义
:global {
  :local(.root) { //只有根节点用生成规则
    .g-search {
      padding-top: 0;
      padding-bottom: 0;
    }
    .ant-modal-footer {
      text-align: center;
      padding: 20px;
    }
  }
}

// 在Component中引入
import styles from './index.m.less';

<div className={styles.root}>
 <div class="g-search">
  ...
 </div>
</div>
```

- 对于每个 View 来说，因为 View 一定属于某个 Module，而 ModuleName 是一定不会重复的，所以我们只需要按照 moduleName-viewName 作为 cssModule 的生成规则，并以此来作为命名空间就能保证不冲突，且可读性很好。
- 同样对于每个 Component 来说，我们以 comp-componentName 作为 cssModule 的生成规则
- 对于全局公共的 css 我们使用 g-xxx 做为 cssModule 的生成规则

看一下我们改良后的 cssModule 生成的 classname，是不是清晰很多:

![css-module](/client/imgs/css-module.png)

### 关于 Mock 数据

运行 Demo 需要从后台 api 中获取数据，通常得另外开一个 api 服务器，为此本 Demo 特意写了一个简单的 mock 中间件来合并到 webpackDevServer 中。

为什么不用 mock.js？

- 想生成有逻辑的假数据，而不是一堆占位字符
- 想模似真实的 http 请求和返回

它的基本原理如下：

![medux-proxy](/client/imgs/medux-proxy.png)

- 记录真实 API 的返回。如果启用`记录`功能，该中间件会拦截真实 API 的 Resphonse，将其以文件形式保存在/mock/temp/目录下，可以叫它们 MockFile
- 返回模拟数据。如果在/mock/下存在与请求 URL 匹配的 MockFile，将直接解析并返回该 MockFile
- 模拟延迟和各种 httpcode。编辑/mock/下面的 MockFile，在 header 中设置'x-delay'表示延迟返回，statusCode 设置 httpcode
- 模拟简单的数据库功能。/mock/下面有个`database.js`文件，该文件会被自动注入到各个 MockFile 中，你可以用它来编写简单的 server 端数据逻辑
- 在 MockFile 中使用顶级变量。MockFile 中可以使用 3 个顶级变量：'request', 'database', 'require'，所以你可以直接`const mockjs = require('mockjs');`来引用 mockjs

### 关于热更新

- 常规的热更新直接由 webpack 及 loader 支持，比如 css、图片等
- react 热更新使用最新的[React Fast Refresh](https://www.npmjs.com/package/react-refresh)方案，因为`react-hot-loader`已经宣告死亡了。
- medux 支持 model 和 view 的热更新，可以直接使用`@medux/dev-utils/dist/webpack-loader/module-hot-loader`
- cssModule 会引起 view 的热更新

### 路由配置与按需加载

统一放在/src/modules/index.ts 中，例如：

```TS
// 定义模块的加载方案，同步或者异步均可
export const moduleGetter = {
  app: () => {
    return import(/* webpackChunkName: "app" */ 'modules/app');
  },
  adminLayout: () => {
    return import(/* webpackChunkName: "adminLayout" */ 'modules/admin/adminLayout');
  },
  adminHome: () => {
    return import(/* webpackChunkName: "adminHome" */ 'modules/admin/adminHome');
  },
};
```

# 编译与上线

- 运行 `NODE_ENV=production SITE=xxx node build/build.js` 命令会根据当前环境设置将代码编译到 /dist/xxx/ 目录下，其中`SITE=xxx`表示使用 /conf/ 下的哪套环境设置
- 打包的基本原则是每个 module 打成一个独立的 chunk，这也是@medux 的特色
- 为了防止按需加载时 css 样式由于动态注入而发生页面抖动，特将 css 合并为 2 个文件，一个是 `node_modules` 中的全部样式，一个是 `src` 开发目录中的全部样式
