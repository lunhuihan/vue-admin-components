<template>
  <div class="v-nav-page">
    <v-nav :logo="logo" system-name="运营管理台" :fold="fold" user-name="张三" :headimg="headimg" @on-logo="clickLogo" @on-fold="toggle"
      @on-out="logout">
      <p slot="logo">自定义logo部分</p>
    </v-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: require('../assets/logo.png'),
      headimg: require('../assets/headimg.jpg'),
      fold: false
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
