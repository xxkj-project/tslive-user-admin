## 简介

唐僧直播用户管理系统

### 登录账号

测试账号：2008208，123456 账号来源(唐僧直播运营后台——用户列表设置大 V，用户名为用户 id，密码需要自行编辑设置)

### 测试服务器地址

测试服：54.222.167.84

测试访问：http://tapi.whkuaiyu.com/tsuser

正式服：18.162.251.202、 18.166.101.144、 18.166.33.162

正式访问：http://live.whkuaiyu.com:8888/tsuser

## 命令

```bash
# 启动
npm run serve 或 yarn serve

# 打包
npm run build:环境名 或 yarn build:环境名

# 静态资源分析
npm run report 或 yarn report

# 代码格式检查并自动修复
npm run lintcd
├── public                     // html模板
├── src                        // 源代码
│   ├── api                    // 各模块请求接口函数
│   ├── assets                 // 图片、icons、styles等静态资源
│   ├── components             // 全局公共组件
│   ├── directive              // 公共自定义指令
│   ├── filters                // 公共filter
│   │   ├── transform.js       // 字段转中文函数
│   ├── utils                  // 公用方法目录
│   │   ├── request.js         // axios请求统一配置
│   │   ├── routerGuards.js    // 全局路由拦截
│   │   ├── tools.js           // 公共工具方法
│   │   ├── storage.js         // localStorage存储封装
│   │   ├── validate.js        // 公共表单校验方法
│   ├── views                  // 所有页面代码目录
├── vue.config.js              // vue-cli配置
```

### 第三方插件

- 播放器插件(vue-video-player)

```bash

  # github地址
  https://github.com/surmon-china/vue-video-player/blob/master/examples/01-video.vue

```

### 去中心化

### 共享表单验证方法(搭配 vuex 来实现)

## 浏览器支持

IE 11
Edge
Chrome
Firefox
Safari
