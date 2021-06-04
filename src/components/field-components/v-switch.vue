<template>
  <i-switch v-model="formValue[item.name]" :size="calFieldSize(item)"
    :disabled="calFieldStyle(item)" :true-value="item.trueValue"
    :false-value="item.falseValue" :loading="item.loading"
    @on-change="(val) => { dealEvent(item.onChange, val, item) }">
    <span slot="open" v-html="item.openText"></span>
    <span slot="close" v-html="item.closeText"></span>
  </i-switch>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VSwitch',
  mixins: [commonMixins],
  props: {
    formValue: {
      type: Object,
      default() {
        return {}
      },
    },
    item: Object,
  },
  components: {},
  data() {
    return {
      typeOf,
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
