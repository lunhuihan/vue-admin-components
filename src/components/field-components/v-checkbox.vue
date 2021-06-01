<template>
  <Checkbox v-model="formValue[item.name]" :style="calFieldWidth(item)"
    :class="calFieldClass(item)" :size="calFieldSize(item)"
    :indeterminate="item.indeterminate"
    :disabled="calFieldDisabled(item)" :true-value="item.trueValue"
    :false-value="item.falseValue"
    @on-change="(val) => { dealEvent(item.onChange, val, item) }">
    <Icon :type="item.icon" v-if="item.icon"></Icon>
    <span>{{item.label}}</span>
  </Checkbox>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VCheckbox',
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
  created() {},
  mounted() {},
  methods: {},
}
</script>
