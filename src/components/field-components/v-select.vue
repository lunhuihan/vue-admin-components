<template>
  <Select v-model.trim="formValue[item.name]"
    :style="calFieldStyle(item)" :class="calFieldClass(item)"
    :multiple="item.multiple" :size="calFieldSize(item)" :disabled="calFieldDisabled(item)"
    :number="item.number" :clearable="calClear(item)"
    :filterable="calFilter(item)" :placeholder="item.placeholder"
    :remote="item.remote" :remote-method="undefined"
    :loading="item.loading" :loading-text="item.loadingText || '搜索中'"
    :not-found-text="item.notFoundText || '无匹配数据'"
    :label-in-value="item.labelInValue" :placement="item.placement"
    :transfer="item.transfer" :element-id="item.elementId"
    :transfer-class-name="item.transferClassName" :prefix="item.prefix"
    :allow-create="item.allowCreate"
    :max-tag-count="Number(item.maxTagCount) || 100"
    :default-label="item.defaultLabel"
    :filter-by-label="item.filterByLabel"
    :max-tag-placeholder="item.maxTagPlaceholder || (() => {})"
    @on-change="(val) => { dealEvent(item.onChange, val, item)}"
    @on-query-change="(val) => { selectQueryChange(item.onQueryChange, val, item)}"
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
    formValue: {
      type: Object,
      default() {
        return {}
      },
    },
    item: Object,
    dataSource: Array,
  },
  components: {},
  data() {
    return {
      typeOf,
    }
  },
  created() {},
  mounted() {},
  methods: {
    calFilter({ filterable, allowCreate, remote }) {
      if (typeof filterable === 'boolean') {
        return filterable
      }
      if (allowCreate || remote) {
        return true
      }
      return false
    },
  },
}
</script>
