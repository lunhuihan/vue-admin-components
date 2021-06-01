<template>
  <Form :ref="`form-${refId}`" class="v-component v-form" :class="calFormClass"
    :model="formValue" :rules="formRule" :inline="currentOptions.inline"
    :style="_calWidth(currentOptions.width)"
    :label-width="parseFloat(currentOptions.labelWidth)"
    :label-colon="currentOptions.labelColon"
    :hide-required-mark="currentOptions.hideRequiredMark"
    :show-message="currentOptions.showMessage"
    :disabled="currentOptions.disabled" @on-validate="onValidate">
    <template v-if="!currentOptions.inline">
      <Row v-for="(row, index) in gridFields" :key="`row-${index}`"
        :gutter="currentOptions.colSpace">
        <Col v-for="(item, colIndex) in row" :key="`col-${colIndex}`"
          :flex="(item.colSpan || 1)/currentOptions.columns"
          :style="_calColStyle(item)">
        <FormItem :prop="item.name" :label="item.label"
          :label-width="parseFloat(item.labelWidth) || parseFloat(currentOptions.labelWidth)"
          :class="`label-${currentOptions.labelPosition}`">
          <!-- 系统内置组件 -->
          <template v-if="!_isSlot(item.slot)">
            <!-- Html -->
            <v-html v-if="item.component === 'Html'" :item="item"
              :field-width="options.fieldWidth"></v-html>
            <!-- Input -->
            <template v-if="item.component === 'Input'">
              <v-number-input :ref="item.name" v-if="item.number"
                :form-value="formValue" :item="item"
                :field-width="options.fieldWidth" @deal-event="_dealEvent"
                @deal-number="_dealNumber">
                <!-- 前置slot -->
                <template v-slot:prepend
                  v-if="(!item.type || item.type === 'text') && item.prependSlot">
                  <slot :name="item.prependSlot" :formValue="returnFormValue"
                    :field="item">
                  </slot>
                </template>
                <!-- 后置slot -->
                <template v-slot:append
                  v-if="(!item.type || item.type === 'text') && item.appendSlot">
                  <slot :name="item.appendSlot" :formValue="returnFormValue"
                    :field="item">
                  </slot>
                </template>
              </v-number-input>
              <v-input v-else :ref="item.name" :form-value="formValue"
                :item="item" :field-width="options.fieldWidth"
                @deal-event="_dealEvent" @deal-number="_dealNumber">
                <!-- 前置slot -->
                <template v-slot:prepend
                  v-if="(!item.type || item.type === 'text') && item.prependSlot">
                  <slot :name="item.prependSlot" :formValue="returnFormValue"
                    :field="item">
                  </slot>
                </template>
                <!-- 后置slot -->
                <template v-slot:append
                  v-if="(!item.type || item.type === 'text') && item.appendSlot">
                  <slot :name="item.appendSlot" :formValue="returnFormValue"
                    :field="item">
                  </slot>
                </template>
              </v-input>
            </template>

            <!-- InputNumber -->
            <v-input-number :ref="item.name"
              v-if="item.component === 'InputNumber'" :form-value="formValue"
              :item="item" :field-width="options.fieldWidth"
              @deal-event="_dealEvent"></v-input-number>

            <!-- Select -->
            <v-select :ref="item.name" v-if="item.component === 'Select'"
              :form-value="formValue" :item="item"
              :data-source="dataSource[item.name]"
              :field-width="options.fieldWidth" @deal-event="_dealEvent"
              @select-query-change="_selectQueryChange">
              <template v-slot:options
                v-if="typeOf(dataSource[item.name]) === 'array' && dataSource[item.name].length">
                <Option
                  v-for="(optionItem, optionIndex) in dataSource[item.name]"
                  :value="optionItem.value" :label="optionItem.label"
                  :key="optionIndex" :disabled="optionItem.disabled">
                  <template v-slot:default v-if="item.optionSlot">
                    <slot :name="item.optionSlot" :formValue="returnFormValue"
                      :field="item" :label="optionItem.label"
                      :value="optionItem.value">
                    </slot>
                  </template>
                </Option>
              </template>
            </v-select>

            <!-- DatePicker -->
            <v-date-picker :ref="item.name"
              v-if="item.component === 'DatePicker'" :form-value="formValue"
              :item="item" :data-source="dataSource[item.name]"
              :field-width="options.fieldWidth" @deal-event="_dealEvent">
            </v-date-picker>

            <!-- RadioGroup -->
            <v-radio-group :ref="item.name"
              v-if="item.component === 'RadioGroup'" :form-value="formValue"
              :item="item" :data-source="dataSource[item.name]"
              :field-width="options.fieldWidth" @deal-event="_dealEvent">
              <template v-slot:default="slotProps" v-if="item.radioSlot">
                <slot :name="item.radioSlot" :formValue="returnFormValue"
                  :field="item" :label="slotProps.label"
                  :value="slotProps.value">
                </slot>
              </template>
            </v-radio-group>

            <!-- Checkbox -->
            <v-checkbox :ref="item.name" v-if="item.component === 'Checkbox'"
              :form-value="formValue" :item="item"
              :field-width="options.fieldWidth" @deal-event="_dealEvent">
            </v-checkbox>

            <!-- CheckboxGroup -->
            <v-checkbox-group :ref="item.name"
              v-if="item.component === 'CheckboxGroup'" :form-value="formValue"
              :item="item" :data-source="dataSource[item.name]"
              :field-width="options.fieldWidth" @deal-event="_dealEvent">
            </v-checkbox-group>

            <!-- Switch -->
            <v-switch :ref="item.name" v-if="item.component === 'Switch'"
              :form-value="formValue" :item="item"
              :data-source="dataSource[item.name]"
              :field-width="options.fieldWidth" @deal-event="_dealEvent">
            </v-switch>

            <!-- AutoComplete -->
            <v-auto-complete :ref="item.name"
              v-if="item.component === 'AutoComplete'" :form-value="formValue"
              :item="item" :data-source="dataSource[item.name]"
              :field-width="options.fieldWidth" @deal-event="_dealEvent">
              <template v-slot:default v-if="item.dropdownSlot">
                <slot :name="item.dropdownSlot" :formValue="returnFormValue"
                  :field="item">
                </slot>
              </template>
              <template v-slot:default v-else-if="!item.filterMethod">
                <Option v-for="(item, index) in dataSource[item.name]"
                  :value="item" :key="`autocomplete-${index}`">{{ item }}
                </Option>
              </template>
            </v-auto-complete>

            <!-- Cascader -->
            <v-cascader :ref="item.name" v-if="item.component === 'Cascader'"
              :form-value="formValue" :item="item"
              :data-source="dataSource[item.name]"
              :field-width="options.fieldWidth" @deal-event="_dealEvent">
              <template v-slot:default v-if="item.selectSlot">
                <slot :name="item.selectSlot" :formValue="returnFormValue"
                  :field="item">
                </slot>
              </template>
            </v-cascader>
          </template>
          <!-- 自定义组件 -->
          <template v-else>
            <slot :name="item.slot" :formValue="returnFormValue"></slot>
          </template>
        </FormItem>
        </Col>
      </Row>
    </template>
    <template v-else>
      <FormItem v-for="(item, index) in fields" :key="index" :prop="item.name" :label="item.label"
        :label-width="parseFloat(item.labelWidth) || parseFloat(currentOptions.labelWidth)"
        :class="`label-${currentOptions.labelPosition}`">
        <!-- 系统内置组件 -->
        <template v-if="!_isSlot(item.slot)">
          <!-- Html -->
          <v-html v-if="item.component === 'Html'" :item="item"
            :field-width="options.fieldWidth"></v-html>
          <!-- Input -->
          <template v-if="item.component === 'Input'">
            <v-number-input :ref="item.name" v-if="item.number"
              :form-value="formValue" :item="item"
              :field-width="options.fieldWidth" @deal-event="_dealEvent"
              @deal-number="_dealNumber">
              <!-- 前置slot -->
              <template v-slot:prepend
                v-if="(!item.type || item.type === 'text') && item.prependSlot">
                <slot :name="item.prependSlot" :formValue="returnFormValue"
                  :field="item">
                </slot>
              </template>
              <!-- 后置slot -->
              <template v-slot:append
                v-if="(!item.type || item.type === 'text') && item.appendSlot">
                <slot :name="item.appendSlot" :formValue="returnFormValue"
                  :field="item">
                </slot>
              </template>
            </v-number-input>
            <v-input v-else :ref="item.name" :form-value="formValue"
              :item="item" :field-width="options.fieldWidth"
              @deal-event="_dealEvent" @deal-number="_dealNumber">
              <!-- 前置slot -->
              <template v-slot:prepend
                v-if="(!item.type || item.type === 'text') && item.prependSlot">
                <slot :name="item.prependSlot" :formValue="returnFormValue"
                  :field="item">
                </slot>
              </template>
              <!-- 后置slot -->
              <template v-slot:append
                v-if="(!item.type || item.type === 'text') && item.appendSlot">
                <slot :name="item.appendSlot" :formValue="returnFormValue"
                  :field="item">
                </slot>
              </template>
            </v-input>
          </template>

          <!-- InputNumber -->
          <v-input-number :ref="item.name"
            v-if="item.component === 'InputNumber'" :form-value="formValue"
            :item="item" :field-width="options.fieldWidth"
            @deal-event="_dealEvent"></v-input-number>

          <!-- Select -->
          <v-select :ref="item.name" v-if="item.component === 'Select'"
            :form-value="formValue" :item="item"
            :data-source="dataSource[item.name]"
            :field-width="options.fieldWidth" @deal-event="_dealEvent"
            @select-query-change="_selectQueryChange">
            <template v-slot:options
              v-if="typeOf(dataSource[item.name]) === 'array' && dataSource[item.name].length">
              <Option v-for="(optionItem, optionIndex) in dataSource[item.name]"
                :value="optionItem.value" :label="optionItem.label"
                :key="optionIndex" :disabled="optionItem.disabled">
                <template v-slot:default v-if="item.optionSlot">
                  <slot :name="item.optionSlot" :formValue="returnFormValue"
                    :field="item" :label="optionItem.label"
                    :value="optionItem.value">
                  </slot>
                </template>
              </Option>
            </template>
          </v-select>

          <!-- DatePicker -->
          <v-date-picker :ref="item.name" v-if="item.component === 'DatePicker'"
            :form-value="formValue" :item="item"
            :data-source="dataSource[item.name]"
            :field-width="options.fieldWidth" @deal-event="_dealEvent">
          </v-date-picker>

          <!-- RadioGroup -->
          <v-radio-group :ref="item.name" v-if="item.component === 'RadioGroup'"
            :form-value="formValue" :item="item"
            :data-source="dataSource[item.name]"
            :field-width="options.fieldWidth" @deal-event="_dealEvent">
            <template v-slot:default="slotProps" v-if="item.radioSlot">
              <slot :name="item.radioSlot" :formValue="returnFormValue"
                :field="item" :label="slotProps.label" :value="slotProps.value">
              </slot>
            </template>
          </v-radio-group>

          <!-- Checkbox -->
          <v-checkbox :ref="item.name" v-if="item.component === 'Checkbox'"
            :form-value="formValue" :item="item"
            :field-width="options.fieldWidth" @deal-event="_dealEvent">
          </v-checkbox>

          <!-- CheckboxGroup -->
          <v-checkbox-group :ref="item.name"
            v-if="item.component === 'CheckboxGroup'" :form-value="formValue"
            :item="item" :data-source="dataSource[item.name]"
            :field-width="options.fieldWidth" @deal-event="_dealEvent">
          </v-checkbox-group>

          <!-- Switch -->
          <v-switch :ref="item.name" v-if="item.component === 'Switch'"
            :form-value="formValue" :item="item"
            :data-source="dataSource[item.name]"
            :field-width="options.fieldWidth" @deal-event="_dealEvent">
          </v-switch>

          <!-- AutoComplete -->
          <v-auto-complete :ref="item.name"
            v-if="item.component === 'AutoComplete'" :form-value="formValue"
            :item="item" :data-source="dataSource[item.name]"
            :field-width="options.fieldWidth" @deal-event="_dealEvent">
            <template v-slot:default v-if="item.dropdownSlot">
              <slot :name="item.dropdownSlot" :formValue="returnFormValue"
                :field="item">
              </slot>
            </template>
            <template v-slot:default v-else-if="!item.filterMethod">
              <Option v-for="(item, index) in dataSource[item.name]"
                :value="item" :key="`autocomplete-${index}`">{{ item }}
              </Option>
            </template>
          </v-auto-complete>

          <!-- Cascader -->
          <v-cascader :ref="item.name" v-if="item.component === 'Cascader'"
            :form-value="formValue" :item="item"
            :data-source="dataSource[item.name]"
            :field-width="options.fieldWidth" @deal-event="_dealEvent">
            <template v-slot:default v-if="item.selectSlot">
              <slot :name="item.selectSlot" :formValue="returnFormValue"
                :field="item">
              </slot>
            </template>
          </v-cascader>
        </template>
        <!-- 自定义组件 -->
        <template v-else>
          <slot :name="item.slot" :formValue="returnFormValue"></slot>
        </template>
      </FormItem>
    </template>
    <div class="v-form-actions" :class="[`align-${currentOptions.actionAlign}`, { 'inline': currentOptions.inline}]"
      :style="{paddingLeft: `${actionPL}px`}"
      v-if="(submitBtnOpts || resetBtnOpts) && !currentOptions.readonly">
      <Button v-if="submitBtnOpts" :class="submitBtnOpts.className"
        :style="_calWidth(submitBtnOpts.width, 'btn')"
        :size="submitBtnOpts.size || currentOptions.size"
        :type="submitBtnOpts.type" :ghost="submitBtnOpts.ghost"
        :html-type="submitBtnOpts.htmlType"
        :loading="submitBtnOpts.loading || submitBtnLoading"
        :icon="submitBtnOpts.icon" :disabled="submitBtnOpts.disabled"
        @click="onSubmit">{{submitBtnOpts.text}}</Button>
      <Button v-if="resetBtnOpts" :class="resetBtnOpts.className"
        :style="_calWidth(resetBtnOpts.width, 'btn')" :type="resetBtnOpts.type"
        :size="resetBtnOpts.size || currentOptions.size"
        :html-type="resetBtnOpts.htmlType" :ghost="resetBtnOpts.ghost"
        :loading="resetBtnOpts.loading || resetBtnLoading"
        :icon="resetBtnOpts.icon" :disabled="resetBtnOpts.disabled"
        @click="onReset">{{resetBtnOpts.text}}</Button>
    </div>
  </Form>
