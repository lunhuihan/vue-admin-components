<template>
  <RadioGroup v-model="formValue[item.name]"
    :type="item.type ? item.type : item.buttonStyle ? 'button' : undefined"
    :style="calFieldStyle(item)" :class="calFieldClass(item)"
    :size="calFieldSize(item)" :button-style="item.buttonStyle"
    @on-change="(val) => { dealEvent(item.onChange, val, item) }">
    <Radio :label="radioItem.value" v-for="(radioItem, index) in dataSource"
      :key="`radio-${item.name}-${index}`" :disabled="calFieldDisabled(item)"
      :border="item.border">
      <template v-if="item.radioSlot">
        <slot :label="radioItem.label" :value="radioItem.value" :disabled="radioItem.disabled"></slot>
      </template>
      <template v-else>
        <Icon :type="radioItem.icon" v-if="radioItem.icon"></Icon>
        <span>{{radioItem.label}}</span>
      </template>
    </Radio>
  </RadioGroup>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VRadioGroup',
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
