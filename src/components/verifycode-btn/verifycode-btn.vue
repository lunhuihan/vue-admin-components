<template>
  <span class="v-component vcode-btn">
    <span class="start-btn" :class="{'disabled': disabled}" v-if="!timer || seconds < 0" @click="clickHandle">{{startText}}</span>
    <span class="down-btn" v-else>{{seconds}}s</span>
  </span>
</template>

<script>
import storage from '../../utils/storage'
export default {
  name: 'VerifycodeBtn',
  props: {
    max: {
      type: Number,
      default: 60
    },
    startText: {
      type: String,
      default: '获取验证码'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {  // 是否限制max时间内只发送一次，默认限制
      type: Boolean,
      default: true
    },
    auto: { // 点击后是否自动开始倒计时，默认自动,如果不自动，需手动调用start方法
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      timer: null,
      seconds: this.max,
      timeSessionKey: `${this.$route.name}-codetime`
    }
  },
  created () {
    this.limit && this.checkCountDownInfo()
  },
  methods: {
    checkCountDownInfo () {
      let now = new Date()
      let sendTimeStamp = storage.getSession(this.timeSessionKey, now.getTime())
      this.seconds = parseInt((sendTimeStamp + this.max * 1000 - now.getTime()) / 1000)
      if (this.seconds > 0 && this.seconds < this.max) {
        this.countDown()
      } else {
        this.init()
      }
    },
    countDown () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.seconds--
        if (this.seconds <= 0) {
          this.init()
        }
      }, 1000)
    },
    init () {
      clearInterval(this.timer)
      this.seconds = this.max
      this.timer = null
      this.limit && storage.removeSession(this.timeSessionKey)
    },
    start () {
      if (this.disabled || this.timer) return
      this.limit && storage.setSession(this.timeSessionKey, new Date().getTime())
      this.countDown()
    },
    clickHandle () {
      this.auto && this.start()
      this.$emit('on-click')
    }
  }
}
</script>