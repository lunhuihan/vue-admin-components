<template>
  <AutoComplete v-model.trim="currentValue" :style="calFieldStyle(item)"
    :class="calFieldClass(item)" :size="calFieldSize(item)"
    :clearable="calClear(item)" :disabled="calFieldDisabled(item)"
    :placeholder="item.placeholder" :icon="item.icon"
    :placement="item.placement" :transfer="calFieldTransfer(item.transfer)"
    :element-id="item.elementId" :transfer-class-name="item.transferClassName"
    :data="item.filterMethod ? dataSource : []"
    :filter-method="typeOf(item.filterMethod) === 'boolean' ? item.filterMethod : (value, option) => { return dealReturnEvent(item.filterMethod, value, option, item) }"
    @on-change="(val) => { dealEvent(item.onChange, val, item)}"
    @on-select="(val) => { dealEvent(item.onSelect, val, item)}"
    @on-search="(val) => { dealEvent(item.onSearch, val, item)}"
    @on-focus="() => { dealEvent(item.onFocus, item)}"
    @on-blur="() => { dealEvent(item.onBlur, item)}"
    @on-clear="() => { dealEvent(item.onClear, item)}">
    <slot></slot>
  </AutoComplete>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VAutoComplete',
  mixins: [commonMixins],
  props: {
    value: [String, Number],
    item: Object,
    dataSource: Array,
    transfer: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      currentValue: this.value,
      typeOf,
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
