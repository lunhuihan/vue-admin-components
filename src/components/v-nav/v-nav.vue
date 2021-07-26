<template>
  <div class="v-component v-nav" :class="[{'fold': fold}, `v-nav--${theme}`]">
    <div class="logo-wrap" @click="handleLogo">
      <slot name="logo">
        <img class="logo-img" :src="logo" alt="" v-if="logo">
        <p class="logo-name">{{systemName}}</p>
      </slot>
    </div>
    <Icon type="md-menu" class="fold-bar" size="24" @click="handleFold" />
    <div class="slot-wrap">
      <slot name="center"></slot>
    </div>
    <div class="user-wrap">
      <slot name="user">
        <Avatar icon="ios-person" :src="headimg" class="avator" size="small" />
        <span class="name">{{userName}}</span>
        <Icon type="md-log-out" size="16" @click="handleLogout" />
      </slot>
    </div>
  </div>
</template>

<script>
import { defaultOpts, themeRange } from '../../utils/constant'
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
    },
    theme: {
      type: String,
      default: 'light',
      validator (val) {
        return themeRange.includes(val)
      }
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
  }
}
</script>
