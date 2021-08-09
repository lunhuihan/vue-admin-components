<template>
  <DatePicker v-model="currentValue" :style="calFieldStyle(item)"
    :class="calFieldClass(item)" :type="item.type"
    :placeholder="item.placeholder" :size="calFieldSize(item)"
    :disabled="calFieldDisabled(item)" :clearable="calClear(item)"
    :readonly="item.readonly" :editable="item.editable"
    :transfer="calFieldTransfer(item.transfer)" :element-id="item.elementId" :format="item.format"
    :placement="item.placement" :options="calDatePickerOptions(item.options)"
    :split-panels="item.splitPanels" :multiple="item.multiple"
    :show-week-numbers="item.showWeekNumbers"
    :start-date="calDatePickerDate(item.startDate)" :confirm="item.confirm"
    :open="item.open" :time-picker-options="item.timePickerOptions"
    :separator="item.separator" @on-change="onChange"
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
const timeInstance = new Time()

function parseTime(time) {
  const timeType = typeOf(time)
  if (!time || timeType === 'date') {
    return time
  }
  return timeInstance.parse(time)
}

function checkArrayDate(type = 'date', multiple = false) {
  return type.includes('range') || multiple
}

export default {
  name: 'VDatePicker',
  mixins: [commonMixins, findVm],
  props: {
    value: [String, Number, Date, Array],
    item: Object,
    transfer: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      currentValue: '',
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        let { type, multiple } = this.item
        if (checkArrayDate(type, multiple)) {
          if (typeOf(v) !== 'array') return
          this.currentValue = v
            .filter((item) => item)
            .map((item) => {
              return parseTime(item)
            })
        } else {
          if (typeOf(v) === 'undefined') return
          this.currentValue = parseTime(v)
        }
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    onChange(formatDate, date) {
      let {
        type = 'date',
        multiple,
        returnDateType,
        returnDateSeparator,
      } = this.item
      let currentValue = this.currentValue
      // 清空单选日期
      if (!type.includes('range') && !multiple && !currentValue) {
        this.$emit('input', '')
        this.dealEvent(this.item.onChange, '', this.item)
        return
      }
      // 清空日期组
      if (type.includes('range') && !currentValue[0]) {
        this.$emit('input', ['', ''])
        this.dealEvent(this.item.onChange, ['', ''], this.item)
        return
      }
      // 清空多选日期
      if (multiple && !currentValue[0]) {
        this.$emit('input', [])
        this.dealEvent(this.item.onChange, [], this.item)
        return
      }
      // 单选项
      if (checkArrayDate(type, multiple)) {
        // 日期组
        const result = this.currentValue.map((item, index) => {
          return this._formatTime(
            item,
            type,
            returnDateType,
            returnDateSeparator
          )
        })
        this.$emit('input', result)
        this.dealEvent(this.item.onChange, result, this.item)
      } else {
        const result = this._formatTime(
          this.currentValue,
          type,
          returnDateType,
          returnDateSeparator
        )
        this.$emit('input', result)
        this.dealEvent(this.item.onChange, result, this.item)
      }
    },
    calDatePickerOptions(options) {
      if (!options) return {}
      let target = this.findVm()
      if (typeOf(options) === 'object') {
        let result = deepCopy(options)
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
      }
      if (typeOf(options) === 'string') {
        return target[options]
      }
    },
    calDatePickerDate(startDate) {
      // 处理datepicker的startDate，兼容string|number的日期
      if (typeOf(startDate) === 'string' || typeOf(startDate) === 'number') {
        return timeInstance.parse(startDate)
      }
      return startDate
    },
    _formatTime(time, type, returnDateType = '', returnDateSeparator) {
      // 日期  日期控件类型  返回日期类型 返回日期分隔符
      switch (returnDateType.toLowerCase()) {
        case 'number':
          return time.getTime()
        case 'string':
          const format = this._getFormatStr(type, returnDateSeparator)
          return timeInstance.format(time, format)
        default:
          return time
      }
    },
    _getFormatStr(type, dateSeparator = '') {
      if (type.includes('datetime')) {
        let day = `Y${dateSeparator}m${dateSeparator}d`
        if (dateSeparator) {
          return day + ' H:i:s'
        } else {
          return day + 'His'
        }
      } else if (type.includes('date')) {
        return `Y${dateSeparator}m${dateSeparator}d`
      } else if (type === 'year') {
        return `Y`
      } else {
        return `Y${dateSeparator}m`
      }
    },
  },
}
</script>
