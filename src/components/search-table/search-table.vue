<template>
  <div class="v-component v-search-table">
    <search-box v-if="currentSearchConfig.fields && currentSearchConfig.fields.length" ref="search-box" :fields="currentSearchConfig.fields" :options="currentSearchConfig.options"
      @on-search="dealSearch" @on-reset="dealReset" @on-event="dealEvent">
      <template v-slot:search-prepend="{ search }">
        <slot name="search-prepend" :search="search" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-for="slot in fieldSlotList" v-slot:[slot]="slotProps">
        <slot :name="slot" :search="slotProps.search" :field="slotProps.field" :label="slotProps.label"
          :value="slotProps.value" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:search-append="slotProps">
        <slot name="search-append" :search="slotProps.search" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:action-prepend="{ search }">
        <slot name="action-prepend" :search="search" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:action-append="{ search }">
        <slot name="action-append" :search="search" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
    </search-box>
    <table-box ref="table-box" :columns="currentTableConfig.columns" :data="tableData"
      :options="currentTableConfig.options" :loading="loading" @on-event="dealEvent">
      <template v-slot:table-prepend="slotProps">
        <slot name="table-prepend" :search="slotSearch()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-for="slot in tableSlotList" v-slot:[slot]="slotProps">
        <slot :name="slot" :row="slotProps.row" :index="slotProps.index" :column="slotProps.column"
          :search="slotSearch()" :page="pageSlot" :pageSize="pageSizeSlot">
        </slot>
      </template>
      <template v-slot:header>
        <slot name="header" :search="slotSearch()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:footer>
        <slot name="footer" :search="slotSearch()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:table-append="slotProps">
        <slot name="table-append" :search="slotSearch()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
    </table-box>
    <page-box ref="page-box" v-if="typeof total === 'number'" :page-config="pageConfig" :total="total" @on-page-change="dealPageChange"
      @on-page-size-change="dealPageSizeChange" @page-size-change="pageSizeChange" @on-event="dealEvent">
      <template v-slot:page-prepend="slotProps">
        <slot name="page-prepend" :search="slotSearch()" :page="page" :pageSize="pageSize"></slot>
      </template>
    </page-box>
  </div>
</template>

<script>
import { typeOf } from '../../utils/assist'
import searchBox from './search-box'
import tableBox from './table-box'
import pageBox from './page-box'
import findVm from '../../mixins/find-vm'
import defaultPageConfig from './pageConfig'

