<template>
  <Input v-model.trim="formValue[item.name]"
    :style="calFieldWidth(item)" :class="calFieldClass(item)" :type="item.type"
    :number="item.number" :placeholder="item.placeholder" :size="calFieldSize(item)"
    :clearable="calClear(item)" :disabled="calFieldDisabled(item)"
    :readonly="calReadonly(item)" :maxlength="item.maxlength" :icon="item.icon"
    :search="item.search" :enter-button="item.enterButton"
    :autofocus="item.autofocus" :element-id="item.elementId"
    :autocomplete="item.autocomplete || 'off'" :rows="item.rows"
    :border="item.border" :show-word-limit="item.showWordLimit"
    :password="item.password"
    @on-enter="() => { dealEvent(item.onEnter, item) }"
    @on-click="() => { dealEvent(item.onClick, item) }"
    @on-change="(val) => { dealEvent(item.onChange, val, item) }"
    @on-focus="() => { dealEvent(item.onFocus, item) }"
    @on-blur="() => { dealEvent(item.onBlur, item) }"
    @on-keyup="(val) => { dealEvent(item.onKeyup, val, item) }"
    @on-keydown="(val) => { dealEvent(item.onKeydown, val, item) }"
    @on-keypress="(val) => { dealEvent(item.onKeypress, val, item) }"
    @on-clear="() => { dealEvent(item.onClear, item) }"
    @on-search="(val) => { dealEvent(item.onSearch, val, item) }">
  <!-- 前置slot -->
  <template v-slot:prepend
    v-if="(!item.type || item.type === 'text') && item.prependSlot">
    <slot name="prepend">
    </slot>
  </template>
  <!-- 后置slot -->
  <template v-slot:append
    v-if="(!item.type || item.type === 'text') && item.appendSlot">
    <slot name="append">
    </slot>
  </template>
  <!-- 前置图标 -->
  <Icon v-if="item.prefix" :type="item.prefix" slot="prefix" />
  <!-- 后置图标 -->
  <Icon v-if="item.suffix" :type="item.suffix" slot="suffix"
    @click.native="() => { dealEvent(item.onClick, item) }" />
  </Input>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VInput',
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
  methods: {
  },
}
</script>
