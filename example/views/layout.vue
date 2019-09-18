<template>
  <div class="layout-page">
    <!-- nav -->
    <v-nav :logo="logo" system-name="综合管理台" user-name="轮回韩" :fold="fold" @on-fold="toggle">
      <div class="center">这是slot的内容</div>
    </v-nav>
    <!-- layout -->
    <v-sidebar :menu-list="menuList" :active-route-name="activeRouteName" :width="180" @select="selectMenu" :fold="fold"></v-sidebar>
    <!-- content -->
    <v-content :open="fold">
      <router-view />
    </v-content>
  </div>
</template>

<script>
import storage from '../utils/storage.js'
import menu from '../utils/menu.js'
export default {
  data () {
    return {
      logo: require('../assets/logo.png'),
      menuList: [],
      fold: storage.getSession('fold', false)
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    },
    activeRouteName () {
      return menu.getActiveRouteName(this.currentRouteName)
    }
  },
  created () {
    this.menuList = menu.getSidebarMenuList()
  },
  methods: {
    toggle () {
      this.fold = !this.fold
      storage.setSession('fold', this.fold)
    },
    selectMenu (menu) {
    }
  }
}
</script>