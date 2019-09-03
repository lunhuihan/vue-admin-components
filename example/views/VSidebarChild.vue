<template>
  <div class="layout-page">
    <!-- nav -->
    <v-nav :logo="logo" system-name="综合管理台" :is-child="true" user-name="轮回韩" :fold="fold" @on-fold="toggle">
      <div class="center">这是slot的内容</div>
    </v-nav>
    <!-- layout -->
    <v-sidebar :menu-list="menuList" :active-route-name="activeRouteName" @select="selectMenu" :fold="fold"></v-sidebar>
    <!-- content -->
    <v-content :open="fold">
      这是页面内容
    </v-content>
  </div>
</template>

<script>
import storage from '../utils/storage.js'
export default {
  data () {
    return {
      logo: require('../assets/logo.png'),
      menuList: [
        {
          title: '菜单管理',
          routeName: 'VSidebar',
          icon: 'ios-apps',
          children: [
            {
              title: '首页',
              routeName: 'layout'
            },
            {
              title: '二级菜单',
              routeName: 'VSidebarChild'
            }
          ]
        },
        {
          title: '系统管理',
          routeName: 'systemManage',
          icon: 'ios-apps',
          children: [
            {
              title: '模块管理',
              routeName: 'moduleManage'
            },
            {
              title: '模块管理',
              routeName: 'moduleManage'
            }
          ]
        },
        {
          title: '白名单管理',
          routeName: 'whitelistManage',
          icon: 'ios-apps'
        }
      ],
      fold: false
    }
  },
  computed: {
    activeRouteName () {
      return this.$route.name
    }
  },
  created () {
  },
  methods: {
    toggle () {
      this.fold = !this.fold
    },
    selectMenu (menu) {
      console.log(menu)
    }
  }
}
</script>