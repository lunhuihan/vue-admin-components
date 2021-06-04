<template>
  <DatePicker v-model="formValue[item.name]"
    :style="calFieldStyle(item)" :class="calFieldClass(item)" :type="item.type"
    :placeholder="item.placeholder" :size="calFieldSize(item)" :disabled="calFieldDisabled(item)"
    :clearable="calClear(item)" :readonly="item.readonly"
    :editable="item.editable" :transfer="item.transfer"
    :element-id="item.elementId" :format="item.format"
    :placement="item.placement" :options="calDatePickerOptions(item.options)"
    :split-panels="item.splitPanels" :multiple="item.multiple"
    :show-week-numbers="item.showWeekNumbers"
    :start-date="calDatePickerDate(item.startDate)" :confirm="item.confirm"
    :open="item.open" :time-picker-options="item.timePickerOptions"
    :separator="item.separator"
    @on-change="(formatDate, date) => { dealEvent(item.onChange, formatDate, date, item) }"
    @on-open-change="(val) => { dealEvent(item.onOpenChange, val, item) }"
    @on-ok="() => { dealEvent(item.onOk, item) }"
    @on-clear="() => { dealEvent(item.onClear, item) }"
    @on-clickoutside="(event) => { dealEvent(item.onClickoutside, event, item) }">
  </DatePicker>

</template>

<script>
import commonMixins from './common-mixins'
import { typeOf, deepCopy } from '../../utils/assist'
import Time from '../../utils/time'
import findVm from '../../mixins/find-vm'
const time = new Time()

export default {
  name: 'VDatePicker',
  mixins: [commonMixins, findVm],
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
  computed: {
    valueType () {
      return typeOf(this.formValue[item.name])
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    calDatePickerOptions(options = {}) {
      // 处理datepicker的options
      let result = deepCopy(options)
      let target = this.findVm()
      if (typeOf(result.shortcuts) === 'array') {
        let shortcuts = result.shortcuts
        shortcuts.forEach((item) => {
          if (typeOf(item.value) === 'function') {
            item.value = item.value.bind(target)
          }
          if (typeOf(item.onClick) === 'function') {
            item.onClick = item.onClick.bind(target)
          }
        })
      }
      return result
    },
    calDatePickerDate(startDate) {
      // 处理datepicker的startDate，兼容string|number的日期
      if (typeOf(startDate) === 'string' || typeOf(startDate) === 'number') {
        return time.parse(startDate)
      }
      return startDate
    }
  },
}
</script>
