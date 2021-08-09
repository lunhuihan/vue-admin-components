<template>
  <Cascader v-model="currentValue" :data="dataSource"
    :style="calFieldStyle(item)" :class="calFieldClass(item)"
    :size="calFieldSize(item)" :placeholder="item.placeholder"
    :disabled="calFieldDisabled(item)" :change-on-select="item.changeOnSelect"
    :clearable="calClear(item)" :trigger="item.trigger"
    :filterable="item.filterable"
    :load-data="(childItem, callback) => { dealEvent(item.loadData, childItem, callback, item) }"
    :not-found-text="item.notFoundText" :transfer="calFieldTransfer(item.transfer)"
    :element-id="item.elementId"
    :render-format="item.renderFormat ? (labels, selectedData) => { return dealReturnEvent(item.renderFormat, labels, selectedData, item)} : undefined"
    @on-change="(val, selectedData) => { dealEvent(item.onChange, val, selectedData, item) }"
    @on-visible-change="(val) => { dealEvent(item.onVisibleChange, val, item) }">
    <slot></slot>
  </Cascader>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VCascader',
  mixins: [commonMixins],
  props: {
    value: Array,
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
      currentValue: this.value
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
  methods: {
  },
}
</script>
