import filter from './utils/filter'

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

const install = function(Vue, opts = {}) {
  if (install.installed) return
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })

  Object.entries(filter).forEach(([key, value]) => {
    Vue.filter(`$${key}`, value)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  install,
  ...components
}

export default API
