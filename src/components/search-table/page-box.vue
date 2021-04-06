<template>
  <div class="page-box" :class="currentPageConfig.className">
    <div class="page-prepend-content">
      <slot name="page-prepend"></slot>
    </div>
    <Page ref="page" :current="current" :total="total" :page-size="currentPageConfig.pageSize"
      :page-size-opts="currentPageConfig.pageSizeOpts" :placement="currentPageConfig.placement"
      :show-total="currentPageConfig.showTotal" :show-elevator="currentPageConfig.showElevator"
      :show-sizer="currentPageConfig.showSizer" :class-name="currentPageConfig.className"
      :styles="currentPageConfig.styles" :transfer="currentPageConfig.transfer" :prev-text="currentPageConfig.prevText"
      :next-text="currentPageConfig.nextText" @on-change="onChange" @on-page-size-change="onPageSizeChange" />
  </div>
</template>

<script>
import defaultConfig from './pageConfig'
export default {
  name: 'PageBox',
  props: {
    pageConfig: Object,
    total: Number
  },
  data () {
    return {
      current: 1,
      windowPageConfig: window.$CONFIG.searchTable.pageConfig
    }
  },
  computed: {
    currentPageConfig () {
      let pageConfig = { ...defaultConfig, ...this.windowPageConfig, ...this.pageConfig }
      let { pageSize, pageSizeOpts } = pageConfig
      if (!pageSizeOpts.includes(pageSize)) {
        pageConfig.pageSize = pageSizeOpts[0]
      }
      return pageConfig
    }
  },
  created () {
  },
  methods: {
    onChange (page) {
      this.current = page
      this.$emit('on-page-change', page)
      let config = this.currentPageConfig
      this.$emit('on-event', config.onChange, page, config)
    },
    onPageSizeChange (pageSize) {
      this.currentPageConfig.pageSize = pageSize
      this.$emit('on-page-size-change', pageSize)
      let config = this.currentPageConfig
      this.$emit('on-event', config.onPageSizeChange, pageSize, config)
    },
    changePage (page) {
      this.current = page
      this.$refs['page'].currentPage = page
    }
  }
}
</script>