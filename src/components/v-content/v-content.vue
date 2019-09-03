<template>
  <div class="v-component v-content" :class="{'open': open}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VContent',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>