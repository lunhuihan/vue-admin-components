import filter from './utils/filter'
import { typeOf } from './utils/assist'

import VNav from './components/v-nav'
import VSidebar from './components/v-sidebar'
import VContent from './components/v-content'
import ConfirmInput from './components/confirm-input'
import VerifycodeBtn from './components/verifycode-btn'
import SearchTable from './components/search-table'

const components = {
  VNav,
  VSidebar,
  VContent,
  ConfirmInput,
  VerifycodeBtn,
  SearchTable
}

const defaultConfig = {
  searchTable: {
    pageConfig: {
      pageSizeOpts: [10, 20, 30, 40]
    }
  }
}

const install = function(Vue, opts = {}) {
  if (install.installed) return
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
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
