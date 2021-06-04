<template>
  <Button :type="item.type" :style="calFieldStyle(item, 'auto')"
    :class="calFieldClass(item)" :ghost="item.ghost" :size="calFieldSize(item)"
    :shape="item.shape" :long="item.long" :html-type="item.htmlType"
    :disabled="item.disabled" :loading="item.loading" :icon="item.icon"
    :custom-icon="item.customIcon" :to="item.to" :replace="item.replace"
    :target="item.target" :append="item.append"
    @click="() => { dealEvent(item.onClick, item) }">
    <template v-if="item.contentSlot">
      <slot></slot>
    </template>
    <template v-else>
      {{item.text}}
    </template>
  </Button>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VButton',
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
