<template>
  <div class="field-html" :style="calFieldWidth(item)"
    :class="calFieldClass(item)" v-html="item.html"></div>
</template>

<script>
import commonMixins from './common-mixins'
export default {
  name: 'VHtml',
  mixins: [commonMixins],
  props: {
    item: Object,
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
