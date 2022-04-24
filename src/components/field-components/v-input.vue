<template>
  <Input
    ref="Input"
    v-model.trim="currentValue"
    :style="calFieldStyle(item)"
    :class="calFieldClass(item)"
    :type="computedType"
    :number="item.number"
    :placeholder="item.placeholder"
    :size="calFieldSize(item)"
    :clearable="calClear(item)"
    :disabled="calFieldDisabled(item)"
    :readonly="calReadonly(item)"
    :maxlength="item.maxlength"
    :icon="item.icon"
    :search="item.search"
    :enter-button="item.enterButton"
    :autofocus="item.autofocus"
    :element-id="item.elementId"
    :autocomplete="item.autocomplete || 'off'"
    :rows="item.rows"
    :border="item.border"
    :show-word-limit="item.showWordLimit"
    :password="item.password"
    @on-enter="
      () => {
        dealEvent(item.onEnter, item)
      }
    "
    @on-click="
      () => {
        dealEvent(item.onClick, item)
      }
    "
    @on-change="
      (val) => {
        dealEvent(item.onChange, val, item)
      }
    "
    @on-focus="
      () => {
        dealEvent(item.onFocus, item)
      }
    "
    @on-blur="
      () => {
        dealBlur(item)
      }
    "
    @on-keyup="
      (val) => {
        dealEvent(item.onKeyup, val, item)
      }
    "
    @on-keydown="
      (val) => {
        dealEvent(item.onKeydown, val, item)
      }
    "
    @on-keypress="
      (val) => {
        dealEvent(item.onKeypress, val, item)
      }
    "
    @on-clear="
      () => {
        dealEvent(item.onClear, item)
      }
    "
    @on-search="
      (val) => {
        dealEvent(item.onSearch, val, item)
      }
    "
  >
    <!-- 前置slot -->
    <template v-slot:prepend v-if="item.prependSlot">
      <slot name="prepend"> </slot>
    </template>
    <!-- 后置slot -->
    <template v-slot:append v-if="item.appendSlot">
      <slot name="append"> </slot>
    </template>
    <!-- 前置图标 -->
    <Icon v-if="item.prefix" :type="item.prefix" slot="prefix" />
    <!-- 后置图标 -->
    <Icon
      v-if="item.suffix"
      :type="item.suffix"
      slot="suffix"
      @click.native="
        () => {
          dealEvent(item.onClick, item)
        }
      "
    />
  </Input>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
import { formatNumber } from '../../utils/number'

const needTransTypeRange = [
  'tel',
  'integer',
  'number',
  'positiveInteger',
  'positiveNumber',
]

export default {
  name: 'VInput',
  mixins: [commonMixins],
  props: {
    value: [String, Number],
    item: Object,
  },
  components: {},
  data() {
    return {
      currentValue: '',
    }
  },
  computed: {
    type() {
      return this.item.type
    },
    computedType() {
      if (needTransTypeRange.includes(this.type) && this.type !== 'tel') {
        return 'text'
      }
      return this.type
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.currentValue = typeOf(v) === 'string' ? v.trim() : v
      },
    },
    currentValue: {
      immediate: true,
      handler(v) {
        if (typeOf(v) === 'undefined') return
        this.$emit('input', v)
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    dealBlur() {
      let currentValue = this.currentValue
      let valueType = typeof currentValue
      let { type, min, max, number, onBlur } = this.item

      let formatValue = currentValue
      if (needTransTypeRange.includes(type)) {
        // 限制最大值 最小值输入
        if (currentValue !== '' && !Number.isNaN(Number(currentValue))) {
          if (typeof min === 'number') {
            formatValue = Math.max(Number(currentValue), min)
          }
          if (typeof max === 'number') {
            formatValue = Math.min(formatValue, max)
          }
          formatValue =
            valueType === 'string'
              ? Number(formatValue).toString()
              : formatValue
        }
        // 限制输入非数字
        if (formatValue && formatValue !== '0') {
          switch (this.type) {
            case 'integer':
              formatValue = formatNumber(formatValue, false, true)
              break
            case 'number':
              formatValue = formatNumber(formatValue, true, true)
              break
            case 'positiveInteger':
            case 'tel':
              formatValue = formatNumber(formatValue, false, false)
              break
            case 'positiveNumber':
              formatValue = formatNumber(formatValue, true, false)
              break
          }
        }
        if (
          valueType === 'string' &&
          (formatValue.endsWith('-') || formatValue.endsWith('.'))
        ) {
          formatValue = ''
        }
        if (currentValue !== formatValue) {
          if (this.$refs['Input']) {
            this.$refs['Input'].currentValue = formatValue
          }
          this.currentValue = formatValue
        }
      }
      if (number) {
        this.dealNumber(this.item)
      } else {
        this.dealEvent(onBlur, this.item)
      }
    },
  },
}
</script>
