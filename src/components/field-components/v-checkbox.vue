<template>
  <Checkbox v-model="currentValue" :style="calFieldStyle(item)"
    :class="calFieldClass(item)" :size="calFieldSize(item)"
    :indeterminate="item.indeterminate"
    :disabled="calFieldDisabled(item)" :true-value="item.trueValue"
    :false-value="item.falseValue"
    @on-change="(val) => { dealEvent(item.onChange, val, item) }">
    <Icon :type="item.icon" v-if="item.icon"></Icon>
    <span>{{item.text}}</span>
  </Checkbox>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VCheckbox',
  mixins: [commonMixins],
  props: {
    value: [String, Number, Boolean],
    item: Object,
  },
  components: {},
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (v) {
      this.currentValue = v
    },
    currentValue (v) {
      this.$emit('input', v)
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
