<template>
  <CheckboxGroup v-model="formValue[item.name]" :type="item.type"
    :style="calFieldStyle(item)" :class="calFieldClass(item)"
    :size="calFieldSize(item)"
    @on-change="(val) => { dealEvent(item.onChange, val, item) }">
    <Checkbox v-for="(checkboxItem, index) in dataSource" :label="checkboxItem.value"
      :key="`checkbox-${item.name}-${index}`" :size="calFieldSize(item)" :disabled="calFieldDisabled(checkboxItem)">
      <Icon :type="checkboxItem.icon" v-if="checkboxItem.icon"></Icon>
      <span>{{checkboxItem.label}}</span>
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
  methods: {},
}
</script>
