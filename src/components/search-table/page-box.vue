<template>
  <div class="page-box" :class="currentPageConfig.className">
    <div class="page-prepend-content">
      <slot name="page-prepend"></slot>
    </div>
    <Page :current="current" :total="total" :page-size="currentPageSize"
      :page-size-opts="currentPageConfig.pageSizeOpts" :placement="currentPageConfig.placement"
      :show-total="currentPageConfig.showTotal" :show-elevator="currentPageConfig.showElevator"
      :show-sizer="currentPageConfig.showSizer" :class-name="currentPageConfig.className"
      :styles="currentPageConfig.styles" :transfer="currentPageConfig.transfer" :prev-text="currentPageConfig.prevText"
      :next-text="currentPageConfig.nextText" @on-change="onChange" @on-page-size-change="onPageSizeChange" />
  </div>
</template>

<script>
export default {
  name: 'PageBox',
  props: {
    pageConfig: Object,
    total: Number
  },
  data () {
    return {
      current: 1,
      defaultConfig: {
        pageSize: 10,
        pageSizeOpts: [10, 20, 30, 40],
        placement: 'bottom',
        simple: false,
        showTotal: true,
        showElevator: true,
        showSizer: true,
        className: '',
        styles: {},
        transfer: false,
        prevText: '',
        nextText: ''
      },
      windowPageConfig: window.$CONFIG.searchTable.pageConfig
    }
  },
  computed: {
    currentPageConfig () {
      return { ...this.defaultConfig, ...this.windowPageConfig, ...this.pageConfig }
    },
    currentPageSize () {
      let { pageSize, pageSizeOpts } = this.currentPageConfig
      if (pageSizeOpts.includes(pageSize)) {
        return pageSize
      }
      return pageSizeOpts[0]
    }
  },
  created () { },
  methods: {
    onChange (page) {
      let config = this.currentPageConfig
      this.$emit('on-page-change', page)
      this.$emit('on-event', config.onChange, page, config)
    },
    onPageSizeChange (pageSize) {
      this.currentPageConfig.pageSize = pageSize
      let config = this.currentPageConfig
      this.current === 1 && this.$emit('on-page-size-change')
      this.$emit('on-event', config.onPageSizeChange, pageSize, config)
    },
    changePage (page) {
      this.current = page
    }
  }
}
</script>