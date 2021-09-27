<template>
  <CheckboxGroup v-model="currentValue" :type="item.type"
    :style="calFieldStyle(item)" :class="calFieldClass(item)"
    :size="calFieldSize(item)"
    @on-change="(val) => { dealEvent(item.onChange, val, item) }">
    <Checkbox v-for="(checkboxItem, index) in dataSource" :label="checkboxItem.value"
      :key="`checkbox-${item.name}-${index}`" :size="calFieldSize(item)" :disabled="calFieldDisabled(checkboxItem)" :border="item.border">
      <Icon :type="checkboxItem.icon" v-if="checkboxItem.icon"></Icon>
      <span v-html="checkboxItem.label"></span>
    </Checkbox>
  </CheckboxGroup>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VCheckboxGroup',
  mixins: [commonMixins],
  props: {
    value: [Array],
    item: Object,
    dataSource: Array,
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
