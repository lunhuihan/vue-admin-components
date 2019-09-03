<template>
  <div class="title" :class="{ fold }" @click="clickTitle">{{title}}<span class="triangle"></span></div>
</template>

<script>
export default {
  name: 'VTitle',
  props: {
    title: String,
    fold: Boolean
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    clickTitle () {
      this.$emit('click-title')
    }
  }
}
</script>