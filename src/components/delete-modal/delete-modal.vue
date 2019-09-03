<template>
  <Modal v-model="visible" :title="title" class-name="v-modal delete-modal" :mask-closable="false" :footer-hide="true" width="400"
    @on-visible-change="visibleChange">
    <div class="delete-tip">{{content}}</div>
    <Button type="error" long size="large" @click="sure">删除</Button>
  </Modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  created () {
  },
  methods: {
    openModal () {
      this.visible = true
    },
    visibleChange (val) {
      !val && this.$emit('close')
    },
    sure () {
      this.visible = false
      this.$emit('delete')
    }
  },
  components: {
  }
}
</script>