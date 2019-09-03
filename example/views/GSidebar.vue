<template>
  <div class="v-sidebar-page">
    <v-sidebar :menu-list="menuList" :active-route-name="activeRouteName" :fold="fold" @select="selectMenu"></v-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          title: '系统管理',
          routeName: 'GSidebar',
          icon: 'ios-apps'
        },
        {
          title: '用户管理',
          routeName: 'userManage'
        },
        {
          title: '白名单管理',
          routeName: 'whitelistManage',
          icon: 'md-color-wand'
        }
      ],
      activeRouteName: 'GSidebar',
      fold: false
    }
  },
  created () {},
  methods: {
    selectMenu (menu) {
      console.log(menu)
    }
  }
}
</script>