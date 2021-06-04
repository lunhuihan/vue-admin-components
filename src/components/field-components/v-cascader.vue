<template>
  <Cascader v-model="formValue[item.name]" :data="dataSource"
    :style="calFieldStyle(item)" :class="calFieldClass(item)"
    :size="calFieldSize(item)" :placeholder="item.placeholder"
    :disabled="calFieldDisabled(item)" :change-on-select="item.changeOnSelect"
    :clearable="calClear(item)" :trigger="item.trigger"
    :filterable="item.filterable"
    :load-data="(childItem, callback) => { dealEvent(item.loadData, childItem, callback, item) }"
    :not-found-text="item.notFoundText" :transfer="item.transfer"
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
  },
}
</script>