</template>

<script>
4088
import { typeOf, deepCopy, adaptNumberUnit } from '../../utils/assist'
import { DateValueType } from '../../utils/constant'
import collect from '../../utils/collect'
import grid from './grid'
import VNumberInput from '../field-components/v-number-input'
import VInput from '../field-components/v-input'
import VInputNumber from '../field-components/v-input-number'
import VSelect from '../field-components/v-select'
import VDatePicker from '../field-components/v-date-picker'
import VRadioGroup from '../field-components/v-radio-group'
import VCheckbox from '../field-components/v-checkbox'
import VCheckboxGroup from '../field-components/v-checkbox-group'
import VSwitch from '../field-components/v-switch'
import VAutoComplete from '../field-components/v-auto-complete'
import VHtml from '../field-components/v-html'
import VCascader from '../field-components/v-cascader'
import Time from '../../utils/time'
import getReturnFormValue from '../../mixins/getReturnFormValue'
import findVm from '../../mixins/find-vm'
import cancelFocus from '../../mixins/cancel-focus'

const time = new Time()

const merge = require('deepmerge')

const componentTypeRange = [
  'Input',
  'InputNumber',
  'Select',
  'AutoComplete',
  'DatePicker',
  'TimePicker',
  'RadioGroup',
  'Checkbox',
  'CheckboxGroup',
  'Switch',
  'Cascader',
  'Upload',
  'Button',
]

