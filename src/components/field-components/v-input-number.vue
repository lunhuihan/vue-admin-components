<template>
  <InputNumber :max="typeof item.max === 'number' ? item.max : Infinity" :min="typeof item.min === 'number' ? item.min : -Infinity"
    v-model.trim="formValue[item.name]" :style="calFieldWidth(item)"
    :class="calFieldClass(item)" :step="item.step || 1"
    :disabled="calFieldDisabled(item)" :placeholder="item.placeholder"
    :readonly="item.readonly" :editable="item.editable"
    :precision="item.precision" :element-id="item.elementId"
    :formatter="item.formatter" :parser="item.parser"
    :controls-outside="item.controlsOutside"
    :size="calFieldSize(item)"
    :active-change="typeOf(item.activeChange) === 'boolean' ? item.activeChange : true"
    @on-change="(val) => { dealEvent(item.onChange, val, item)}"
    @on-focus="(event) => { dealEvent(item.onFocus, event, item)}"
    @on-blur="() => { dealEvent(item.onBlur, item)}">
  </InputNumber>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VInputNumber',
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
  created() {
  },
  mounted() {},
  methods: {},
}
</script>
