<template>
  <div class="v-component v-sidebar" :class="classes">
    <Menu theme="dark" :active-name="activeRouteName" :accordion="accordion" :open-names="openedMenus" @on-select="selectMenu">
      <div v-show="!fold">
        <div v-for="(menu, index) in menuList" :key="index">
          <component :is="getMenuType(menu)" :name="menu.routeName || `${index}`" v-if="!menu.hidden">
            <template :slot="getSlotType(menu)">
              <template v-if="menu.icon">
                <Icon :custom="menu.icon" :size="menu.iconSize || 16" v-if="menu.iconCustom" />
                <Icon :type="menu.icon" :size="menu.iconSize || 16" v-else />
              </template>
              <span class="menu-name">{{menu.title}}</span>
            </template>
            <template v-if="menu.children">
              <div v-for="(childMenu, index) in menu.children" :key="`child-${index}`">
                <MenuItem :name="childMenu.routeName" v-if="!childMenu.hidden">
                <template v-if="childMenu.icon">
                  <Icon :custom="childMenu.icon" :size="childMenu.iconSize || 16" v-if="childMenu.iconCustom" />
                  <Icon :type="childMenu.icon" :size="childMenu.iconSize || 16" v-else />
                </template>
                <span class="menu-name">{{childMenu.title}}</span>
                </MenuItem>
              </div>
            </template>
          </component>
        </div>
      </div>
      <div v-show="fold">
        <Dropdown transfer-class-name="v-sidebar-dropdown-menu" v-for="(menu, index) in menuList" :key="index"
          placement="right-start" :transfer="true" @on-click="selectMenu">
          <template v-if="!menu.hidden">
            <div class="ivu-dropdown-side" :class="{ 'active': calDropdownActive(menu) }" v-if="menu.icon" @click.stop="selectMenu(menu.routeName)">
              <Icon :custom="menu.icon" :size="menu.iconSize || 16" v-if="menu.iconCustom" />
              <Icon :type="menu.icon" :size="menu.iconSize || 16" v-else />
            </div>
            <DropdownMenu slot="list" v-if="menu.children">
              <div v-for="(childMenu, index) in menu.children" :key="`child-${index}`">
                <DropdownItem :name="childMenu.routeName" :class="activeRouteName === childMenu.routeName ? 'active' : ''" v-if="!childMenu.hidden">{{childMenu.title}}</DropdownItem>
              </div>
            </DropdownMenu>
          </template>
        </Dropdown>
      </div>
    </Menu>
  </div>
</template>

<script>
import collect from '../../utils/collect'
import { typeOf } from '../../utils/assist'
import { defaultOpts } from '../../utils/constant'
import eventBus from '../../utils/event'
export default {
  name: 'VSidebar',
  props: {
    activeRouteName: String,
    menuList: {
      type: Array,
      validator (val) {
        return !val.length || val.every(item => (item.routeName || item.children) && item.title)
      },
      default () {
        return []
      }
    },
    autoJump: {
      type: Boolean,
      default: true
    },
    fold: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    accordion: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: defaultOpts.sidebarWidth
    },
    activeBgColor: {
      type: String,
      default: defaultOpts.activeBgColor
    }
  },
  data () {
    return {
      openedMenus: []
    }
  },
  computed: {
    classes () {
      let { fold, className, menuList } = this
      let hasChildMenu = menuList.some(item => item.children && item.children.length)
      return [
        fold ? 'fold' : '',
        className,
        hasChildMenu ? 'has-child' : ''
      ]
    }
  },
  watch: {
    fold () {
      eventBus.$emit('view-change')
    }
  },
  created () {
    this.updateOpenedMenus()
  },
  mounted () {
    this.addWidthStyle()
    this.addActiveBgStyle()
  },
  methods: {
    addWidthStyle () {
      let width = parseFloat(this.width)
      if (width === defaultOpts.sidebarWidth) return

      let style = document.createElement('style')
      let foldWidth = 66
      style.innerHTML = `
        .v-sidebar{
          width: ${parseFloat(width)}px !important;
        }
        .v-sidebar .ivu-menu{
          width: ${parseFloat(width)}px !important;
        }
        .v-sidebar.fold{
          width: ${foldWidth}px !important;
        }
        .v-sidebar.fold .ivu-menu{
          width: ${foldWidth}px !important;
        }
        .v-content{
          left: ${parseFloat(width)}px !important;
        }
        .v-sidebar.fold + .v-content{
          left: ${foldWidth}px !important;
        }
        .v-nav .logo-wrap{
          width: ${parseFloat(width)}px !important;
        }
        .v-nav.fold .logo-wrap{
          width: ${foldWidth}px !important;
        }
      `
      document.body.appendChild(style)
    },
    addActiveBgStyle () {
      if (this.activeBgColor === defaultOpts.activeBgColor) return
      let style = document.createElement('style')
      style.innerHTML = `
        .v-sidebar .ivu-menu-vertical .ivu-menu-item-active{
          background: ${this.activeBgColor} !important;
        }
        .v-sidebar .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active{
          background: ${this.activeBgColor} !important;
        }
        .v-sidebar .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
          background: ${this.activeBgColor} !important;
        }
      `
      document.body.appendChild(style)
    },
    getMenuType (item) {
      return item.children && item.children.length ? 'Submenu' : 'MenuItem'
    },
    getSlotType (item) {
      return item.children && item.children.length ? 'title' : 'default'
    },
    updateOpenedMenus () {
      this.openedMenus = []
      this.menuList.forEach((item, index) => {
        let childRouteNames = collect.getValueList(item.children, 'routeName')
        if (childRouteNames.includes(this.activeRouteName)) {
          this.openedMenus.push(item.routeName || `${index}`)
        }
      })
    },
    selectMenu (name) {
      let menu = {}
      this.menuList.forEach(item => {
        if (item.routeName === name) {
          menu = item
        } else {
          let childRouteNames = collect.getValueList(item.children, 'routeName')
          if (childRouteNames.length && childRouteNames.indexOf(name) > -1) {
            menu = item.children[childRouteNames.indexOf(name)]
          }
        }
      })
      this.$emit('select', menu)

      if (this.autoJump) {
        this.$router.push({ name }).catch(err => {err})
      }
    },
    calDropdownActive ({ children, routeName }) {
      return routeName === this.activeRouteName || collect.include(children, 'routeName', this.activeRouteName)
    }
  },
  components: {
  }
}
</script>