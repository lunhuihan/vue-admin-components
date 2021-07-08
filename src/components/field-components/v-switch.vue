<template>
  <div :class="['ivu-switch-wrap', `size-${calFieldSize(item)}`]">
    <i-switch v-model="currentValue" :class="item.className" :style="item.style"
      :size="calFieldSize(item)" :disabled="calFieldDisabled(item)"
      :true-value="item.trueValue" :false-value="item.falseValue"
      :loading="item.loading" @on-change="(val) => { dealEvent(item.onChange, val, item) }">
      <span slot="open" v-html="item.openText"></span>
      <span slot="close" v-html="item.closeText"></span>
    </i-switch>
  </div>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VSwitch',
  mixins: [commonMixins],
  props: {
    value: [String, Number, Boolean],
    item: Object,
  },
  components: {},
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    value(v) {
      this.currentValue = v
    },
    currentValue(v) {
      this.$emit('input', v)
    },
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
