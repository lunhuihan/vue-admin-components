<template>
  <div ref="search-box" class="search-box" :class="options.className">
    <!-- prepend插槽 -->
    <slot name="search-prepend" :search="search"></slot>
    <!-- 表单域 -->
    <Form class="search-box-form" inline :label-width="Number(options.labelWidth)"
      :label-position="options.labelPosition ? options.labelPosition : 'right'">
      <FormItem v-for="(item, index) in fields" :key="`field-${index}`" :label="item.label"
        :label-width="item.labelWidth" :class="{'ivu-form-item-slot': isSlot(item.slot)}"
        :style="{width: !isSlot(item.slot) ? 'auto' : calFormItemWidth(item)}">
        <!-- 系统内置组件 -->
        <template v-if="!isSlot(item.slot)">
          <!-- Input -->
          <template v-if="item.component === 'Input'">
            <template v-if="item.number">
              <Input :ref="item.name" v-model.trim="search[item.name]" :style="calFieldStyle(item)"
                :class="calFieldClass(item)" :type="item.type" number :placeholder="item.placeholder"
                :size="item.size" :clearable="typeOf(item.clearable) === 'boolean' ? item.clearable : true"
                :disabled="item.disabled" :readonly="item.readonly" :maxlength="item.maxlength" :icon="item.icon"
                :search="item.search" :enter-button="item.enterButton" :autofocus="item.autofocus"
                :element-id="item.elementId" :autocomplete="item.autocomplete || 'off'"
                @on-enter="() => { dealEvent(item.onEnter, item) }" @on-click="() => { dealEvent(item.onClick, item) }"
                @on-change="(val) => { dealEvent(item.onChange, val, item) }"
                @on-focus="() => { dealEvent(item.onFocus, item) }" @on-blur="dealNumber(item)"
                @on-keyup="(val) => { dealEvent(item.onKeyup, val, item) }"
                @on-keydown="(val) => { dealEvent(item.onKeydown, val, item) }"
                @on-keypress="(val) => { dealEvent(item.onKeypress, val, item) }"
                @on-clear="() => { dealEvent(item.onClear, item) }"
                @on-search="(val) => { dealEvent(item.onSearch, val, item) }">
              <!-- 前置slot -->
              <template v-slot:prepend v-if="(!item.type || item.type === 'text') && item.prependSlot">
                <slot :name="item.prependSlot" :search="search" :field="item">
                </slot>
              </template>
              <!-- 后置slot -->
              <template v-slot:append v-if="(!item.type || item.type === 'text') && item.appendSlot">
                <slot :name="item.appendSlot" :search="search" :field="item">
                </slot>
              </template>
              <!-- 前置图标 -->
              <Icon v-if="item.prefix" :type="item.prefix" slot="prefix" />
              <!-- 后置图标 -->
              <Icon v-if="item.suffix" :type="item.suffix" slot="suffix"
                @click.native="() => { dealEvent(item.onClick, item) }" />
              </Input>
            </template>
            <Input v-else :ref="item.name" v-model.trim="search[item.name]" :style="calFieldStyle(item)"
              :class="calFieldClass(item)" :type="item.type" :number="item.number" :placeholder="item.placeholder"
              :size="item.size" :clearable="typeOf(item.clearable) === 'boolean' ? item.clearable : true"
              :disabled="item.disabled" :readonly="item.readonly" :maxlength="item.maxlength" :icon="item.icon"
              :search="item.search" :enter-button="item.enterButton" :autofocus="item.autofocus"
              :element-id="item.elementId" :autocomplete="item.autocomplete || 'off'"
              @on-enter="() => { dealEvent(item.onEnter, item) }" @on-click="() => { dealEvent(item.onClick, item) }"
              @on-change="(val) => { dealEvent(item.onChange, val, item) }"
              @on-focus="() => { dealEvent(item.onFocus, item) }" @on-blur="() => { dealEvent(item.onBlur, item) }"
              @on-keyup="(val) => { dealEvent(item.onKeyup, val, item) }"
              @on-keydown="(val) => { dealEvent(item.onKeydown, val, item) }"
              @on-keypress="(val) => { dealEvent(item.onKeypress, val, item) }"
              @on-clear="() => { dealEvent(item.onClear, item) }"
              @on-search="(val) => { dealEvent(item.onSearch, val, item) }">
            <!-- 前置slot -->
            <template v-slot:prepend v-if="(!item.type || item.type === 'text') && item.prependSlot">
              <slot :name="item.prependSlot" :search="search" :field="item">
              </slot>
            </template>
            <!-- 后置slot -->
            <template v-slot:append v-if="(!item.type || item.type === 'text') && item.appendSlot">
              <slot :name="item.appendSlot" :search="search" :field="item">
              </slot>
            </template>
            <!-- 前置图标 -->
            <Icon v-if="item.prefix" :type="item.prefix" slot="prefix" />
            <!-- 后置图标 -->
            <Icon v-if="item.suffix" :type="item.suffix" slot="suffix"
              @click.native="() => { dealEvent(item.onClick, item) }" />
            </Input>
          </template>

          <!-- InputNumber -->
          <template v-if="item.component === 'InputNumber'">
            <InputNumber :max="item.max || Infinity" :min="item.min || -Infinity" v-model="search[item.name]"
              :style="calFieldStyle(item)" :class="calFieldClass(item)" :step="item.step || 1" :disabled="item.disabled"
              :placeholder="item.placeholder" :readonly="item.readonly" :editable="item.editable"
              :precision="item.precision" :element-id="item.elementId" :formatter="item.formatter" :parser="item.parser"
              :active-change="typeOf(item.activeChange) === 'boolean' ? item.activeChange : true"
              @on-change="(val) => { dealEvent(item.onChange, val, item)}"
              @on-focus="(event) => { dealEvent(item.onFocus, event, item)}"
              @on-blur="() => { dealEvent(item.onBlur, item)}">
            </InputNumber>
          </template>

          <!-- Select -->
          <template v-if="item.component === 'Select'">
            <Select v-if="!item.remote" :ref="item.name" v-model="search[item.name]" :style="calFieldStyle(item)"
              :class="calFieldClass(item)" :multiple="item.multiple" :size="item.size" :disabled="item.disabled"
              :number="item.number"
              :clearable="(typeOf(item.clearable) !== 'boolean' && !item.multiple) ? true : item.clearable"
              :filterable="item.filterable" :placeholder="item.placeholder"
              :not-found-text="item.notFoundText || '无匹配数据'" :label-in-value="item.labelInValue"
              :placement="item.placement" :transfer="item.transfer" :element-id="item.elementId"
              :transfer-class-name="item.transferClassName" :prefix="item.prefix"
              :max-tag-count="Number(item.maxTagCount) || 100"
              :max-tag-placeholder="item.maxTagPlaceholder || (() => {})"
              @on-change="(val) => { dealEvent(item.onChange, val, item)}"
              @on-query-change="(val) => { selectQueryChange(item.onQueryChange, val, item)}"
              @on-clear="() => { dealEvent(item.onClear, item)}"
              @on-open-change="(val) => { dealEvent(item.onOpenChange, val, item)}">
              <template v-if="typeOf(item.data) === 'array' && item.data.length">
                <Option v-for="(optionItem, optionIndex) in item.data" :value="optionItem.value"
                  :label="optionItem.label" :key="optionIndex" :disabled="optionItem.disabled">
                  <template v-slot:default v-if="item.optionSlot">
                    <slot :name="item.optionSlot" :search="search" :field="item" :label="optionItem.label"
                      :value="optionItem.value"></slot>
                  </template>
                </Option>
              </template>
            </Select>
            <Select v-else :ref="item.name" v-model="search[item.name]" :style="calFieldStyle(item)"
              :class="calFieldClass(item)" :multiple="item.multiple" :size="item.size" :disabled="item.disabled"
              :clearable="(typeOf(item.clearable) !== 'boolean' && !item.multiple) ? true : item.clearable" filterable
              :remote="item.remote" :remote-method="() => {}" :loading="item.loading"
              :loading-text="item.loadingText || '搜索中'" :placeholder="item.placeholder"
              :not-found-text="item.notFoundText || '无匹配数据'" :label-in-value="item.labelInValue"
              :placement="item.placement" :transfer="item.transfer" :element-id="item.elementId"
              :transfer-class-name="item.transferClassName" :prefix="item.prefix"
              :max-tag-count="Number(item.maxTagCount) || 100"
              :max-tag-placeholder="item.maxTagPlaceholder || (() => {})"
              @on-change="(val) => { dealEvent(item.onChange, val, item)}"
              @on-query-change="(val) => { selectQueryChange(item.onQueryChange, val, item)}"
              @on-clear="() => { dealEvent(item.onClear, item)}"
              @on-open-change="(val) => { dealEvent(item.onOpenChange, val, item)}">
              <template v-if="typeOf(item.data) === 'array' && item.data.length">
                <Option v-for="(optionItem, optionIndex) in item.data" :value="optionItem.value"
                  :label="optionItem.label" :key="optionIndex" :disabled="optionItem.disabled">
                  <template v-slot:default v-if="item.optionSlot">
                    <slot :name="item.optionSlot" :search="search" :field="item" :label="optionItem.label"
                      :value="optionItem.value"></slot>
                  </template>
                </Option>
              </template>
            </Select>
          </template>

          <!-- DatePicker -->
          <DatePicker v-if="item.component === 'DatePicker'" :ref="item.name" v-model="search[item.name]"
            :style="calFieldStyle(item)" :class="calFieldClass(item)" :type="item.type" :placeholder="item.placeholder"
            :size="item.size" :disabled="item.disabled"
            :clearable="typeOf(item.clearable) === 'boolean' ? item.clearable : true" :readonly="item.readonly"
            :editable="item.editable" :transfer="item.transfer" :element-id="item.elementId" :format="item.format"
            :placement="item.placement" :options="calDatePickerOptions(item.options)" :split-panels="item.splitPanels"
            :multiple="item.multiple" :show-week-numbers="item.showWeekNumbers"
            :start-date="calDatePickerDate(item.startDate)" :confirm="item.confirm" :open="item.open"
            :time-picker-options="item.timePickerOptions" :separator="item.separator"
            @on-change="(formatDate, date) => { dealEvent(item.onChange, formatDate, date, item) }"
            @on-open-change="(val) => { dealEvent(item.onOpenChange, val, item) }"
            @on-ok="() => { dealEvent(item.onOk, item) }" @on-clear="() => { dealEvent(item.onClear, item) }"
            @on-clickoutside="(event) => { dealEvent(item.onClickoutside, event, item) }">
            <template v-slot:default v-if="item.slot">
              <slot :name="item.slot" :search="search" :field="item">
              </slot>
            </template>
          </DatePicker>

          <!-- RadioGroup -->
          <RadioGroup v-if="item.component === 'RadioGroup'" :ref="item.name" v-model="search[item.name]"
            :type="item.type" :style="calFieldStyle(item)" :class="calFieldClass(item)"
            :size="item.size || (item.type === 'button' ? 'default' : 'large')"
            @on-change="(val) => { dealEvent(item.onChange, val, item) }">
            <Radio :label="radioItem.value" v-for="(radioItem, index) in item.data" :key="`radio-${item.name}-${index}`"
              :disabled="radioItem.disabled">
              <Icon :type="radioItem.icon" v-if="radioItem.icon"></Icon>
              <span>{{radioItem.label}}</span>
            </Radio>
          </RadioGroup>

          <!-- Checkbox -->
          <Checkbox v-if="item.component === 'Checkbox'" :ref="item.name" v-model="search[item.name]"
            :style="calFieldStyle(item)" :class="calFieldClass(item)" :disabled="item.disabled" :size="item.size"
            :true-value="item.trueValue" :false-value="item.falseValue"
            @on-change="(val) => { dealEvent(item.onChange, val, item) }"></Checkbox>

          <!-- CheckboxGroup -->
          <CheckboxGroup v-if="item.component === 'CheckboxGroup'" :ref="item.name" v-model="search[item.name]"
            :type="item.type" :style="calFieldStyle(item)" :class="calFieldClass(item)"
            @on-change="(val) => { dealEvent(item.onChange, val, item) }">
            <Checkbox :label="checkboxItem.value" v-for="(checkboxItem, index) in item.data"
              :key="`checkbox-${item.name}-${index}`" :disabled="checkboxItem.disabled"
              :size="checkboxItem.size || 'large'">
              <Icon :type="checkboxItem.icon" v-if="checkboxItem.icon"></Icon>
              <span>{{checkboxItem.label}}</span>
            </Checkbox>
          </CheckboxGroup>

          <!-- Switch -->
          <i-switch v-if="item.component === 'Switch'" :ref="item.name" v-model="search[item.name]" :size="item.size"
            :disabled="item.disabled" :true-value="item.trueValue" :false-value="item.falseValue"
            :loading="item.loading" @on-change="(val) => { dealEvent(item.onChange, val, item) }">
            <span slot="open" v-html="item.openText"></span>
            <span slot="close" v-html="item.closeText"></span>
          </i-switch>

          <!-- Cascader -->
          <template v-if="item.component === 'Cascader'">
            <Cascader v-if="!item.renderFormat" :ref="item.name" v-model="search[item.name]" :data="item.data"
              :style="calFieldStyle(item)" :class="calFieldClass(item)" :placeholder="item.placeholder"
              :size="item.size" :disabled="item.disabled" :change-on-select="item.changeOnSelect"
              :clearable="typeOf(item.clearable) === 'boolean' ? item.clearable : true" :trigger="item.trigger"
              :filterable="item.filterable"
              :load-data="(childItem, callback) => { dealEvent(item.loadData, childItem, callback, item) }"
              :not-found-text="item.notFoundText" :transfer="item.transfer" :element-id="item.elementId"
              @on-change="(val, selectedData) => { dealEvent(item.onChange, val, selectedData, item) }"
              @on-visible-change="(val) => { dealEvent(item.onVisibleChange, val, item) }">
            </Cascader>
            <Cascader v-else :ref="item.name" v-model="search[item.name]" :data="item.data" :style="calFieldStyle(item)"
              :class="calFieldClass(item)" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled"
              :change-on-select="item.changeOnSelect"
              :render-format="(labels, selectedData) => { return cascaderRenderFormat(labels, selectedData, item)}"
              :clearable="typeOf(item.clearable) === 'boolean' ? item.clearable : true" :trigger="item.trigger"
              :filterable="item.filterable"
              :load-data="(childItem, callback) => { dealEvent(item.loadData, childItem, callback, item) }"
              :not-found-text="item.notFoundText" :transfer="item.transfer" :element-id="item.elementId"
              @on-change="(val, selectedData) => { dealEvent(item.onChange, val, selectedData, item) }"
              @on-visible-change="(val) => { dealEvent(item.onVisibleChange, val, item) }">
            </Cascader>
          </template>
        </template>
        <!-- 自定义组件 -->
        <template v-else>
          <slot :name="item.slot" :search="search"></slot>
        </template>
      </FormItem>
      <template v-if="!options.fold">
        <!-- 默认使用有【搜索】和【重置】按钮 -->
        <!-- 操作按钮不换行 -->
        <template v-if="!options.actionLineFeed">
          <slot name="action-prepend" :search="search"></slot>
          <FormItem v-if="!options.hiddenSearchBtn" :label-width="0">
            <Button type="primary" :icon="options.hiddenActionIcon ? '' : 'md-search'" :loading="searchBtnLoading"
              @click="onSearch">搜索</Button>
          </FormItem>
          <FormItem v-if="!options.hiddenResetBtn" :label-width="0">
            <Button type="primary" ghost :icon="options.hiddenActionIcon ? '' : 'md-refresh'" :loading="resetBtnLoading"
              @click="onReset">重置</Button>
          </FormItem>
          <slot name="action-append" :search="search"></slot>
        </template>
      </template>
      <div class="action-wrap" v-else>
        <slot name="action-prepend" :search="search"></slot>
        <Button v-if="!options.hiddenSearchBtn" type="primary" :icon="options.hiddenActionIcon ? '' : 'md-search'"
          :loading="searchBtnLoading" @click="onSearch">搜索</Button>
        <Button v-if="!options.hiddenResetBtn" type="primary" ghost :icon="options.hiddenActionIcon ? '' : 'md-refresh'"
          :loading="resetBtnLoading" @click="onReset">重置</Button>
        <slot name="action-append" :search="search"></slot>
        <template
          v-if="!options.hiddenSearchBtn || !options.hiddenResetBtn || $scopedSlots['action-prepend'] || $scopedSlots['action-append']">
          <span class="fold-bar" v-if="isFold" @click="toggleFold(false)">
            展开
            <Icon type="ios-arrow-down" size="16" /></span>
          <span class="fold-bar" v-else @click="toggleFold(true)">
            收起
            <Icon type="ios-arrow-up" size="16" /></span>
        </template>
      </div>
    </Form>
    <div class="action-line-feed-wrap"
      v-if="!options.fold && options.actionLineFeed && (!options.hiddenSearchBtn || !options.hiddenResetBtn || $scopedSlots['action-prepend'] || $scopedSlots['action-append'])">
      <slot name="action-prepend" :search="search"></slot>
      <Button v-if="!options.hiddenSearchBtn" type="primary" :icon="options.hiddenActionIcon ? '' : 'md-search'"
        :loading="searchBtnLoading" @click="onSearch">搜索</Button>
      <Button v-if="!options.hiddenResetBtn" type="primary" ghost :icon="options.hiddenActionIcon ? '' : 'md-refresh'"
        :loading="resetBtnLoading" @click="onReset">重置</Button>
      <slot name="action-append" :search="search"></slot>
    </div>
    <!-- append插槽 -->
    <slot name="search-append" :search="search"></slot>
  </div>
