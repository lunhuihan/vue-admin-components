<template>
  <div class="v-component v-content" :class="{'open': open}">
    <slot></slot>
  </div>
</template>

<script>
import emitter from '../../mixins/emitter'
export default {
  name: 'VContent',
  mixins: [emitter],
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
  watch: {
    open (val) {
      this.broadcast('SearchBox', 'viewChange', val)
    }
  },
  methods: {
  }
}
</script>