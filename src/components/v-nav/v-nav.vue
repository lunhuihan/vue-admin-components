<template>
  <div class="v-component v-nav" :class="{'fold': fold}">
    <v-nav-logo :logo="logo" :system-name="systemName" @handle-logo="handleLogo"></v-nav-logo>
    <Icon type="md-menu" class="fold-bar" size="24" @click="handleFold" />
    <div class="slot-wrap">
      <slot name="center"></slot>
    </div>
    <slot name="user">
      <div class="user-wrap">
        <Avatar icon="ios-person" :src="headimg" class="avator" size="small" />
        <span class="name">{{userName}}</span>
        <Icon type="md-log-out" size="16" @click="handleLogout" />
      </div>
    </slot>
  </div>
</template>

<script>
import vNavLogo from '../v-nav-logo'
import { defaultOpts } from '../../utils/constant'
export default {
  name: 'VNav',
  props: {
    systemName: String,
    logo: String,
    userName: String,
    headimg: String,
    fold: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: defaultOpts.navHeight
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.addSidebarWidthStyle()
  },
  methods: {
    addSidebarWidthStyle () {
      if (this.height === defaultOpts.navHeight) return
      let style = document.createElement('style')
      style.innerHTML = `
        .v-nav{
          height: ${parseFloat(this.height)}px;
        }
        .v-nav .logo-wrap{
          height: ${parseFloat(this.height)}px;
        }
        .v-content{
          top: ${parseFloat(this.height)}px;
        }
        .v-sidebar{
          top: ${parseFloat(this.height)}px;
        }
      `
      document.body.appendChild(style)
    },
    handleLogo (event) {
      this.$emit('on-logo', event)
    },
    handleFold (event) {
      this.$emit('on-fold', event)
    },
    handleLogout (event) {
      this.$emit('on-out', event)
    }
  },
  components: {
    vNavLogo
  }
}
</script>