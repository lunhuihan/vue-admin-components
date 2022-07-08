<template>
  <Form
    :ref="`form-${refId}`"
    class="v-component v-form"
    :class="calFormClass"
    :model="model"
    :rules="formRule"
    :inline="currentOptions.inline"
    :style="_calWidth(currentOptions.width)"
    :label-width="parseFloat(currentOptions.labelWidth)"
    :label-position="currentOptions.labelPosition"
    :label-colon="currentOptions.labelColon"
    :hide-required-mark="currentOptions.hideRequiredMark"
    :show-message="currentOptions.showMessage"
    :disabled="currentOptions.disabled"
    @on-validate="onValidate"
  >
    <template v-if="!currentOptions.inline">
      <Row
        class="form-item-row"
        v-for="(row, rowIndex) in gridFields"
        :key="`row-${rowIndex}`"
        :gutter="currentOptions.colSpace"
      >
        <Col
          class="form-item-col"
          :class="_calColClass(col)"
          v-for="(col, colIndex) in row"
          :key="`col-${colIndex}`"
          :flex="colStyleInfo[rowIndex][colIndex].flex"
          :style="colStyleInfo[rowIndex][colIndex].style"
        >
          <FormItem
            v-for="(item, itemIndex) in col"
            :key="`form-item-${itemIndex}`"
            :prop="item.name"
            :label="item.label"
            :label-width="
              parseFloat(item.labelWidth) ||
              parseFloat(currentOptions.labelWidth)
            "
            :required="item.required"
            :error="item.error"
            :class="[
              `label-${
                item.labelPosition
                  ? item.labelPosition
                  : currentOptions.labelPosition
              }`,
              `size-${_calFormItemSize(item)}`,
              { inline: colStyleInfo[rowIndex][colIndex].multiple },
              `form-item-${item.component}`,
              `${item.formItemClass ? item.formItemClass : ''}`,
            ]"
          >
            <!-- label-append -->
            <div
              class="form-label-append"
              v-if="
                item.labelAfterHtml && currentOptions.labelPosition === 'top'
              "
              v-html="item.labelAfterHtml"
              :style="_labelAppendStyle(item.label)"
            ></div>
            <!-- 系统内置组件 -->
            <template v-if="!_isSlot(item.slot)">
              <!-- Html -->
              <template v-if="item.component === 'Html'">
                <slot :name="item.beforeSlot"></slot>
                <v-html :item="item"></v-html>
                <slot :name="item.afterSlot"></slot>
              </template>
              <!-- Input -->
              <template v-if="item.component === 'Input'">
                <slot :name="item.beforeSlot"></slot>
                <v-input
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  @deal-event="_dealEvent"
                  @deal-number="_dealNumber"
                >
                  <!-- 前置slot -->
                  <template v-slot:prepend v-if="item.prependSlot">
                    <slot :name="item.prependSlot" :field="item"> </slot>
                  </template>
                  <!-- 后置slot -->
                  <template v-slot:append v-if="item.appendSlot">
                    <slot :name="item.appendSlot" :field="item"> </slot>
                  </template>
                </v-input>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- InputNumber -->
              <template v-if="item.component === 'InputNumber'">
                <slot :name="item.beforeSlot"></slot>
                <v-input-number
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  @deal-event="_dealEvent"
                ></v-input-number>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- Select -->
              <template v-if="item.component === 'Select'">
                <slot :name="item.beforeSlot"></slot>
                <v-select
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  @deal-event="_dealEvent"
                >
                  <template
                    v-slot:options
                    v-if="
                      typeOf(formDataSource[item.name]) === 'array' &&
                      formDataSource[item.name].length
                    "
                  >
                    <Option
                      v-for="(optionItem, optionIndex) in formDataSource[
                        item.name
                      ]"
                      :value="optionItem.value"
                      :label="optionItem.label"
                      :key="optionIndex"
                      :disabled="optionItem.disabled"
                    >
                      <template
                        v-slot:default
                        v-if="item.optionSlot || item.poptip"
                      >
                        <template v-if="!item.poptip">
                          <slot
                            :name="item.optionSlot"
                            :field="item"
                            :label="optionItem.label"
                            :value="optionItem.value"
                            :data="optionItem"
                            :index="optionIndex"
                          >
                          </slot>
                        </template>
                        <Poptip
                          v-else
                          :trigger="item.poptip.trigger || 'hover'"
                          :title="item.poptip.title"
                          :content="item.poptip.content"
                          :placement="item.poptip.placement || 'top'"
                          :width="item.poptip.width"
                          :disabled="item.poptip.disabled"
                          :transfer="item.poptip.transfer"
                          :popper-class="item.poptip.popperClass"
                        >
                          <template v-if="item.optionSlot">
                            <slot
                              :name="item.optionSlot"
                              :field="item"
                              :label="optionItem.label"
                              :value="optionItem.value"
                              :data="optionItem"
                              :index="optionIndex"
                            >
                            </slot>
                          </template>
                          <template v-else>
                            {{ optionItem.label }}
                          </template>
                          <div
                            v-if="item.poptip.slot"
                            class="v-select-poptip-content"
                            slot="content"
                          >
                            <slot
                              :name="item.poptip.slot"
                              :field="item"
                              :label="optionItem.label"
                              :value="optionItem.value"
                              :data="optionItem"
                              :index="optionIndex"
                            ></slot>
                          </div>
                        </Poptip>
                      </template>
                    </Option>
                  </template>
                </v-select>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- DatePicker -->
              <template v-if="item.component === 'DatePicker'">
                <slot :name="item.beforeSlot"></slot>
                <v-date-picker
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  @deal-event="_dealEvent"
                >
                </v-date-picker>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- RadioGroup -->
              <template v-if="item.component === 'RadioGroup'">
                <slot :name="item.beforeSlot"></slot>
                <RadioGroup
                  :ref="item.name"
                  v-model="model[item.name]"
                  :type="item.type"
                  :button-style="item.buttonStyle"
                  :style="calFieldStyle(item)"
                  :class="calFieldClass(item)"
                  :size="calFieldSize(item)"
                  @on-change="
                    (val) => {
                      _dealEvent(item.onChange, val, item)
                    }
                  "
                >
                  <Radio
                    :label="radioItem.value"
                    v-for="(radioItem, radioIndex) in formDataSource[item.name]"
                    :key="`radio-${item.name}-${radioIndex}`"
                    :disabled="calFieldDisabled(radioItem)"
                    :border="item.border"
                  >
                    <template v-if="item.radioSlot">
                      <slot
                        :name="item.radioSlot"
                        :field="item"
                        :label="radioItem.label"
                        :value="radioItem.value"
                        :data="radioItem"
                        :index="radioIndex"
                      >
                      </slot>
                    </template>
                    <template v-else>
                      <Icon :type="radioItem.icon" v-if="radioItem.icon"></Icon>
                      <span v-html="radioItem.label"></span>
                    </template>
                  </Radio>
                </RadioGroup>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- Checkbox -->
              <template v-if="item.component === 'Checkbox'">
                <slot :name="item.beforeSlot"></slot>
                <Checkbox
                  :ref="item.name"
                  v-model="model[item.name]"
                  :style="calFieldStyle(item)"
                  :class="item.className"
                  :size="calFieldSize(item)"
                  :indeterminate="item.indeterminate"
                  :disabled="calFieldDisabled(item)"
                  :true-value="item.trueValue"
                  :false-value="item.falseValue"
                  @on-change="
                    (val) => {
                      _dealEvent(item.onChange, val, item)
                    }
                  "
                >
                  <template v-if="item.checkboxSlot">
                    <slot :name="item.checkboxSlot" :field="item"> </slot>
                  </template>
                  <template v-else>
                    <Icon :type="item.icon" v-if="item.icon"></Icon>
                    <span v-html="item.text"></span>
                  </template>
                </Checkbox>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- CheckboxGroup -->
              <template v-if="item.component === 'CheckboxGroup'">
                <slot :name="item.beforeSlot"></slot>
                <CheckboxGroup
                  :ref="item.name"
                  v-model="model[item.name]"
                  :type="item.type"
                  :style="calFieldStyle(item)"
                  :class="calFieldClass(item)"
                  :size="calFieldSize(item)"
                  @on-change="
                    (val) => {
                      _dealEvent(item.onChange, val, item)
                    }
                  "
                >
                  <Checkbox
                    v-for="(checkboxItem, checkboxIndex) in formDataSource[
                      item.name
                    ]"
                    :label="checkboxItem.value"
                    :key="`checkbox-${item.name}-${checkboxIndex}`"
                    :size="calFieldSize(item)"
                    :disabled="calFieldDisabled(checkboxItem)"
                    :border="item.border"
                  >
                    <template v-if="item.checkboxSlot">
                      <slot
                        :name="item.checkboxSlot"
                        :field="item"
                        :label="checkboxItem.label"
                        :value="checkboxItem.value"
                        :data="checkboxItem"
                        :index="checkboxIndex"
                      >
                      </slot>
                    </template>
                    <template v-else>
                      <Icon :type="checkboxItem.icon" v-if="checkboxItem.icon">
                      </Icon>
                      <span v-html="checkboxItem.label"></span>
                    </template>
                  </Checkbox>
                </CheckboxGroup>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- Switch -->
              <template v-if="item.component === 'Switch'">
                <slot :name="item.beforeSlot"></slot>
                <v-switch
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  @deal-event="_dealEvent"
                >
                </v-switch>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- AutoComplete -->
              <template v-if="item.component === 'AutoComplete'">
                <slot :name="item.beforeSlot"></slot>
                <v-auto-complete
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  :data-source="dataSource[item.name]"
                  @deal-event="_dealEvent"
                >
                  <template v-slot:default v-if="item.dropdownSlot">
                    <slot :name="item.dropdownSlot" :field="item"> </slot>
                  </template>
                  <template v-slot:default v-else-if="!item.filterMethod">
                    <Option
                      v-for="(optionItem, optionIndex) in dataSource[item.name]"
                      :value="optionItem"
                      :key="`autocomplete-${optionIndex}`"
                    >
                      {{ optionItem }}
                    </Option>
                  </template>
                </v-auto-complete>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- Cascader -->
              <template v-if="item.component === 'Cascader'">
                <slot :name="item.beforeSlot"></slot>
                <v-cascader
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  :data-source="dataSource[item.name]"
                  @deal-event="_dealEvent"
                >
                  <template v-slot:default v-if="item.selectSlot">
                    <slot :name="item.selectSlot" :field="item"> </slot>
                  </template>
                </v-cascader>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- Upload -->
              <template v-if="item.component === 'Upload'">
                <slot :name="item.beforeSlot"></slot>
                <v-upload
                  :ref="item.name"
                  v-model="model[item.name]"
                  :item="item"
                  @deal-event="_dealEvent"
                >
                  <template v-slot:default v-if="item.contentSlot">
                    <slot :name="item.contentSlot" :field="item"> </slot>
                  </template>
                </v-upload>
                <slot :name="item.afterSlot"></slot>
              </template>

              <!-- Button -->
              <template v-if="item.component === 'Button'">
                <slot :name="item.beforeSlot"></slot>
                <v-button :item="item" @deal-event="_dealEvent">
                  <template v-slot:default v-if="item.contentSlot">
                    <slot :name="item.contentSlot" :field="item"></slot>
                  </template>
                </v-button>
                <slot :name="item.afterSlot"></slot>
              </template>
            </template>
            <!-- 自定义组件 -->
            <template v-else>
              <slot :name="item.slot" :field="item"></slot>
            </template>
          </FormItem>
        </Col>
      </Row>
    </template>
    <template v-else>
      <FormItem
        v-for="(item, index) in ruleFields"
        :key="index"
        :prop="item.name"
        :label="item.label"
        :label-width="
          parseFloat(item.labelWidth) || parseFloat(currentOptions.labelWidth)
        "
        :required="item.required"
        :error="item.error"
        :class="[
          `label-${currentOptions.labelPosition}`,
          `size-${_calFormItemSize(item)}`,
          'inline',
          `form-item-${item.component}`,
          `${item.formItemClass ? item.formItemClass : ''}`,
        ]"
      >
        <!-- 系统内置组件 -->
        <template v-if="!_isSlot(item.slot)">
          <!-- Html -->
          <template v-if="item.component === 'Html'">
            <slot :name="item.beforeSlot"></slot>
            <v-html :item="item"></v-html>
            <slot :name="item.afterSlot"></slot>
          </template>
          <!-- Input -->
          <template v-if="item.component === 'Input'">
            <slot :name="item.beforeSlot"></slot>
            <v-input
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              @deal-event="_dealEvent"
              @deal-number="_dealNumber"
            >
              <!-- 前置slot -->
              <template v-slot:prepend v-if="item.prependSlot">
                <slot :name="item.prependSlot" :field="item"> </slot>
              </template>
              <!-- 后置slot -->
              <template v-slot:append v-if="item.appendSlot">
                <slot :name="item.appendSlot" :field="item"> </slot>
              </template>
            </v-input>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- InputNumber -->
          <template v-if="item.component === 'InputNumber'">
            <slot :name="item.beforeSlot"></slot>
            <v-input-number
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              @deal-event="_dealEvent"
            ></v-input-number>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- Select -->
          <template v-if="item.component === 'Select'">
            <slot :name="item.beforeSlot"></slot>
            <v-select
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              @deal-event="_dealEvent"
            >
              <template
                v-slot:options
                v-if="
                  typeOf(formDataSource[item.name]) === 'array' &&
                  formDataSource[item.name].length
                "
              >
                <Option
                  v-for="(optionItem, optionIndex) in formDataSource[item.name]"
                  :value="optionItem.value"
                  :label="optionItem.label"
                  :key="optionIndex"
                  :disabled="optionItem.disabled"
                >
                  <template
                    v-slot:default
                    v-if="item.optionSlot || item.poptip"
                  >
                    <template v-if="!item.poptip">
                      <slot
                        :name="item.optionSlot"
                        :field="item"
                        :label="optionItem.label"
                        :value="optionItem.value"
                        :data="optionItem"
                        :index="optionIndex"
                      >
                      </slot>
                    </template>
                    <Poptip
                      v-else
                      :trigger="item.poptip.trigger || 'hover'"
                      :title="item.poptip.title"
                      :content="item.poptip.content"
                      :placement="item.poptip.placement || 'top'"
                      :width="item.poptip.width"
                      :disabled="item.poptip.disabled"
                      :transfer="item.poptip.transfer"
                      :popper-class="item.poptip.popperClass"
                    >
                      <template v-if="item.optionSlot">
                        <slot
                          :name="item.optionSlot"
                          :field="item"
                          :label="optionItem.label"
                          :value="optionItem.value"
                          :data="optionItem"
                          :index="optionIndex"
                        >
                        </slot>
                      </template>
                      <template v-else>
                        {{ optionItem.label }}
                      </template>
                      <div
                        v-if="item.poptip.slot"
                        class="v-select-poptip-content"
                        slot="content"
                      >
                        <slot
                          :name="item.poptip.slot"
                          :field="item"
                          :label="optionItem.label"
                          :value="optionItem.value"
                          :data="optionItem"
                          :index="optionIndex"
                        ></slot>
                      </div>
                    </Poptip>
                  </template>
                </Option>
              </template>
            </v-select>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- DatePicker -->
          <template v-if="item.component === 'DatePicker'">
            <slot :name="item.beforeSlot"></slot>
            <v-date-picker
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              @deal-event="_dealEvent"
            >
            </v-date-picker>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- RadioGroup -->
          <template v-if="item.component === 'RadioGroup'">
            <slot :name="item.beforeSlot"></slot>
            <RadioGroup
              :ref="item.name"
              v-model="model[item.name]"
              :type="item.type"
              :button-style="item.buttonStyle"
              :style="calFieldStyle(item)"
              :class="calFieldClass(item)"
              :size="calFieldSize(item)"
              @on-change="
                (val) => {
                  _dealEvent(item.onChange, val, item)
                }
              "
            >
              <Radio
                :label="radioItem.value"
                v-for="(radioItem, radioIndex) in formDataSource[item.name]"
                :key="`radio-${item.name}-${radioIndex}`"
                :disabled="calFieldDisabled(radioItem)"
                :border="item.border"
              >
                <template v-if="item.radioSlot">
                  <slot
                    :name="item.radioSlot"
                    :field="item"
                    :label="radioItem.label"
                    :value="radioItem.value"
                    :data="radioItem"
                    :index="radioIndex"
                  >
                  </slot>
                </template>
                <template v-else>
                  <Icon :type="radioItem.icon" v-if="radioItem.icon"></Icon>
                  <span v-html="radioItem.label"></span>
                </template>
              </Radio>
            </RadioGroup>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- Checkbox -->
          <template v-if="item.component === 'Checkbox'">
            <slot :name="item.beforeSlot"></slot>
            <Checkbox
              :ref="item.name"
              v-model="model[item.name]"
              :style="calFieldStyle(item)"
              :class="item.className"
              :size="calFieldSize(item)"
              :indeterminate="item.indeterminate"
              :disabled="calFieldDisabled(item)"
              :true-value="item.trueValue"
              :false-value="item.falseValue"
              @on-change="
                (val) => {
                  _dealEvent(item.onChange, val, item)
                }
              "
            >
              <template v-if="item.checkboxSlot">
                <slot :name="item.checkboxSlot" :field="item"> </slot>
              </template>
              <template v-else>
                <Icon :type="item.icon" v-if="item.icon"></Icon>
                <span v-html="item.text"></span>
              </template>
            </Checkbox>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- CheckboxGroup -->
          <template v-if="item.component === 'CheckboxGroup'">
            <slot :name="item.beforeSlot"></slot>
            <CheckboxGroup
              :ref="item.name"
              v-model="model[item.name]"
              :type="item.type"
              :style="calFieldStyle(item)"
              :class="calFieldClass(item)"
              :size="calFieldSize(item)"
              @on-change="
                (val) => {
                  _dealEvent(item.onChange, val, item)
                }
              "
            >
              <Checkbox
                v-for="(checkboxItem, checkboxIndex) in formDataSource[
                  item.name
                ]"
                :label="checkboxItem.value"
                :key="`checkbox-${item.name}-${checkboxIndex}`"
                :size="calFieldSize(item)"
                :disabled="calFieldDisabled(checkboxItem)"
                :border="item.border"
              >
                <template v-if="item.checkboxSlot">
                  <slot
                    :name="item.checkboxSlot"
                    :field="item"
                    :label="checkboxItem.label"
                    :value="checkboxItem.value"
                    :data="checkboxItem"
                    :index="checkboxIndex"
                  >
                  </slot>
                </template>
                <template v-else>
                  <Icon :type="checkboxItem.icon" v-if="checkboxItem.icon">
                  </Icon>
                  <span v-html="checkboxItem.label"></span>
                </template>
              </Checkbox>
            </CheckboxGroup>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- Switch -->
          <template v-if="item.component === 'Switch'">
            <slot :name="item.beforeSlot"></slot>
            <v-switch
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              @deal-event="_dealEvent"
            >
            </v-switch>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- AutoComplete -->
          <template v-if="item.component === 'AutoComplete'">
            <slot :name="item.beforeSlot"></slot>
            <v-auto-complete
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              :data-source="dataSource[item.name]"
              @deal-event="_dealEvent"
            >
              <template v-slot:default v-if="item.dropdownSlot">
                <slot :name="item.dropdownSlot" :field="item"> </slot>
              </template>
              <template v-slot:default v-else-if="!item.filterMethod">
                <Option
                  v-for="(optionItem, optionIndex) in dataSource[item.name]"
                  :value="optionItem"
                  :key="`autocomplete-${optionIndex}`"
                >
                  {{ optionItem }}
                </Option>
              </template>
            </v-auto-complete>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- Cascader -->
          <template v-if="item.component === 'Cascader'">
            <slot :name="item.beforeSlot"></slot>
            <v-cascader
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              :data-source="dataSource[item.name]"
              @deal-event="_dealEvent"
            >
              <template v-slot:default v-if="item.selectSlot">
                <slot :name="item.selectSlot" :field="item"> </slot>
              </template>
            </v-cascader>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- Upload -->
          <template v-if="item.component === 'Upload'">
            <slot :name="item.beforeSlot"></slot>
            <v-upload
              :ref="item.name"
              v-model="model[item.name]"
              :item="item"
              @deal-event="_dealEvent"
            >
              <template v-slot:default v-if="item.contentSlot">
                <slot :name="item.contentSlot" :field="item"> </slot>
              </template>
            </v-upload>
            <slot :name="item.afterSlot"></slot>
          </template>

          <!-- Button -->
          <template v-if="item.component === 'Button'">
            <slot :name="item.beforeSlot"></slot>
            <v-button :item="item" @deal-event="_dealEvent">
              <template v-slot:default v-if="item.contentSlot">
                <slot :name="item.contentSlot" :field="item"></slot>
              </template>
            </v-button>
            <slot :name="item.afterSlot"></slot>
          </template>
        </template>
        <!-- 自定义组件 -->
        <template v-else>
          <slot :name="item.slot" :field="item"></slot>
        </template>
      </FormItem>
    </template>
    <slot name="action-before"></slot>
    <div
      class="v-form-actions"
      :class="[
        `align-${currentOptions.actionAlign}`,
        { inline: currentOptions.inline },
      ]"
      :style="{ paddingLeft: `${actionPL}px` }"
      v-if="(submitBtnOpts || resetBtnOpts) && !currentOptions.readonly"
    >
      <template v-if="currentOptions.btnPositionReverse">
        <slot name="reset-before"></slot>
        <Button
          v-if="resetBtnOpts"
          :class="resetBtnOpts.className"
          :style="
            _calWidth(resetBtnOpts.long ? '100%' : resetBtnOpts.width, 'btn')
          "
          :type="resetBtnOpts.type"
          :size="resetBtnOpts.size || currentOptions.size"
          :html-type="resetBtnOpts.htmlType"
          :ghost="resetBtnOpts.ghost"
          :loading="resetBtnOpts.loading || resetBtnLoading"
          :icon="resetBtnOpts.icon"
          :disabled="resetBtnOpts.disabled"
          :long="resetBtnOpts.long"
          :shape="resetBtnOpts.shape"
          @click="onReset"
          >{{ resetBtnOpts.text }}</Button
        >
        <slot name="reset-after"></slot>
      </template>
      <slot name="submit-before"></slot>
      <Button
        v-if="submitBtnOpts"
        :class="submitBtnOpts.className"
        :style="
          _calWidth(submitBtnOpts.long ? '100%' : submitBtnOpts.width, 'btn')
        "
        :size="submitBtnOpts.size || currentOptions.size"
        :type="submitBtnOpts.type"
        :ghost="submitBtnOpts.ghost"
        :html-type="submitBtnOpts.htmlType"
        :loading="submitBtnOpts.loading || submitBtnLoading"
        :icon="submitBtnOpts.icon"
        :disabled="submitBtnOpts.disabled || submitDisabled"
        :long="submitBtnOpts.long"
        :shape="submitBtnOpts.shape"
        @click="onSubmit"
        >{{ submitBtnOpts.text }}</Button
      >
      <slot name="submit-after"></slot>
      <template v-if="!currentOptions.btnPositionReverse">
        <slot name="reset-before"></slot>
        <Button
          v-if="resetBtnOpts"
          :class="resetBtnOpts.className"
          :style="
            _calWidth(resetBtnOpts.long ? '100%' : resetBtnOpts.width, 'btn')
          "
          :type="resetBtnOpts.type"
          :size="resetBtnOpts.size || currentOptions.size"
          :html-type="resetBtnOpts.htmlType"
          :ghost="resetBtnOpts.ghost"
          :loading="resetBtnOpts.loading || resetBtnLoading"
          :icon="resetBtnOpts.icon"
          :disabled="resetBtnOpts.disabled"
          :long="resetBtnOpts.long"
          :shape="resetBtnOpts.shape"
          @click="onReset"
          >{{ resetBtnOpts.text }}</Button
        >
        <slot name="reset-after"></slot>
      </template>
    </div>
  </Form>