export default {
  name: 'SearchTable',
  props: {
    searchConfig: {
      type: Object,
      validator (val) {
        if (val.fields && typeOf(val.fields) !== 'array') {
          throw new TypeError('search-config中fields属性需为Array类型！')
        }
        if (val.btns && typeOf(val.btns) !== 'array') {
          throw new TypeError('search-config中btns属性需为Array类型！')
        }
        return true
      },
      default () {
        return {
          fields: []
        }
      }
    },
    tableConfig: {
      type: Object,
      default () {
        return {
          columns: []
        }
      }
    },
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    pageConfig: {
      type: Object,
      default () {
        return {
        }
      }
    },
    total: {
      type: Number
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mixins: [findVm],
  data () {
    return {
      page: 1,
      pageSize: 10,
      windowPageConfig: window.$CONFIG.searchTable.pageConfig
    }
  },
  computed: {
    fieldSlotList () {
      let result = []
      let fields = this.searchConfig.fields || []
      fields.forEach((field) => {
        let slotKeys = Object.keys(field).filter(key => key.toLowerCase().includes('slot'))
        slotKeys.forEach((key) => {
          result.push(field[key])
        })
      })
      return result
    },
    currentPageConfig () {
      let pageConfig = { ...defaultPageConfig, ...this.windowPageConfig, ...this.pageConfig }
      let { pageSize, pageSizeOpts } = pageConfig
      if (!pageSizeOpts.includes(pageSize)) {
        pageConfig.pageSize = pageSizeOpts[0]
      }
      return pageConfig
    },
    currentTableConfig () {
      let { columns = [], ...options } = this.tableConfig
      columns.forEach((item) => {
        if (item.type === 'expand' && item.slot && typeOf(item.slot) === 'string') {
          item.render = (h, params) => {
            return h('div', [
              this.$scopedSlots[item.slot]({
                row: params.row,
                index: params.index
              })
            ])
          }
        }
      })
      if (options.draggable && columns[0] && columns[0].slot !== 'draggable') {
        columns.unshift({
          width: 60,
          title: ' ',
          className: 'draggable-col',
          align: 'center',
          slot: 'draggable'
        })
      }
      return {
        columns,
        options
      }
    },
    currentSearchConfig () {
      let { fields, ...options } = this.searchConfig
      return {
        fields,
        options
      }
    },
    tableSlotList () {
      let result = []
      let columns = this.tableConfig.columns || []
      let getSlot = (columns, result) => {
        columns.forEach((column) => {
          if (Object.keys(column).includes('slot')) {
            result.push(column.slot)
          }
          let children = column.children || []
          if (children.length) {
            getSlot(children, result)
          }
        })
      }
      getSlot(columns, result)
      return result
    },
    pageSlot () {
      return typeof this.total === 'number' ? this.page : ''
    },
    pageSizeSlot () {
      return typeof this.total === 'number' ? this.pageSize : ''
    }
  },
  watch: {
    currentPageConfig (val) {
      this.pageSize = val.pageSize || 10
    }
  },
  created () {
    this.pageSize = this.currentPageConfig.pageSize
  },
  mounted () {
    let vm = this.findVm()
    vm.$refs['_search-box'] = this.$refs['search-box']
    vm.$refs['_table-box'] = this.$refs['table-box']
    vm.$refs['_page-box'] = this.$refs['page-box']
  },
  methods: {
    slotSearch () {
      return this.$refs['search-box'] && this.$refs['search-box'].search || {}
    },
    dealSearch (search, done, page = 1, eventType = 'search') { // 搜索
      let pageBox = this.$refs['page-box']
      pageBox && pageBox.changePage(page)
      if (pageBox) {
        this.$emit('on-search', search, page, pageBox.currentPageConfig.pageSize, done, eventType)
      } else {
        this.$emit('on-search', search, 1, 0, done, eventType)
      }
    },
    dealReset (search, page = 1) {
      let pageBox = this.$refs['page-box']
      if (pageBox) {
        this.$emit('on-reset', search, page, pageBox.currentPageConfig.pageSize)
      } else {
        this.$emit('on-reset', search, 1, 0)
      }
    },
    dealEvent (fnName, ...rest) {
      let target = this.findVm()
      let pageBox = this.$refs['page-box']
      let params = []
      if (pageBox) {
        params = rest.concat(this.$refs['search-box'] && this.$refs['search-box'].search || {}, pageBox.current, pageBox.currentPageConfig.pageSize)
      } else {
        params = rest.concat(this.$refs['search-box'] && this.$refs['search-box'].search || {}, 1, 0)
      }
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
    dealPageChange (page) {
      this.page = page
      this.dealSearch(this.$refs['search-box'] && this.$refs['search-box'].search || {}, () => { }, page, 'pageChange')
    },
    dealPageSizeChange () {
      this.dealSearch(this.$refs['search-box'] && this.$refs['search-box'].search || {}, () => { }, 1, 'pageSizeChange')
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
    },
    search () {
      this.$refs['search-box'] && this.$refs['search-box'].onSearch()
    },
    reset () {
      this.$refs['search-box'] && this.$refs['search-box'].onReset()
    },
    changePage (page = 1) {
      this.$refs['page-box'] && this.$refs['page-box'].changePage(page)
    },
    changePageSize (pageSize) {
      this.$refs['page-box'] && this.$refs['page-box'].changePageSize(pageSize)
    }
  },
  components: {
    searchBox,
    tableBox,
    pageBox
  }
}
</script>