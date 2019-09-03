<template>
  <div class="logo-wrap" @click="handleLogo">
    <img class="logo-img" :src="logo" alt="" v-if="logo">
    <p class="logo-name">{{systemName}}</p>
  </div>
</template>

<script>
export default {
  name: 'VNavLogo',
  props: {
    logo: String,
    systemName: String
  },
  data () {
    return {}
  },
  created () { },
  methods: {
    handleLogo () {
      this.$emit('handle-logo')
    }
  }
}
</script>