</template>

<script>
import {
  typeOf,
  deepCopy,
  adaptNumberUnit,
  checkKeyHazyExist,
  checkIsDataCmp,
  operTypeZh,
  operTypeTrigger,
} from '../../utils/assist'
import { DateValueType, sizeRange } from '../../utils/constant'
import collect from '../../utils/collect'
import grid from './grid'
import VInput from '../field-components/v-input'
import VInputNumber from '../field-components/v-input-number'
import VSelect from '../field-components/v-select'
import VDatePicker from '../field-components/v-date-picker'
import VSwitch from '../field-components/v-switch'
import VAutoComplete from '../field-components/v-auto-complete'
import VHtml from '../field-components/v-html'
import VCascader from '../field-components/v-cascader'
import VUpload from '../field-components/v-upload'
import VButton from '../field-components/v-button'
import Time from '../../utils/time'
import findVm from '../../mixins/find-vm'
import cancelFocus from '../../mixins/cancel-focus'
import radioCheckbox from '../../mixins/radio-checkbox'

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
  'Html',
]

const actionDefaultOptions = {
  ghost: false,
  customIcon: false,
  width: 'auto',
  htmlType: 'button',
  long: false,
  loading: false,
  disabled: false,
}

const actionAlignRange = ['left', 'center', 'right']

