<template>
  <div class="v-component v-sidebar-horizontal" :class="classes">
    <ul class="sidebar-nav">
      <li class="sidebar-nav-link" :class="[{active: index === activeSidebarNavIndex}, menu.className]" v-for="(menu, index) in menuList"
        :key="index" @click="selectMenu(menu)">
        <template v-if="menu.icon">
          <Icon :custom="menu.icon" :size="menu.iconSize || 18" v-if="menu.iconCustom" />
          <Icon :type="menu.icon" :size="menu.iconSize || 18" v-else />
        </template>{{menu.title}}
      </li>
    </ul>
    <ul class="sidebar-sub" :class="{'fold': sidebarSubFold}" v-if="hasSidebarSub">
      <li class="parent-title">{{menuList[activeSidebarNavIndex].title}}</li>
      <li class="sidebar-sub-item" v-for="(subMenu, index) in menuList[activeSidebarNavIndex].children"
        :key="`sub-${index}`">
        <template v-if="!subMenu.children || !subMenu.children.length">
          <div class="sidebar-link" :class="{active: (autoJump && activeRouteName === subMenu.routeName) || (!autoJump && selectRouteName === subMenu.routeName) }" @click.stop="selectMenu(subMenu)">{{subMenu.title}}</div>
        </template>
        <template v-else>
          <div class="sidebar-sub-title" @click="toggle(subMenu)"><Icon type="ios-arrow-down" :class="{'fold': subMenu.fold}"/>{{subMenu.title}}</div>
          <ul class="sidebar-third" v-show="!!!subMenu.fold">
            <li class="sidebar-link" :class="{active: (autoJump && activeRouteName === thirdMenu.routeName) || (!autoJump && selectRouteName === thirdMenu.routeName) }"
              v-for="(thirdMenu, index) in subMenu.children" :key="`third-${index}`" @click.stop="selectMenu(thirdMenu)">{{thirdMenu.title}}</li>
          </ul>
        </template>
      </li>
      <div class="fold-bar" @click="sidebarSubFold = !sidebarSubFold"><Icon type="ios-arrow-back" size="18"/></div>
    </ul>
  </div>
</template>

<script>
import collect from '../../utils/collect'
import { typeOf } from '../../utils/assist'
import { defaultOpts } from '../../utils/constant'
import eventBus from '../../utils/event'
export default {
  name: 'VSidebarHorizontal',
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
    width: {
      type: [String, Number],
      default: defaultOpts.sidebarHorizontalWidth
    },
    subWidth: {
      type: [String, Number],
      default: defaultOpts.sidebarHorizontalSubWidth
    },
    activeBgColor: {
      type: String,
      default: defaultOpts.activeBgColor
    }
  },
  data () {
    return {
      selectRouteName: this.activeRouteName,
      sidebarSubFold: false
    }
  },
  watch: {
    activeRouteName (val) {
      this.selectRouteName = val
    },
    fold () {
      eventBus.$emit('view-change')
    },
    sidebarSubFold () {
      eventBus.$emit('view-change')
    }
  },
  computed: {
    classes () {
      let { fold, className, menuList } = this
      return [
        fold ? 'fold' : '',
        this.hasSidebarSub && !this.sidebarSubFold ? '' : 'no-sidebar-sub',
        className
      ]
    },
    routeName () {
      return this.$route.name
    },
    menuRouteNameList () {
      let getRouteName = (list, result = []) => {
        list.forEach(({ routeName = '', children = [] } = {}) => {
          result.push(routeName)
          if (children && children.length) {
            getRouteName(children, result)
          }
        })
      }
      return this.menuList.map(({ routeName = '', children = [] } = {}) => {
        let routeNames = [routeName]
        getRouteName(children, routeNames)
        return routeNames.filter(item => item)
      })
    },
    activeSidebarNavIndex () { // 激活的一级菜单序号
    let currentRouteName = this.autoJump ? this.activeRouteName : this.selectRouteName
      for (let i = 0, len = this.menuRouteNameList.length; i < len; i++) {
        if (this.menuRouteNameList[i].includes(currentRouteName)) {
          return i
        }
      }
      return -1
    },
    hasSidebarSub () { // 激活的一级菜单是否有子菜单
      let currentMenu = this.menuList[this.activeSidebarNavIndex]
      return !!(currentMenu && currentMenu.children && currentMenu.children.length)
    }
  },
  created () {
  },
  mounted () {
    this.addWidthStyle()
    this.addActiveBgStyle()
  },
  methods: {
    addWidthStyle () {
      let width = parseFloat(this.width)
      let subWidth = parseFloat(this.subWidth)

      let style = document.createElement('style')
      style.innerHTML = `
        .v-sidebar-horizontal .sidebar-nav{
          width: ${parseFloat(width)}px !important;
        }
        .v-sidebar-horizontal .sidebar-sub{
          width: ${parseFloat(subWidth)}px !important;
        }
        .v-sidebar-horizontal.fold{
          transform: translateX(${-parseFloat(width)}px);
        }
        .v-nav .logo-wrap{
          width: ${parseFloat(width)}px !important;
          background: #20222a;
        }
        .v-nav.fold .logo-wrap{
          width: 0px !important;
          overflow: hidden;
        }
        .v-nav.fold .fold-bar{
          transform: rotate(0deg) !important;
        }
        .v-content{
          left: ${parseFloat(width + subWidth)}px !important;
        }
        .v-sidebar-horizontal.fold + .v-content{
          left: ${parseFloat(subWidth)}px !important;
        }
        .v-sidebar-horizontal.no-sidebar-sub + .v-content{
          left: ${parseFloat(width)}px !important;
        }
        .v-sidebar-horizontal.no-sidebar-sub.fold + .v-content{
          left: 0px !important;
        }
      `
      document.body.appendChild(style)
    },
    addActiveBgStyle () {
      if (this.activeBgColor === defaultOpts.activeBgColor) return
      let style = document.createElement('style')
      style.innerHTML = `
        .v-sidebar-horizontal .sidebar-nav .sidebar-nav-link.active{
          background: ${this.activeBgColor} !important;
        }
        .v-sidebar-horizontal .sidebar-nav .sidebar-nav-link:hover{
          border-left: ${this.activeBgColor} 3px solid !important;
        }
      `
      document.body.appendChild(style)
    },
    selectMenu (menu) {
      let toPage = ({ routeName, children } = {}) => {
        if (children && children.length) {
          toPage(children[0])
        } else {
          this.$emit('select', menu)
          if (this.autoJump) {
            if (this.routeName !== routeName) {
              this.$router.push({ name: routeName }).catch(err => {err})
            }
          } else {
            this.selectRouteName = routeName
          }
        }
      }
      toPage(menu)
    },
    toggle (menu) {
      let fold = menu.fold
      this.$set(menu, 'fold', !!!fold)
    }
  },
  components: {
  }
}
</script>