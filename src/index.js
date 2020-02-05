import filter from './utils/filter'
import { typeOf } from './utils/assist'

import VNav from './components/v-nav'
import VSidebar from './components/v-sidebar'
import VSidebarHorizontal from './components/v-sidebar-horizontal'
import VContent from './components/v-content'
import ConfirmInput from './components/confirm-input'
import VerifycodeBtn from './components/verifycode-btn'
import SearchTable from './components/search-table'

const components = {
  VNav,
  VSidebar,
  VSidebarHorizontal,
  VContent,
  ConfirmInput,
  VerifycodeBtn,
  SearchTable
}

const defaultConfig = {
  searchTable: {
    pageConfig: {
      pageSizeOpts: [10, 20, 30, 40] // 默认表格分页为[10, 20, 30, 40]，每个表格可单独配置
    }
  }
}

const install = function(Vue, opts = {}) {
  if (install.installed) return
  Object.entries(components).forEach(([key, value]) => {
    Vue.component(key, value)
  })

  Object.entries(filter).forEach(([key, value]) => {
    Vue.filter(`$${key}`, value)
  })

  if (typeOf(opts) !== 'object') return

  window.$CONFIG = { ...defaultConfig, ...opts }
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  install,
  ...components
}

export default API