</template>

<script>
import { typeOf, deepCopy } from '../../utils/assist'
import findVm from '../../mixins/find-vm'
import Time from '../../utils/time'
import timeout from '../../utils/timeout'
import eventBus from '../../utils/event'
const time = new Time()

const componentTypeRange = ['Input', 'InputNumber', 'Select', 'DatePicker', 'RadioGroup', 'Checkbox', 'CheckboxGroup', 'Switch', 'Cascader']
const labelPositionRange = ['left', 'right']

export default {
  name: 'SearchBox',
  props: {
    fields: {
      type: Array,
      validator (val) {
        let nameList = []
        val.forEach(({ component = '', name = '', labelPosition = 'right', data = [], value, type, slot = '' }) => {
          if (typeOf(slot) === 'string' && slot.trim()) return true

          if (!componentTypeRange.includes(component)) {
            throw new RangeError(`搜索项的component属性不支持${componentTypeRange.join('、')}以外的值！`)
          }
          if (!name || nameList.includes(name)) {
            throw new Error('请为每一个搜索项设置唯一的name属性！')
          }
          if (!labelPositionRange.includes(labelPosition)) {
            throw new RangeError(`搜索项的labelPosition属性不支持${labelPositionRange.join('、')}以外的值！`)
          }
          if (component === 'Select') {
            if (typeOf(data) !== 'array') throw new TypeError('Select组件的数据源data需设置为Array类型！')
            data.forEach(({ label, value }) => {
              if (typeOf(label) !== 'string' || (typeOf(value) !== 'string' && typeOf(value) !== 'number')) {
                throw new TypeError('Select组件的数据源data的每一项需设置label和value属性！')
              }
            })
          }
          if (component === 'DatePicker') {
            const rangeTypes = ['daterange', 'datetimerange']
            if (rangeTypes.includes(type) && typeOf(value) !== 'undefined' && typeOf(value) !== 'array') {
              throw new TypeError('DatePicker组件的type类型必须与value类型一致！')
            }
          }

          if (component === 'RadioGroup') {
            if (typeOf(data) !== 'array') throw new TypeError('RadioGroup组件的数据源data需设置为Array类型！')
            data.forEach(({ label, value }) => {
              if (typeOf(label) !== 'string' || (typeOf(value) !== 'string' && typeOf(value) !== 'number')) {
                throw new TypeError('RadioGroup组件的数据源data的每一项需设置label和value属性！')
              }
            })
          }

          if (component === 'CheckboxGroup') {
            if (typeOf(data) !== 'array') throw new TypeError('CheckboxGroup组件的数据源data需设置为Array类型！')
            data.forEach(({ label, value }) => {
              if (typeOf(label) !== 'string' || (typeOf(value) !== 'string' && typeOf(value) !== 'number')) {
                throw new TypeError('CheckboxGroup组件的数据源data的每一项需设置label和value属性！')
              }
            })
          }
          nameList.push(name)
        })
        return true
      },
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      },
      validator ({ labelPosition }) {
        if (labelPosition && !labelPositionRange.includes(labelPosition)) {
          throw new RangeError(`search-config的labelPosition属性不支持${labelPositionRange.join('、')}以外的值！`)
        }
        return true
      }
    }
  },
  mixins: [findVm],
  data () {
    return {
      search: {},
      originSearch: {},
      typeOf,
      timerBox: {
      },
      showFieldNum: 0,
      searchBtnLoading: false,
      resetBtnLoading: false,
      isFold: false,
      _dealFieldFold: null
    }
  },
  watch: {
    fields: {
      immediate: true,
      handler () {
        this.setSearchProperty()
      }
    },
    'options.fold': {
      immediate: true,
      handler (val) {
        this.isFold = !!val
      }
    }
  },
  created () {
    this._dealFieldFold = timeout(this.dealFieldFold)
    eventBus.$on('view-change', this._dealFieldFold)
  },
  mounted () {
    if (!!this.options.fold) {
      setTimeout(() => {
        this.dealFieldFold()
        window.addEventListener('resize', this._dealFieldFold)
      }, 100)
    }
  },
  methods: {
    setSearchProperty () {
      this.search = this.initSearchVal()
      this.originSearch = deepCopy(this.search)
    },
    initSearchVal () {
      let result = {}
      this.fields.forEach(({ value, name, component, falseValue = false, multiple = false, remote, remoteMethod, slot }) => {
        if (!slot) {
          if (typeOf(value) === 'undefined') {
            switch (component) {
              case 'CheckboxGroup':
              case 'Cascader':
                result[name] = []
                break
              case 'Switch':
              case 'Checkbox':
                result[name] = falseValue
                break
              case 'Select':
                if (multiple) {
                  result[name] = []
                } else {
                  result[name] = ''
                }
                break
              case 'InputNumber':
                result[name] = 1
                break
              default:
                result[name] = ''
            }
          } else {
            result[name] = value
          }
        }

        if (component === 'Select' && remote && remoteMethod) { // 远程搜索
          this.timerBox[name] = null
        }
      })
      return result
    },
    calFieldClass ({ component = '', search = false, enterButton = false, clearable = true, className = '' }) {
      let result = []
      if (component === 'Input') {
        if (clearable && search && enterButton) {
          result.push('input-search-clear')
        }
      }
      className && result.push(className)
      return result
    },
    calFieldStyle ({ width }) {
      return {
        width: `${width ? Number(width) : Number(this.options.fieldWidth)}px`
      }
    },
    calDatePickerOptions (options = {}) { // 处理datepicker的options
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
    calDatePickerDate (startDate) { // 处理datepicker的startDate，兼容string|number的日期
      if (typeOf(startDate) === 'string' || typeOf(startDate) === 'number') {
        return time.parse(startDate)
      }
      return startDate
    },
    dealNumber (item) {
      let seatchNumber = parseFloat(this.search[item.name])
      if (isNaN(seatchNumber)) {
        seatchNumber = ''
      }
      this.search[item.name] = seatchNumber
      if (item.onBlur) {
        this.dealEvent(item.onBlur, item)
      }
    },
    dealEvent (fnName, ...rest) {
      if (!fnName) return
      this.$emit('on-event', fnName, ...rest)
    },
    cascaderRenderFormat (labels, selectedData, item) {
      let target = this.findVm()
      let params = [labels, selectedData, item, this.search]
      let renderFormat = item.renderFormat
      if (typeOf(renderFormat) === 'function') {
        return renderFormat.bind(target)(...params)
      }
      if (typeOf(renderFormat) === 'string') {
        let fn = target[renderFormat]
        if (typeOf(fn) === 'function') {
          return target[renderFormat](...params)
        }
      }
    },
    selectQueryChange (fnName, query, field) {
      let { multiple, name, remote, remoteMethod } = field

      if (!query && !multiple) {
        this.search[name] = ''
      }
      if (remote && remoteMethod) {
        field.loading = true
        if (this.timerBox[name]) {
          window.clearTimeout(this.timerBox[name])
        }
        this.timerBox[name] = setTimeout(() => {
          this.$emit('on-event', remoteMethod, query, field)
        }, 300)
      }
      this.$emit('on-event', fnName, query, field)
    },
    toggleFold () {
      this.isFold = !this.isFold
      this.dealFieldFold()
    },
    dealFieldFold () { // 处理搜索栏的展开/收起
      let searchBox = this.$refs['search-box']
      if (!searchBox) return
      let form = searchBox.querySelector('.search-box-form')
      let formItems = form.querySelectorAll('.ivu-form-item')
      let actionWrap = form.querySelector('.action-wrap')
      if (!actionWrap) return
      let actionWidth = 0
      let children = actionWrap.children
      for (let i = 0, len = children.length; i < len; i++) {
        actionWidth += children[i].offsetWidth + 10
      }
      let allWidth = form.clientWidth - actionWidth + 10
      let sum = 0
      formItems.forEach((item) => {
        sum += item.offsetWidth + 10
        if (sum >= allWidth && this.isFold) {
          item.style.display = 'none'
        } else {
          item.style.display = 'inline-flex'
        }
      })
      if (this.isFold && form.clientHeight > 100) {
        this.dealFieldFold()
      }
    },
    isSlot (slot) {
      return typeof slot === 'string' && !!slot.trim()
    },
    calFormItemWidth ({ width, labelWidth, slot }) {
      let fieldWidth = width ? Number(width) : Number(this.options.fieldWidth)
      labelWidth = labelWidth ? Number(labelWidth) : Number(this.options.labelWidth)
      return this.isSlot(slot) ? `${(labelWidth + fieldWidth)}px` : 'auto'
    },
    onSearch () {
      this.searchBtnLoading = true
      this.$emit('on-search', this.search, () => {
        this.searchBtnLoading = false
      })
    },
    onReset () {
      this.resetBtnLoading = true
      this.search = deepCopy(this.originSearch)
      this.$emit('on-reset', this.search)
      this.$emit('on-search', this.search, () => {
        this.resetBtnLoading = false
      })
    }
  }
}
</script>