<template>
  <div class="v-nav-page">
    <v-nav :logo="logo" system-name="运营管理台" :is-child="isChild" :fold="fold" user-name="张三" :headimg="headimg" @on-logo="clickLogo" @on-fold="toggle"
      @on-out="logout">
    </v-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: require('../assets/logo.png'),
      headimg: require('../assets/headimg.jpg'),
      fold: false,
      isChild: true
    }
  },
  methods: {
    clickLogo () {
      window.location.href = 'https://baidu.com'
    },
    toggle () {
      this.fold = !this.fold
    },
    logout () {
      console.log('退出')
    }
  }
}
</script>
