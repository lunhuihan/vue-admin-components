<template>
  <InputNumber
    :max="typeof item.max === 'number' ?  item.max : Infinity"
    :min="typeof item.min === 'number' ? item.min : -Infinity"
    v-model.trim="currentValue" :style="calFieldStyle(item)"
    :class="calFieldClass(item)" :step="item.step || 1"
    :disabled="calFieldDisabled(item)" :placeholder="item.placeholder"
    :readonly="calReadonly(item)" :editable="item.editable"
    :precision="item.precision" :element-id="item.elementId"
    :formatter="item.formatter" :parser="item.parser"
    :controls-outside="item.controlsOutside" :size="calFieldSize(item)"
    :active-change="typeOf(item.activeChange) === 'boolean' ? item.activeChange : true"
    @on-change="(val) => { dealEvent(item.onChange, val, item)}"
    @on-focus="(event) => { dealEvent(item.onFocus, event, item)}"
    @on-blur="() => { dealEvent(item.onBlur, item)}">
  </InputNumber>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'

function getAreaNumber(value, min, max) {
  if (value === null) return value
  if (typeOf(max) === 'number' && value > max) {
    return max
  }
  if (typeOf(min) === 'number' && value < min) {
    return min
  }
  return value
}

export default {
  name: 'VInputNumber',
  mixins: [commonMixins],
  props: {
    value: Number,
    item: Object,
  },
  components: {},
  data() {
    return {
      currentValue: 1,
      typeOf,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (typeOf(v) !== 'number') return
        let { min, max } = this.item
        this.currentValue = getAreaNumber(v, min, max)
      },
    },
    currentValue: {
      handler(v) {
        this.$emit('input', v)
      },
    },
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
