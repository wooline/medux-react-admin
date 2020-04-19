# 项目介绍

本项目主要用来展示如何将@medux 应用于 web 后台管理系统，你可能看不到丰富的后台 UI 控件及界面，因为这不是重点，网上这样的轮子已经很多了。而本项目想着重表达的是**通用化解题思路**

- [**在线预览**](http://medux-react-admin.80zp.com)

### 查看更多项目介绍

- [语雀](https://www.yuque.com/medux/docs/medux-react-admin)

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

- 首先 copy 一份环境配置：将/conf/dev 目录复制一份并改名为 local，这是本地的项目配置文件，你可以修改里面的配置而不影响其它人。
- 然后运行 `yarn start`，会自动启动一个开发服务器

### 查看更多代码说明

- [语雀](https://www.yuque.com/medux/docs/medux-react-admin-2)

---

**欢迎批评指正，觉得还不错的别忘了给个 Star >\_<，如有错误或 Bug 请反馈**

QQ 群交流：929696953

![QQ群交流](https://cdn.nlark.com/yuque/0/2020/png/1294343/1587232895054-aca0f46f-c5d0-46d6-973e-2e9dd76120d4.png)