const actionDefaultOptions = {
  ghost: false,
  customIcon: false,
  width: 'auto',
  htmlType: 'button',
  long: false,
  loading: false,
  disabled: false,
  icon: 'ios-upload',
}

const actionAlignRange = ['left', 'center', 'right']

const defaultOptions = {
  inline: false,
  columns: 1,
  colSpace: 0,
  labelPosition: 'right',
  size: 'default',
  actionAlign: 'left',
  readonly: false,
  submitBtn: {
    ...actionDefaultOptions,
    type: 'primary',
    text: '提交',
  },
  resetBtn: {
    ...actionDefaultOptions,
    type: 'default',
    text: '取消',
  },
}

export default {
  name: 'VForm',
  mixins: [getReturnFormValue, findVm, cancelFocus],
  props: {
    options: {
      // 表单整体配置
      type: Object,
      default() {
        return {}
      },
      validator({
        inline,
        columns = 1,
        colSpace = 0,
        actionAlign = 'left',
        submitBtn = {},
        resetBtn = {},
      } = {}) {
        if (inline && columns > 1) {
          throw new Error('options中inline与columns不可同时设置！')
        }
        if (typeof columns !== 'number') {
          throw new TypeError('options中columns的类型需为Number类型！')
        }
        if (typeof colSpace !== 'number') {
          throw new TypeError('options中colSpace的类型需为Number类型！')
        }
        if (!actionAlignRange.includes(actionAlign)) {
          throw new RangeError(
            `options中actionAlign属性不支持${actionAlignRange.join(
              '、'
            )}以外的值！`
          )
        }
        if (
          typeOf(submitBtn) !== 'undefined' &&
          typeOf(submitBtn) !== 'boolean' &&
          typeOf(submitBtn) !== 'object'
        ) {
          throw new TypeError(
            `options中submitBtn的类型需为Object类型或者Boolean类型！`
          )
        }

        if (
          typeOf(resetBtn) !== 'undefined' &&
          typeOf(resetBtn) !== 'boolean' &&
          typeOf(resetBtn) !== 'object'
        ) {
          throw new TypeError(
            `options中resetBtn的类型需为Object类型或者Boolean类型！`
          )
        }

        return true
      },
    },
    fields: {
      // 表单项配置
      type: Array,
      validator(val) {
        let nameList = []
        val.forEach(
          ({
            component = '',
            name = '',
            type,
            rules,
            slot = '',
            returnDateType,
          }) => {
            if (typeOf(slot) === 'string' && slot.trim()) return true
            if (component === 'Html') return true

            if (!componentTypeRange.includes(component)) {
              throw new RangeError(
                `表单项的component属性不支持${componentTypeRange.join(
                  '、'
                )}以外的值！`
              )
            }
            if (!name || nameList.includes(name)) {
              throw new Error('请为每一个表单项设置唯一的name属性！')
            }
            if (component === 'DatePicker') {
              if (returnDateType && !DateValueType.includes(returnDateType)) {
                throw new RangeError(
                  `DatePicker组件的returnDateType(日期返回类型)属性不支持${DateValueType.join(
                    '、'
                  )}以外的值！`
                )
              }
            }

            if (rules && !Array.isArray(rules)) {
              throw new Error(`表单项的rules必需为Array类型！`)
            }
            nameList.push(name)
          }
        )
        return true
      },
      required: true,
    },
    values: {
      // 表单域值（key对应fields中每一项field的name值）
      type: Object,
      default() {
        return {}
      },
    },
    dataSource: {
      // 表单每一项的数据源配置
      type: Object,
      default() {
        return {}
      },
    },
    rules: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      originFormValue: {},
      formValue: {},
      formRule: {},
      adaptNumberUnit,
      submitBtnLoading: false,
      resetBtnLoading: false,
      refId: '',
      timerBox: {},
      typeOf,
    }
  },
  computed: {
    currentOptions() {
      return merge(defaultOptions, this.options)
    },
    gridFields() {
      // 生成网格布局的fields数据
      return grid.create(this.fields, 'colSpan', this.currentOptions.columns)
    },
    submitBtnOpts() {
      return this.currentOptions.submitBtn
    },
    resetBtnOpts() {
      return this.currentOptions.resetBtn
    },
    actionPL() {
      let { labelWidth, actionAlign, labelPosition } = this.currentOptions
      let lastField = this.fields[this.fields.length - 1]
      if (actionAlign === 'left') {
        return labelPosition === 'top'
          ? 0
          : parseFloat(labelWidth) || parseFloat(lastField.labelWidth)
      }
      return 0
    },
    calFormClass() {
      let { size, readonly } = this.currentOptions
      const classes = []
      if (readonly) {
        classes.push('v-form-readonly')
      }
      switch (size) {
        case 'large':
          classes.push('v-form-large')
          break
        case 'small':
          classes.push('v-form-small')
          break
        default:
          classes.push('v-form-default')
          break
      }
      return classes
    },
  },
  watch: {
    values: {
      immediate: true,
      handler() {
        this._setFormValue()
      },
      deep: true,
    },
    fields: {
      immediate: true,
      handler() {
        this._setFormRule()
        this._checkDataSource()
      },
      deep: true,
    },
  },
  created() {
    this.refId = Math.random().toString().substr(-5)
  },
  mounted() {},
  methods: {
    _setFormValue() {
      let result = {}
      this.fields
        .filter((item) => item.name && item.component !== 'Html' && !item.slot)
        .forEach(
          ({
            name,
            component,
            type,
            falseValue = false,
            multiple = false,
            remote,
            remoteMethod,
          }) => {
            let fieldVal = this.values[name]
            if (typeOf(fieldVal) === 'undefined') {
              switch (component) {
                case 'CheckboxGroup':
                case 'Cascader':
                  result[name] = []
                  this.originFormValue[name] = []
                  break
                case 'Switch':
                case 'Checkbox':
                  result[name] = falseValue
                  this.originFormValue[name] = falseValue
                  break
                case 'Select':
                  if (multiple) {
                    result[name] = []
                    this.originFormValue[name] = []
                  } else {
                    result[name] = ''
                    this.originFormValue[name] = ''
                  }
                  break
                case 'InputNumber':
                  result[name] = 1
                  this.originFormValue[name] = 1
                  break
                case 'DatePicker':
                  if (type === 'daterange' || type === 'datetimerange') {
                    result[name] = []
                    this.originFormValue[name] = []
                  } else {
                    if (multiple) {
                      result[name] = []
                      this.originFormValue[name] = []
                    } else {
                      result[name] = ''
                      this.originFormValue[name] = ''
                    }
                  }
                  break
                default:
                  result[name] = ''
                  this.originFormValue[name] = ''
              }
            } else {
              let v = fieldVal
              this.originFormValue[name] = deepCopy(v)
              if (component === 'DatePicker') {
                if (type === 'daterange' || type === 'datetimerange') {
                  v = fieldVal.map((item) => {
                    return item ? time.parse(item) : ''
                  })
                } else {
                  if (multiple) {
                    if (Array.isArray(fieldVal)) {
                      v = fieldVal.map((item) => {
                        if (item) {
                          return time.parse(item)
                        } else {
                          return item
                        }
                      })
                    } else {
                      v = fieldVal.split(',').map((item) => time.parse(item))
                    }
                  } else {
                    v = fieldVal ? time.parse(fieldVal) : ''
                  }
                }
              }
              result[name] = v
            }
          }
        )
      this.formValue = result
    },
    _setFormRule() {
      this.formRule = {}
      this.fields.forEach(({ rules = [], name } = {}) => {
        if (rules && rules.length) {
          this.formRule[name] = rules
        }
      })
    },
    _checkDataSource() {
      this.fields
        .filter((item) => item.name && item.component !== 'Html' && !item.slot)
        .forEach(({ name, component, dropdownSlot }) => {
          if (
            component === 'Select' ||
            component === 'RadioGroup' ||
            component === 'CheckboxGroup' ||
            component === 'Cascader'
          ) {
            let data = this.dataSource[name]
            if (typeOf(data) !== 'array') {
              throw new TypeError(`${component}组件的数据源需设置为Array类型！`)
            }
            data.forEach(({ label, value }) => {
              if (
                typeOf(label) !== 'string' ||
                (typeOf(value) !== 'string' && typeOf(value) !== 'number')
              ) {
                throw new TypeError(
                  `${component}组件的数据源的每一项需设置label和value属性！`
                )
              }
            })
            if (
              component === 'AutoComplete' &&
              typeOf(data) !== 'array' &&
              !dropdownSlot
            ) {
              throw new Error(
                `请为${component}组件设置数据源或自定义下拉数据源dropdownSlot！`
              )
            }
          }
        })
    },
    _dealNumber(item) {
      let seatchNumber = parseFloat(this.search[item.name])
      if (isNaN(seatchNumber)) {
        seatchNumber = ''
      }
      this.formValue[item.name] = seatchNumber
      if (item.onBlur) {
        this._dealEvent(item.onBlur, item)
      }
    },
    _dealEvent(fnName, ...rest) {
      if (!fnName) return
      let target = this.findVm()
      let params = rest.concat(this.getFormValue())
      if (typeOf(fnName) === 'function') {
        fnName.bind(target)(...params)
      }
      if (typeOf(fnName) === 'string') {
        let fn = target[fnName]
        if (typeOf(fn) === 'function') {
          target[fnName](...params)
        }
      }
    },
    _selectQueryChange(fnName, query, field) {
      let { multiple, name, remote, remoteMethod } = field

      if (!query && !multiple) {
        this.formValue[name] = ''
      }
      if (remote && remoteMethod) {
        field.loading = true
        if (this.timerBox[name]) {
          window.clearTimeout(this.timerBox[name])
        }
        this.timerBox[name] = setTimeout(() => {
          this._dealEvent(remoteMethod, query, field)
        }, 300)
      }
      this._dealEvent(fnName, query, field)
    },
    _isSlot(slot) {
      return typeof slot === 'string' && !!slot.trim()
    },
    _calWidth(width, type) {
      switch (type) {
        case 'field':
          return {
            width: adaptNumberUnit(
              width || this.currentOptions.fieldWidth,
              '100%',
              true
            ),
          }
        case 'btn':
          return {
            width: adaptNumberUnit(width, 'auto', true),
          }
        default:
          return {
            width: adaptNumberUnit(width, '100%', true),
          }
      }
    },
    _calColStyle({ colSpan } = {}) {
      const percent = `${((colSpan || 1) / this.currentOptions.columns) * 100}%`
      return { maxWidth: percent, minWidth: percent }
    },
    onValidate(prop, status, error) {
      this.$emit('on-validate', prop, status, error, this.returnFormValue)
    },
    onSubmit() {
      // 提交表单
      this.$refs[`form-${this.refId}`].validate((valid) => {
        if (valid) {
          this.submitBtnLoading = true
          this.$emit('on-submit', this.returnFormValue, () => {
            this.submitBtnLoading = false
          })
        }
      })
    },
    onReset() {
      // 重置表单
      this.resetBtnLoading = true
      this.$refs[`form-${this.refId}`].resetFields()
      setTimeout(() => {
        this._cancelFocus('.v-form')
      }, 100)
      this.$emit('on-reset', this.returnFormValue, () => {
        this.resetBtnLoading = false
      })
    },
    getFormValue() {
      // 供外部使用
      return Object.assign({}, this.returnFormValue)
    },
    resetFields() {
      // 供外部使用
      this.$refs[`form-${this.refId}`].resetFields()
    },
    validate(callback) {
      // 供外部使用
      this.$refs[`form-${this.refId}`].validate((valid) => {
        let target = this.findVm()
        typeOf(callback) === 'function' && callback.call(target, valid)
      })
    },
    validateField(prop, callback) {
      // 供外部使用
      this.$refs[`form-${this.refId}`].validateField(prop, (errorMsg) => {
        let target = this.findVm()
        typeOf(callback) === 'function' && callback.call(target, errorMsg)
      })
    },
  },
  components: {
    VNumberInput,
    VInput,
    VInputNumber,
    VSelect,
    VDatePicker,
    VRadioGroup,
    VCheckbox,
    VCheckboxGroup,
    VSwitch,
    VAutoComplete,
    VHtml,
    VCascader,
  },
}
</script>
