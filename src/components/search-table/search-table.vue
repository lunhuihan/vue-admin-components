<template>
  <div class="v-component v-search-table">
    <search-box v-if="hasSearch" ref="search-box" :fields="currentSearchConfig.fields" :options="currentSearchConfig.options"
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
        <slot name="table-prepend" :search="getSearchValue()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-for="slot in tableSlotList" v-slot:[slot]="slotProps">
        <slot :name="slot" :row="slotProps.row" :index="slotProps.index" :column="slotProps.column"
          :search="getSearchValue()" :page="pageSlot" :pageSize="pageSizeSlot">
        </slot>
      </template>
      <template v-slot:header>
        <slot name="header" :search="getSearchValue()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:footer>
        <slot name="footer" :search="getSearchValue()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:table-append="slotProps">
        <slot name="table-append" :search="getSearchValue()" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
    </table-box>
    <page-box ref="page-box" v-if="hasPage" :page-config="pageConfig" :total="total" @on-page-change="dealPageChange"
      @on-page-size-change="dealPageSizeChange" @on-event="dealEvent">
      <template v-slot:page-prepend="slotProps">
        <slot name="page-prepend" :search="getSearchValue()" :page="page" :pageSize="pageSize"></slot>
      </template>
    </page-box>
  </div>
</template>

<script>
import { typeOf, deepCopy } from '../../utils/assist'
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
      pageSize: 10
    }
  },
  computed: {
    hasSearch () {
      return this.currentSearchConfig.fields && this.currentSearchConfig.fields.length
    },
    hasPage () {
      return typeof this.total === 'number'
    },
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
  created () {
  },
  mounted () {
    let vm = this.findVm()
    vm.$refs['_search-box'] = this.hasSearch ? this.$refs['search-box'] : ''
    vm.$refs['_table-box'] = this.$refs['table-box']
    vm.$refs['_page-box'] = this.hasPage ? this.$refs['page-box'] : ''
    if (this.hasPage) {
      this.pageSize = this.$refs['page-box'].currentPageConfig.pageSize
    }
  },
  methods: {
    dealSearch (search = {}, done = () => {}, page = 1, eventType = 'search') { // 搜索
      let pageBox = this.$refs['page-box']
      pageBox && pageBox.changePage(page)
      if (pageBox) {
        this.page = page
        this.pageSize = pageBox.currentPageConfig.pageSize
        this.$emit('on-search', search, page, pageBox.currentPageConfig.pageSize, done, eventType)
      } else {
        this.$emit('on-search', search, 1, 0, done, eventType)
      }
    },
    dealReset (search = {}, page = 1) {
      let pageBox = this.$refs['page-box']
      if (pageBox) {
        this.page = page
        this.pageSize = pageBox.currentPageConfig.pageSize
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
        params = rest.concat(this.getSearchValue(), pageBox.current, pageBox.currentPageConfig.pageSize)
      } else {
        params = rest.concat(this.getSearchValue(), 1, 0)
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
      this.dealSearch(this.getSearchValue(), () => { }, page, 'pageChange')
    },
    dealPageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.dealSearch(this.getSearchValue(), () => { }, 1, 'pageSizeChange')
    },
    search () {
      if (this.hasSearch) {
        this.$refs['search-box'].onSearch()
      } else {
        this.dealSearch()
      }
    },
    reset () {
      if (this.hasSearch) {
        this.$refs['search-box'].onReset()
      } else {
        this.dealSearch()
        this.dealReset()
      }
    },
    getSearchValue () {
      if (this.hasSearch) {
        return deepCopy(this.$refs['search-box'].search)
      }
      return {}
    }
  },
  components: {
    searchBox,
    tableBox,
    pageBox
  }
}
</script>