const noChildComps = ['Checkbox', 'CheckboxGroup', 'RadioGroup']

const InputTypeRange = [
  'text',
  'tel',
  'integer',
  'number',
  'positiveInteger',
  'positiveNumber',
  'password',
  'textarea',
  'url',
  'email',
  'date',
]

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
    done: true,
  },
  resetBtn: {
    ...actionDefaultOptions,
    type: 'default',
    text: '重置',
    done: true,
  },
}

function getMax(colSpanList = []) {
  let max = 0
  colSpanList.forEach((span) => {
    if (span > max) {
      max = span
    }
  })
  return max
}
export default {
  name: 'VForm',
  mixins: [findVm, cancelFocus, radioCheckbox],
  props: {
    model: {
      type: Object,
      required: true,
    },
    options: {
      // 表单整体配置
      type: Object,
      validator({
        inline,
        columns = 1,
        colSpace = 0,
        actionAlign = 'left',
        submitBtn = {},
        resetBtn = {},
      } = {}) {
        // 检测表单整体配置
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
      type: Array,
      default() {
        return []
      },
      validator(val) {
        // 检测表单域配置
        let nameList = []
        val.forEach(
          ({
            component = '',
            name = '',
            type,
            rules,
            slot = '',
            returnDateType,
            action,
            contentSlot,
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
            if (
              component === 'Input' &&
              type &&
              !InputTypeRange.includes(type)
            ) {
              throw new RangeError(
                `Input组件的type属性不支持${InputTypeRange.join(
                  '、'
                )}以外的值！`
              )
            }
            if ((!name || nameList.includes(name)) && component !== 'Button') {
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

            if (
              component === 'Upload' &&
              (!action || typeOf(action) !== 'string' || !contentSlot)
            ) {
              throw new Error('请为Upload表单项设置action和contentSlot！')
            }

            if (rules && !Array.isArray(rules)) {
              throw new Error(`表单项的rules必需为Array类型！`)
            }
            name && nameList.push(name)
          }
        )

        return true
      },
    },
    dataSource: {
      // 表单每一项的数据源配置
      type: Object,
      default() {
        return {}
      },
    },
    submitDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      originFormValue: null,
      formRule: {},
      formDataSource: {},
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
      return merge(defaultOptions, { ...this.options })
    },
    nameField() {
      return collect.createObj(this.fields, 'name')
    },
    ruleFields() {
      return this.fields.map((field, index) => {
        let { required, rules = [], component, label = '', number } = field
        if (required) {
          let rule = {
            required: true,
            message: `请${operTypeZh(component)}${label}`,
          }
          if (
            (component === 'Input' || component === 'AutoComplete') &&
            !number
          ) {
            rule.trigger = operTypeTrigger(component)
          }
          rules.unshift(rule)
          delete field.required
          return { ...field, rules }
        }
        return { ...field }
      })
    },
    groupFields() {
      let groupInfo = {}
      let groupArr = []
      this.ruleFields.forEach((field, index) => {
        let group = field.group
        if (!group) {
          groupInfo[`${index}`] = [field]
          groupArr[index] = [field]
        } else {
          const existKey = checkKeyHazyExist(groupInfo, group)
          if (existKey) {
            const existKeyIndex = Number(existKey.split('-')[0])
            groupInfo[existKey].push(field)
            groupArr[existKeyIndex].push(field)
          } else {
            groupInfo[`${index}-${group}`] = [field]
            groupArr[index] = [field]
          }
        }
      })
      const result = groupArr
        .filter((item) => item)
        .map((item) => {
          if (item.length === 1) {
            return item[0]
          }
          return item
        })
      return result
    },
    gridFields() {
      // 生成网格布局的fields数据
      return grid.create(this.groupFields, this.currentOptions.columns)
    },
    colStyleInfo() {
      // 同一group中的表单域，公用colSpan，此colSpan为一组表单域中最大的那个colSpan
      let _this = this
      return this.gridFields.map((grid) => {
        return grid.map((col) => {
          let colSpanList = col.map((item) => {
            return parseFloat(item.colSpan) || 1
          })
          const multiple = colSpanList.length > 1
          let flex = getMax(colSpanList) / _this.currentOptions.columns
          flex = flex > 1 ? 1 : flex
          const percent = `${flex * 100}%`
          return {
            flex,
            style: { maxWidth: percent, minWidth: percent },
            multiple,
          }
        })
      })
    },
    submitBtnOpts() {
      return this.currentOptions.submitBtn
    },
    resetBtnOpts() {
      return this.currentOptions.resetBtn
    },
    actionPL() {
      if (this.currentOptions.inline) return 0
      let { labelWidth, actionAlign, labelPosition } = this.currentOptions
      let lastField = this.fields[this.fields.length - 1]
      if (actionAlign === 'left') {
        return labelPosition === 'top'
          ? 0
          : parseFloat(labelWidth) ||
              parseFloat(lastField ? lastField.labelWidth : 0)
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
    model: {
      immediate: true,
      handler(val) {
        if (!this.originFormValue) {
          this._setOriginValue(val)
        }
      },
    },
    fields: {
      immediate: true,
      handler(val) {
        this._setFormRule()
      },
      deep: true,
    },
    dataSource: {
      immediate: true,
      handler() {
        this._setDataSource()
      },
      deep: true,
    },
  },
  created() {
    this.refId = Math.random().toString().substr(-5)
  },
  mounted() {
    this._addRef()
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
          ({ name, component, type, falseValue = false, multiple = false }) => {
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
      this.originFormValue = result
    },
    _setFormRule() {
      this.ruleFields.forEach(({ rules = [], name } = {}) => {
        if (rules && rules.length) {
          this.formRule[name] = rules
        }
      })
    },
    _setDataSource() {
      for (let [name, field] of Object.entries(this.nameField)) {
        let { component, dropdownSlot, labelKey, valueKey } = field
        let data = this.dataSource[name]
        if (checkIsDataCmp(component)) {
          if (typeOf(data) !== 'array') {
            this.$set(this.formDataSource, [name], [])
          } else {
            // 表单项数据源
            let transData = data.map((dataItem) => {
              let label = dataItem.label
              let value = dataItem.value
              if (!label && !labelKey) {
                throw new Error(
                  `${component}表单项对应dataSource数据源中的数据的每一项需设置label属性或指定label的labelKey属性！`
                )
              }

              if (!value && typeOf(value) !== 'number' && !valueKey) {
                throw new Error(
                  `${component}表单项对应dataSource数据源中的数据的每一项需设置value属性或指定value的valueKey属性！`
                )
              }
              return {
                ...dataItem,
                label: labelKey ? dataItem[labelKey] : label,
                value: valueKey ? dataItem[valueKey] : value,
              }
            })
            this.$set(this.formDataSource, [name], transData)
          }
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
      }
    },
    _addRef() {
      let vm = this.findVm()
      for (let [key, ref] of Object.entries(this.$refs)) {
        if (Array.isArray(ref)) {
          if (noChildComps.includes(this.nameField[key].component)) {
            vm.$refs[`_${key}`] = ref[0]
          } else {
            vm.$refs[`_${key}`] = ref[0].$children[0]
          }
        }
      }
    },
    _dealNumber(item) {
      let valueNumber = parseFloat(this.model[item.name])
      if (isNaN(valueNumber)) {
        valueNumber = ''
      }
      this.model[item.name] = valueNumber
      if (item.onBlur) {
        this._dealEvent(item.onBlur, item)
      }
    },
    _dealEvent(fnName, ...rest) {
      if (!fnName) return
      let target = this.findVm()
      if (typeOf(fnName) === 'function') {
        fnName.bind(target)(...rest)
      }
      if (typeOf(fnName) === 'string') {
        let fn = target[fnName]
        if (typeOf(fn) === 'function') {
          target[fnName](...rest)
        }
      }
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
    _calColClass(col) {
      let { labelPosition } = this.currentOptions
      const noLabel = col.some((item) => {
        return (
          item.component !== 'Html' &&
          item.component !== 'Button' &&
          !item.slot &&
          !item.label
        )
      })
      if (labelPosition === 'top' && col.length > 1 && noLabel) {
        return 'col-flex-end'
      }
      return ''
    },
    _labelAppendStyle(label) {
      let { size } = this.currentOptions
      if (size === 'large') {
        return {
          left: (label.length - 1) * 16 + 20 + 'px',
        }
      }
      return {
        left: (label.length - 1) * 14 + 18 + 'px',
      }
    },
    _calFormItemSize({ size }) {
      const returnSize = size || this.currentOptions.size
      return sizeRange.includes(returnSize) ? returnSize : 'default'
    },
    onValidate(prop, status, error) {
      this.$emit('on-validate', prop, status, error)
    },
    onSubmit() {
      this.$refs[`form-${this.refId}`].validate((valid) => {
        if (valid) {
          this.submitBtnLoading = true
          this.$emit('on-submit', () => {
            this.submitBtnLoading = false
          })
        }
      })
    },
    onReset() {
      // 重置表单
      this.resetBtnLoading = this.resetBtnOpts.done
      this.resetFields()
      setTimeout(() => {
        this._cancelFocus('.v-form')
        this.$emit('update:model', deepCopy(this.originFormValue))
        this.$emit('on-reset', () => {
          this.resetBtnLoading = false
        })
      }, 50)
    },
    resetFields() {
      // 供外部使用
      this.$refs[`form-${this.refId}`].resetFields()
    },
    async validate(callback) {
      if (typeOf(callback) === 'function') {
        // 供外部使用
        this.$refs[`form-${this.refId}`].validate((valid) => {
          let target = this.findVm()
          callback.call(target, valid)
        })
      } else {
        return this.$refs[`form-${this.refId}`].validate()
      }
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
    VInput,
    VInputNumber,
    VSelect,
    VDatePicker,
    VSwitch,
    VAutoComplete,
    VHtml,
    VCascader,
    VUpload,
    VButton,
  },
}
</script>
