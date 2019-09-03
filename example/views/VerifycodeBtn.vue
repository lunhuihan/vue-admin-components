<template>
  <div class="">
    <verifycode-btn ref="verifycode-btn" @on-click="getCode" :auto="false"></verifycode-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  methods: {
    getCode () {
      console.log('获取验证码')
      this.$refs['verifycode-btn'].start()
    }
  }
}
</script>