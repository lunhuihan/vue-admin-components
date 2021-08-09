<template>
  <Select v-model.trim="currentValue" :style="calFieldStyle(item)"
    :class="calFieldClass(item)" :multiple="item.multiple"
    :size="calFieldSize(item)" :disabled="calFieldDisabled(item)"
    :number="item.number" :clearable="calClear(item)"
    :filterable="calFilter(item)" :placeholder="item.placeholder"
    :remote-method="item.remoteMethod ? (query) => { return dealReturnEvent(item.remoteMethod, query, item) }: undefined" :loading="item.loading"
    :loading-text="item.loadingText || '加载中'"
    :not-found-text="item.notFoundText || '无匹配数据'"
    :label-in-value="item.labelInValue" :placement="item.placement"
    :transfer="calFieldTransfer(item.transfer)" :element-id="item.elementId"
    :transfer-class-name="item.transferClassName" :prefix="item.prefix"
    :allow-create="item.allowCreate"
    :max-tag-count="Number(item.maxTagCount) || 100"
    :default-label="item.defaultLabel" :filter-by-label="item.filterByLabel"
    :max-tag-placeholder="item.maxTagPlaceholder || (() => {})"
    @on-change="(currentItem) => { dealEvent(item.onChange, currentItem, item)}"
    @on-query-change="(query) => { dealEvent(item.onQueryChange, query, item)}"
    @on-clear="() => { dealEvent(item.onClear, item)}"
    @on-open-change="(val) => { dealEvent(item.onOpenChange, val, item)}"
    @on-create="(val) => { dealEvent(item.onCreate, val, item)}"
    @on-select="(val) => { dealEvent(item.onSelect, val, item)}"
    @on-set-default-options="(val) => { dealEvent(item.onSetDefaultOptions, val, item)}">
    <slot name="options"></slot>
  </Select>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VSelect',
  mixins: [commonMixins],
  props: {
    value: [String, Number, Array],
    item: Object,
    transfer: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      currentValue: this.value,
      timer: null,
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
  methods: {
    calFilter({ filterable, allowCreate, remoteMethod }) {
      if (typeof filterable === 'boolean') {
        return filterable
      }
      if (allowCreate || remoteMethod) {
        return true
      }
      return false
    }
  },
  beforeDestroy () {
    this.timer && clearTimeout(this.timer)
  }
}
</script>
