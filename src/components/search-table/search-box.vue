<template>
  <div ref="search-box" class="search-box" :class="options.className">
    <!-- prepend插槽 -->
    <slot name="search-prepend"></slot>
    <!-- 表单域 -->
    <Form ref="form" class="search-box-form" inline :model="search"
      :rules="formRule"
      :label-width="Number(options.labelWidth)"
      :label-position="options.labelPosition ? options.labelPosition : 'right'"
      :label-colon="options.labelColon" :hide-required-mark="options.hideRequiredMark"
      :show-message="options.showMessage">
      <FormItem v-for="(item, fieldIndex) in fields"
        :key="`field-${fieldIndex}`" :prop="item.name" :label="item.label"
        :label-width="item.labelWidth"
        :class="{'ivu-form-item-slot': isSlot(item.slot)}"
        :style="{width: !isSlot(item.slot) ? 'auto' : calFormItemWidth(item)}">
        <!-- 系统内置组件 -->
        <template v-if="!isSlot(item.slot)">
          <!-- Html -->
          <v-html v-if="item.component === 'Html'" :item="item"></v-html>
          <!-- Input -->
          <v-input v-if="item.component === 'Input'" :ref="item.name"
            v-model="search[item.name]" :item="item" @deal-event="dealEvent"
            @deal-number="dealNumber">
            <!-- 前置slot -->
            <template v-slot:prepend
              v-if="(!item.type || item.type === 'text') && item.prependSlot">
              <slot :name="item.prependSlot" :field="item">
              </slot>
            </template>
            <!-- 后置slot -->
            <template v-slot:append
              v-if="(!item.type || item.type === 'text') && item.appendSlot">
              <slot :name="item.appendSlot" :field="item">
              </slot>
            </template>
          </v-input>

          <!-- InputNumber -->
          <v-input-number :ref="item.name"
            v-if="item.component === 'InputNumber'" v-model="search[item.name]"
            :item="item" @deal-event="dealEvent">
          </v-input-number>

          <!-- Select -->
          <v-select :ref="item.name" v-if="item.component === 'Select'"
            v-model="search[item.name]" :item="item" @deal-event="dealEvent">
            <template v-slot:options
              v-if="typeOf(dataSource[item.name]) === 'array' && dataSource[item.name].length">
              <Option v-for="(optionItem, optionIndex) in dataSource[item.name]"
                :value="optionItem.value" :label="optionItem.label"
                :key="optionIndex" :disabled="optionItem.disabled">
                <template v-slot:default v-if="item.optionSlot">
                  <slot :name="item.optionSlot" :field="item"
                    :label="optionItem.label" :value="optionItem.value">
                  </slot>
                </template>
              </Option>
            </template>
          </v-select>

          <!-- DatePicker -->
          <v-date-picker :ref="item.name" v-if="item.component === 'DatePicker'"
            v-model="search[item.name]" :item="item" @deal-event="dealEvent">
          </v-date-picker>

          <!-- RadioGroup -->
          <v-radio-group :ref="item.name" v-if="item.component === 'RadioGroup'"
            v-model="search[item.name]" :item="item"
            :data-source="dataSource[item.name]" @deal-event="dealEvent">
            <template v-slot:default="slotProps" v-if="item.radioSlot">
              <slot :name="item.radioSlot" :field="item"
                :label="slotProps.label" :value="slotProps.value">
              </slot>
            </template>
          </v-radio-group>

          <!-- Checkbox -->
          <v-checkbox :ref="item.name" v-if="item.component === 'Checkbox'"
            v-model="search[item.name]" :item="item" @deal-event="dealEvent">
          </v-checkbox>

          <!-- CheckboxGroup -->
          <v-checkbox-group :ref="item.name"
            v-if="item.component === 'CheckboxGroup'"
            v-model="search[item.name]" :item="item"
            :data-source="dataSource[item.name]" @deal-event="dealEvent">
          </v-checkbox-group>

          <!-- Switch -->
          <v-switch :ref="item.name" v-if="item.component === 'Switch'"
            v-model="search[item.name]" :item="item" @deal-event="dealEvent">
          </v-switch>

          <!-- AutoComplete 数据源使用item.data-->
          <v-auto-complete :ref="item.name"
            v-if="item.component === 'AutoComplete'" v-model="search[item.name]"
            :item="item" :data-source="item.data" @deal-event="dealEvent">
            <template v-slot:default v-if="item.dropdownSlot">
              <slot :name="item.dropdownSlot" :field="item">
              </slot>
            </template>
            <template v-slot:default v-else-if="!item.filterMethod">
              <Option v-for="(item, index) in item.data" :value="item"
                :key="`autocomplete-${index}`">{{ item }}</Option>
            </template>
          </v-auto-complete>

          <!-- Cascader 数据源使用item.data-->
          <v-cascader :ref="item.name" v-if="item.component === 'Cascader'"
            v-model="search[item.name]" :item="item" :data-source="item.data"
            @deal-event="dealEvent">
            <template v-slot:default v-if="item.selectSlot">
              <slot :name="item.selectSlot" :field="item">
              </slot>
            </template>
          </v-cascader>

          <!-- Button -->
          <v-button v-if="item.component === 'Button'" :item="item"
            @deal-event="dealEvent">
            <template v-slot:default v-if="item.contentSlot">
              <slot :name="item.contentSlot" :field="item">
              </slot>
            </template>
          </v-button>

        </template>
        <!-- 自定义组件 -->
        <template v-else>
          <slot :name="item.slot"></slot>
        </template>
      </FormItem>
      <template v-if="!options.fold">
        <!-- 默认使用有【搜索】和【重置】按钮 -->
        <!-- 操作按钮不换行 -->
        <template v-if="!options.actionLineFeed">
          <slot name="action-prepend"></slot>
          <FormItem v-if="!options.hiddenSearchBtn" :label-width="0">
            <Button type="primary"
              :icon="options.hiddenActionIcon ? '' : 'md-search'"
              :loading="searchBtnLoading" @click="onSearch">搜索</Button>
          </FormItem>
          <FormItem v-if="!options.hiddenResetBtn" :label-width="0">
            <Button type="primary" ghost
              :icon="options.hiddenActionIcon ? '' : 'md-refresh'"
              :loading="resetBtnLoading" @click="onReset">重置</Button>
          </FormItem>
          <slot name="action-append"></slot>
        </template>
      </template>
      <div class="action-wrap" v-else>
        <slot name="action-prepend"></slot>
        <Button v-if="!options.hiddenSearchBtn" type="primary"
          :icon="options.hiddenActionIcon ? '' : 'md-search'"
          :loading="searchBtnLoading" @click="onSearch">搜索</Button>
        <Button v-if="!options.hiddenResetBtn" type="primary" ghost
          :icon="options.hiddenActionIcon ? '' : 'md-refresh'"
          :loading="resetBtnLoading" @click="onReset">重置</Button>
        <slot name="action-append"></slot>
        <template
          v-if="!options.hiddenSearchBtn || !options.hiddenResetBtn || $scopedSlots['action-prepend'] || $scopedSlots['action-append']">
          <span class="fold-bar" v-if="isFold" @click="toggleFold(false)">
            展开
            <Icon type="ios-arrow-down" size="16" />
          </span>
          <span class="fold-bar" v-else @click="toggleFold(true)">
            收起
            <Icon type="ios-arrow-up" size="16" />
          </span>
        </template>
      </div>
    </Form>
    <div class="action-line-feed-wrap"
      v-if="!options.fold && options.actionLineFeed && (!options.hiddenSearchBtn || !options.hiddenResetBtn || $scopedSlots['action-prepend'] || $scopedSlots['action-append'])">
      <slot name="action-prepend"></slot>
      <Button v-if="!options.hiddenSearchBtn" type="primary"
        :icon="options.hiddenActionIcon ? '' : 'md-search'"
        :loading="searchBtnLoading" @click="onSearch">搜索</Button>
      <Button v-if="!options.hiddenResetBtn" type="primary" ghost
        :icon="options.hiddenActionIcon ? '' : 'md-refresh'"
        :loading="resetBtnLoading" @click="onReset">重置</Button>
      <slot name="action-append"></slot>
    </div>
    <!-- append插槽 -->
    <slot name="search-append"></slot>
  </div>
