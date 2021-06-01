import Vue from 'vue'
import Router from 'vue-router'
import GNav from '../views/GNav.vue'
import GNavChild from '../views/GNavChild.vue'
import GSidebar from '../views/GSidebar.vue'
import VSidebarChild from '../views/VSidebarChild.vue'
import GSidebarFold from '../views/GSidebarFold.vue'
import GContent from '../views/GContent.vue'
import layout from '../views/layout.vue'
import ConfirmInput from '../views/ConfirmInput.vue'
import VerifycodeBtn from '../views/VerifycodeBtn.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/search-table/field',
          name: 'search-table-field',
          redirect: {
            name: 'search-table-field-input'
          },
          component: resolve => { require(['../views/search-table/field/index.vue'], resolve ) },
          children: [
            {
              path: 'input',
              name: 'search-table-field-input',
              component: resolve => { require(['../views/search-table/field/input/index.vue'], resolve ) }
            },
            {
              path: 'input-number',
              name: 'search-table-field-input-number',
              component: resolve => { require(['../views/search-table/field/input-number/index.vue'], resolve ) }
            },
            {
              path: 'select',
              name: 'search-table-field-select',
              component: resolve => { require(['../views/search-table/field/select/index.vue'], resolve ) }
            },
            {
              path: 'datepicker',
              name: 'search-table-field-datepicker',
              component: resolve => { require(['../views/search-table/field/datepicker/index.vue'], resolve ) }
            },
            {
              path: 'radio',
              name: 'search-table-field-radio',
              component: resolve => { require(['../views/search-table/field/radio/index.vue'], resolve ) }
            },
            {
              path: 'checkbox',
              name: 'search-table-field-checkbox',
              component: resolve => { require(['../views/search-table/field/checkbox/index.vue'], resolve ) }
            },
            {
              path: 'switch',
              name: 'search-table-field-switch',
              component: resolve => { require(['../views/search-table/field/switch/index.vue'], resolve ) }
            },
            {
              path: 'cascader',
              name: 'search-table-field-cascader',
              component: resolve => { require(['../views/search-table/field/cascader/index.vue'], resolve ) }
            },
            {
              path: 'autocomplete',
              name: 'search-table-field-autocomplete',
              component: resolve => { require(['../views/search-table/field/auto-complete/index.vue'], resolve ) }
            },
            {
              path: 'custom',
              name: 'search-table-field-custom',
              component: resolve => { require(['../views/search-table/field/custom/index.vue'], resolve ) }
            },
            {
              path: 'button-append',
              name: 'search-table-field-button-append',
              component: resolve => { require(['../views/search-table/field/button-append/index.vue'], resolve ) }
            },
            {
              path: 'two-row',
              name: 'search-table-field-two-row',
              component: resolve => { require(['../views/search-table/field/two-row/index.vue'], resolve ) }
            }
          ]
        },
        {
          path: '/search-table/table',
          name: 'search-table-table',
          redirect: {
            name: 'search-table-table-basic'
          },
          component: resolve => { require(['../views/search-table/table/index.vue'], resolve) },
          children: [
            {
              path: 'basic',
              name: 'search-table-table-basic',
              component: resolve => { require(['../views/search-table/table/basic/index.vue'], resolve ) }
            },
            {
              path: 'select',
              name: 'search-table-table-select',
              component: resolve => { require(['../views/search-table/table/select/index.vue'], resolve ) }
            },
            {
              path: 'multiple',
              name: 'search-table-table-multiple',
              component: resolve => { require(['../views/search-table/table/multiple/index.vue'], resolve ) }
            },
            {
              path: 'event',
              name: 'search-table-table-event',
              component: resolve => { require(['../views/search-table/table/event/index.vue'], resolve ) }
            }
          ]
        },
        {
          path: '/search-table/multiple',
          name: 'search-table-multiple',
          redirect: {
            name: 'search-table-multiple-basic'
          },
          component: resolve => { require(['../views/search-table/multiple/index.vue'], resolve) },
          children: [
            {
              path: 'basic',
              name: 'search-table-multiple-basic',
              component: resolve => { require(['../views/search-table/multiple/basic/index.vue'], resolve ) }
            },
            {
              path: 'slot',
              name: 'search-table-multiple-slot',
              component: resolve => { require(['../views/search-table/multiple/slot/index.vue'], resolve ) }
            },
            {
              path: 'fold',
              name: 'search-table-multiple-fold',
              component: resolve => { require(['../views/search-table/multiple/fold/index.vue'], resolve ) }
            }
          ]
        },
        {
          path: '/v-form/whole',
          name: 'v-form-whole',
          redirect: {
            name: 'v-form-basic'
          },
          component: resolve => { require(['../views/v-form/whole/index.vue'], resolve) },
          children: [
            {
              path: 'basic',
              name: 'v-form-basic',
              component: resolve => { require(['../views/v-form/whole/basic.vue'], resolve) }
            }
          ]
        },
        {
          path: '/confirm-input',
          name: 'confirm-input',
          component: ConfirmInput
        }
      ]
    },
    {
      path: '/v-nav',
      name: 'GNav',
      component: GNav
    },
    {
      path: '/v-nav-child',
      name: 'GNavChild',
      component: GNavChild
    },
    {
      path: '/v-sidebar',
      name: 'GSidebar',
      component: GSidebar
    },
    {
      path: '/v-sidebar-child',
      name: 'VSidebarChild',
      component: VSidebarChild
    },
    {
      path: '/v-sidebar-fold',
      name: 'GSidebarFold',
      component: GSidebarFold
    },
    {
      path: '/v-content',
      name: 'GContent',
      component: GContent
    },
    {
      path: '/verifycode-btn',
      name: 'VerifycodeBtn',
      component: VerifycodeBtn
    }
  ]
})
