### 介绍

vue-admin-components 是根据管理台的常用业务抽象出来的组件库，基于<a href="https://cn.vuejs.org" target="_blank">Vue.js</a>和<a href="https://www.iviewui.com" target="_blank">iView</a>，主要服务于PC端管理台。

此组件库依赖iview,因此使用vue-admin-components的应用网站可以使用iview的任何组件。

### 文档
<!-- <a href="http://www.bychjh.com/vue-admin-components" target="_blank">vue-admin-components</a> -->

### npm 安装

vue-admin-components组件库依赖基础ui组件库 <i>iview</i> ,所以需同时安装<i>iview</i>，即：
```
npm install iview vue-admin-components --save
```
### 引入
在 webpack 入口页面 <i>main.js</i>中添加如下配置：
```
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import vueAdminComponents from 'vue-admin-components'
import 'vue-admin-components/dist/styles/vue-admin-components.css'

Vue.use(iView)
Vue.use(vueAdminComponents)
```
### 更新
如需将已下载的vue-admin-components更新到最新版本，敲入以下命令即可：
```
npm update vue-admin-components
```
测试
