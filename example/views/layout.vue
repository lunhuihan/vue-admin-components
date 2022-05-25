<template>
  <div class="layout-page">
    <!-- nav -->
    <v-nav :logo="logo" system-name="综合管理台" user-name="轮回韩1" :height="60" :fold="fold" @on-fold="toggle">
      <div class="center" slot="center">这是slot的内容</div>
      <!-- <div class="user" slot="user">这是替换用户部分的内容</div> -->
    </v-nav>
    <!-- layout -->
    <!-- <v-sidebar theme="light" :menu-list="menuList" :active-route-name="activeRouteName" active-color="#5dcbc8" @select="selectMenu" :fold="fold"></v-sidebar> -->
    <v-sidebar-horizontal :menu-list="menuList" :active-route-name="activeRouteName" @select="selectMenu" :fold="fold" :showFirstMenu="false" :sub-width="130" @subsidebar-toggle="subsidebarToggle"></v-sidebar-horizontal>
    <!-- content -->
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>
<style>
</style>
<script>
import storage from '../utils/storage.js'
import menu from '../utils/menu.js'
export default {
  data () {
    return {
      logo: require('../assets/logo.png'),
      menuList: [],
      fold: false
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
      console.log(menu)
    },
    subsidebarToggle (val) {
      console.log('val:', val)
    }
  }
}
</script>
