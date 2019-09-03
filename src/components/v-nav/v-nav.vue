<template>
  <div class="v-component v-nav" :class="{'fold': fold}">
    <v-nav-logo :logo="logo" :system-name="systemName" @handle-logo="handleLogo"></v-nav-logo>
    <Icon type="md-menu" class="fold-bar" size="24" @click="handleFold" />
    <div class="slot-wrap">
      <slot></slot>
    </div>
    <div class="user-wrap">
      <Avatar icon="ios-person" :src="headimg" class="avator" size="small" />
      <span class="name">{{userName}}</span>
      <Icon type="md-log-out" size="16" @click="handleLogout" />
    </div>
  </div>
</template>

<script>
import vNavLogo from '../v-nav-logo'
export default {
  name: 'VNav',
  props: {
    systemName: {
      type: String,
      required: true
    },
    logo: String,
    userName: String,
    headimg: String,
    fold: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
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