<template>
  <div class="v-sidebar-page">
    <v-sidebar :menu-list="menuList" :current-route-name="currentRouteName" :fold="fold"></v-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          title: '系统管理',
          routeName: 'systemManage',
          icon: 'ios-apps',
          iconSize: '20'
        },
        {
          title: '用户管理',
          routeName: 'userManage',
          icon: 'md-person'
        },
        {
          title: '白名单管理',
          routeName: 'whitelistManage',
          icon: 'md-color-wand'
        }
      ],
      currentRouteName: 'systemManage',
      fold: true
    }
  },
  created () {},
  methods: {}
}
</script>