# 更新日志

- [2020-06-25 v1.1.0](https://github.com/wooline/medux-react-admin/blob/master/CHANGELOG.md)

# 项目介绍

本项目主要用来展示如何将 [**@medux**](https://github.com/wooline/medux) 应用于 web 后台管理系统，光看 UI 界面你可能看不到太多闪光点，也没有太多特别之处，网上这样的开源后台前端系统也很多，甚至你分分钟就能自己搭建一个，因为通用化的后台界面无非就是这样子。然而系统的架构理念、代码的组织风格、工程的模块化、路由的设计等等幕后工作却有如八仙过海，各显智慧。

所以你可能需要了解本项目的设计思路、并深入到工程结构与代码中才能感受到本项目的特别之处。

- [**在线预览**](http://medux-react-admin.80zp.com)

### 无需登录可访问的页面

- [/login](http://medux-react-admin.80zp.com/login)
- [/register](http://medux-react-admin.80zp.com/register)
- [/article/home](http://medux-react-admin.80zp.com/article/home)
- [/article/service](http://medux-react-admin.80zp.com/article/service)
- [/article/about](http://medux-react-admin.80zp.com/article/about)

### 需要登录才能访问的页面

- [/admin/home](http://medux-react-admin.80zp.com/admin/home)
- [/admin/member](http://medux-react-admin.80zp.com/admin/member/list)
- [/admin/role](http://medux-react-admin.80zp.com/admin/role/list)
- [/admin/post](http://medux-react-admin.80zp.com/admin/post/list)

# 查看更多项目介绍

- [掘金](https://juejin.im/post/5eb8ecdb6fb9a04332125bf8) | [知乎](https://zhuanlan.zhihu.com/p/139732293) | [语雀](https://www.yuque.com/medux/docs/medux-react-admin)

# 安装及运行

本项目使用[@medux/react-web-router](https://github.com/wooline/medux/tree/master/packages/react-web-router) + [ANTD 4](https://ant.design/index-cn) 开发，全程使用 React Hooks，并配备了比较完善的脚手架。

```
// 注意一下，因为本项目风格检查要求以 LF 为换行符
// 所以请先关闭 Git 配置中 autocrlf
git config --global core.autocrlf false
git clone https://github.com/wooline/medux-react-admin.git
cd medux-react-admin
yarn install
```

### 以开发模式运行

- 运行 `yarn start`，会自动启动一个开发服务器。
- 开发模式时 React 热更新使用最新的 [React Fast Refresh](https://www.npmjs.com/package/react-refresh) 方案，需要安装最新的 React Developer Tools。

### 查看更多代码说明

- [掘金](https://juejin.im/post/5eb8fa3ff265da7bb65fbddc) | [知乎](https://zhuanlan.zhihu.com/p/139734752) | [语雀](https://www.yuque.com/medux/docs/medux-react-admin-2)

---

**欢迎批评指正，觉得还不错的别忘了给个 Star >\_<，如有错误或 Bug 请反馈**

QQ 群交流：929696953

![QQ群交流](https://cdn.nlark.com/yuque/0/2020/png/1294343/1587232895054-aca0f46f-c5d0-46d6-973e-2e9dd76120d4.png)
