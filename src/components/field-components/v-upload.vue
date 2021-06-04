<template>
  <Upload :style="item.style" :action="item.action" :headers="item.headers" :type="item.type"
    :accept="item.accept" :format="item.format" :max-size="item.maxSize"
    :multiple="item.multiple" :paste="item.paste"
    :webkitdirectory="item.webkitdirectory" :disabled="item.disabled"
    :data="item.data" :name="item.name" :with-credentials="item.withCredentials"
    :show-upload-list="item.showUploadList"
    :default-file-list="item.defaultFileList"
    :before-upload="!item.beforeUpload ? () => { return true } : (file) => { return dealReturnEvent(item.beforeUpload, file, item) }"
    :on-progress="(event, file, fileList) => { dealEvent(item.onProgress, event, file, fileList, item) }"
    :on-success="(response, file, fileList) => { dealEvent(item.onSuccess, response, file, fileList, item) }"
    :on-error="(error, file, fileList) => { dealEvent(item.onError, error, file, fileList, item) }"
    :on-preview="(file) => { dealEvent(item.onPreview, file, item) }"
    :on-remove="(file, fileList) => { dealEvent(item.onRemove, file, fileList, item) }"
    :on-format-error="(file, fileList) => { dealEvent(item.onformatError, file, fileList, item) }"
    :on-exceeded-size="(file, fileList) => { dealEvent(item.onExceededSize, file, fileList, item) }">
    <slot></slot>
  </Upload>
</template>

<script>
import commonMixins from './common-mixins'
import { typeOf } from '../../utils/assist'
export default {
  name: 'VUpload',
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