</template>

<script>
import { typeOf, deepCopy, checkIsDataCmp } from '../../utils/assist'
import findVm from '../../mixins/find-vm'
import cancelFocus from '../../mixins/cancel-focus'
import Time from '../../utils/time'
import timeout from '../../utils/timeout'
import eventBus from '../../utils/event'
import { labelPositionRange, DateValueType } from '../../utils/constant'
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
import VButton from '../field-components/v-button'
import collect from '../../utils/collect'

const time = new Time()

const componentTypeRange = [
  'Input',
  'InputNumber',
  'Select',
  'DatePicker',
  'RadioGroup',
  'Checkbox',
  'CheckboxGroup',
  'Switch',
  'Cascader',
  'AutoComplete',
  'Html',
  'Button',
]

export default {
  name: 'SearchBox',
  props: {
    search: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      validator(val) {
        let nameList = []
        val.forEach(
          ({
            component = '',
            name = '',
            labelPosition = 'right',
            data,
            type,
            returnDateType,
            slot = '',
            dropdownSlot,
            text,
            style,
            labelKey,
            valueKey,
          }) => {
            if (typeOf(slot) === 'string' && slot.trim()) return true
            if (component === 'Html') return true
            if (!componentTypeRange.includes(component)) {
              throw new RangeError(
                `搜索项的component属性不支持${componentTypeRange.join(
                  '、'
                )}以外的值！`
              )
            }
            if ((!name || nameList.includes(name)) && component !== 'Button') {
              throw new Error('请为每一个表单项设置唯一的name属性！')
            }
            if (!labelPositionRange.includes(labelPosition)) {
              throw new RangeError(
                `搜索项的labelPosition属性不支持${labelPositionRange.join(
                  '、'
                )}以外的值！`
              )
            }
            if (checkIsDataCmp(component)) {
              if (typeOf(data) !== 'array') {
                throw new TypeError(
                  `${component}组件的数据源data需设置为Array类型！`
                )
              }
              data.forEach(({ label, value }) => {
                if (typeOf(label) !== 'string' && !labelKey) {
                  throw new TypeError(
                    `${component}组件的数据源data的每一项需设置label属性或指定label的labelKey属性！`
                  )
                }

                if (
                  typeOf(value) !== 'string' &&
                  typeOf(value) !== 'number' &&
                  !valueKey
                ) {
                  throw new TypeError(
                    `${component}组件的数据源data的每一项需设置value属性或指定value的valueKey属性！`
                  )
                }
              })
            }
            if (
              component === 'AutoComplete' &&
              typeOf(data) !== 'array' &&
              !dropdownSlot
            ) {
              throw new Error(
                `请为${component}组件设置数据源或自定义下拉数据源dropdownSlot！`
              )
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
            nameList.push(name)
          }
        )
        return true
      },
      default() {
        return []
      },
    },
    options: {
      type: Object,
      default() {
        return {}
      },
      validator({ labelPosition }) {
        if (labelPosition && !labelPositionRange.includes(labelPosition)) {
          throw new RangeError(
            `search-config的labelPosition属性不支持${labelPositionRange.join(
              '、'
            )}以外的值！`
          )
        }
        return true
      },
    },
  },
  mixins: [findVm, cancelFocus],
  components: {
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
  data() {
    return {
      originSearch: null,
      formRule: {},
      typeOf,
      showFieldNum: 0,
      searchBtnLoading: false,
      resetBtnLoading: false,
      isFold: false,
      _dealFieldFold: null
    }
  },
  computed: {
    dataSource() {
      let fields = this.fields.filter(({ component, data }) => checkIsDataCmp(component) && Array.isArray(data))
      let result = {}
      fields.forEach(({ name, data, labelKey, valueKey }) => {
        result[name] = data.map((dataItem) => {
          return {
            ...dataItem,
            label: labelKey ? dataItem[labelKey] : dataItem.label,
            value: valueKey ? dataItem[valueKey] : dataItem.value,
          }
        })
      })
      return result
    },
  },
  watch: {
    search: {
      immediate: true,
      handler(val) {
        if (!this.originSearch) {
          this._setOriginValue(val)
        }
      },
    },
    fields: {
      immediate: true,
      handler() {
        this._setFormRule()
      },
      deep: true,
    },
    'options.fold': {
      immediate: true,
      handler(val) {
        this.isFold = !!val
      },
    },
  },
  created() {
    this._dealFieldFold = timeout(this.dealFieldFold)
    eventBus.$on('view-change', this._dealFieldFold)
  },
  mounted() {
    if (!!this.options.fold) {
      setTimeout(() => {
        this.dealFieldFold()
        window.addEventListener('resize', this._dealFieldFold)
      }, 100)
    }
    this.addRef()
  },
  methods: {
    _setOriginValue(formValue) {
      let result = {}
      this.fields
        .filter(
          (item) =>
            item.name &&
            item.component !== 'Html' &&
            item.component !== 'Button' &&
            !item.slot
        )
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
            let fieldVal = formValue[name]
            if (typeOf(fieldVal) === 'undefined') {
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
                case 'DatePicker':
                  if (type === 'daterange' || type === 'datetimerange') {
                    result[name] = []
                  } else {
                    if (multiple) {
                      result[name] = []
                    } else {
                      result[name] = ''
                    }
                  }
                  break
                default:
                  result[name] = ''
              }
            } else {
              result[name] = deepCopy(fieldVal)
            }
          }
        )
      this.originSearch = result
    },
    _setFormRule() {
      this.formRule = {}
      this.fields.forEach(({ rules = [], name } = {}) => {
        if (rules && rules.length) {
          this.formRule[name] = rules
        }
      })
    },
    addRef() {
      let vm = this.findVm()
      for (let [key, ref] of Object.entries(this.$refs)) {
        if (Array.isArray(ref)) {
          vm.$refs[`_${key}`] = ref[0].$children[0]
        }
      }
    },
    dealNumber(item) {
      let seatchNumber = parseFloat(this.search[item.name])
      if (isNaN(seatchNumber)) {
        seatchNumber = ''
      }
      this.search[item.name] = seatchNumber
      if (item.onBlur) {
        this.dealEvent(item.onBlur, item)
      }
    },
    dealEvent(fnName, ...rest) {
      if (!fnName) return
      this.$emit('on-event', fnName, ...rest)
    },
    toggleFold() {
      this.isFold = !this.isFold
      this.dealFieldFold()
      this.$emit('on-fold-toggle', this.isFold)
    },
    dealFieldFold() {
      // 处理搜索栏的展开/收起
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
    isSlot(slot) {
      return typeof slot === 'string' && !!slot.trim()
    },
    calFormItemWidth({ width, labelWidth, slot }) {
      let fieldWidth = width ? Number(width) : Number(this.options.fieldWidth)
      labelWidth = labelWidth
        ? Number(labelWidth)
        : Number(this.options.labelWidth)
      return this.isSlot(slot) ? `${labelWidth + fieldWidth}px` : 'auto'
    },
    onSearch() {
      this.$refs[`form`].validate((valid) => {
        if (valid) {
          this.searchBtnLoading = true
          this.$emit('on-search', () => {
            this.searchBtnLoading = false
          })
        }
      })
    },
    onReset() {
      this.resetBtnLoading = true
      this.$refs['form'].resetFields()
      setTimeout(() => {
        this._cancelFocus('.search-box')
        this.$emit('update-search', deepCopy(this.originSearch))
        this.$emit('on-reset')
        this.$emit('on-search', () => {
          this.resetBtnLoading = false
        })
      }, 50)
    }
  },
}
</script>
