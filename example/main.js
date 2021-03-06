// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueAdminComponents from '../src/index'
import '../src/assets/scss/common.scss'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(VueAdminComponents, {
  searchTable: {
    pageConfig: {
      pageSizeOpts: [20, 50, 100]
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})