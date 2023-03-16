<template>
  <div class="v-component v-search-table">
    <search-box
      v-if="hasSearch"
      ref="search-box"
      :search="model"
      :fields="currentSearchConfig.fields"
      :options="currentSearchConfig.options"
      @on-search="dealSearch"
      @on-reset="dealReset"
      @on-event="dealEvent"
      @on-fold-toggle="onFoldToggle"
      @update-search="updateSearch"
    >
      <template v-slot:search-prepend>
        <div class="search-prepend-box">
          <slot
            name="search-prepend"
            :page="pageSlot"
            :pageSize="pageSizeSlot"
          ></slot>
        </div>
      </template>
      <template v-for="slot in fieldSlotList" v-slot:[slot]="slotProps">
        <slot
          :name="slot"
          :field="slotProps.field"
          :label="slotProps.label"
          :value="slotProps.value"
          :page="pageSlot"
          :pageSize="pageSizeSlot"
        ></slot>
      </template>
      <template v-slot:search-append="slotProps">
        <div class="search-append-box">
          <slot
            name="search-append"
            :page="pageSlot"
            :pageSize="pageSizeSlot"
          ></slot>
        </div>
      </template>
      <template v-slot:action-prepend>
        <div class="action-prepend-box">
          <slot
            name="action-prepend"
            :page="pageSlot"
            :pageSize="pageSizeSlot"
          ></slot>
        </div>
      </template>
      <template v-slot:action-append>
        <div class="action-append-box">
          <slot
            name="action-append"
            :page="pageSlot"
            :pageSize="pageSizeSlot"
          ></slot>
        </div>
      </template>
    </search-box>
    <table-box
      ref="table-box"
      :columns="currentTableConfig.columns"
      :data="tableData"
      :options="currentTableConfig.options"
      :loading="loading"
      @on-event="dealEvent"
    >
      <template v-slot:table-prepend="slotProps">
        <slot
          name="table-prepend"
          :page="pageSlot"
          :pageSize="pageSizeSlot"
        ></slot>
      </template>
      <template v-for="slot in tableSlotList" v-slot:[slot]="slotProps">
        <slot
          :name="slot"
          :row="slotProps.row"
          :index="slotProps.index"
          :column="slotProps.column"
          :page="pageSlot"
          :pageSize="pageSizeSlot"
        >
        </slot>
      </template>
      <template v-slot:header>
        <slot name="header" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:footer>
        <slot name="footer" :page="pageSlot" :pageSize="pageSizeSlot"></slot>
      </template>
      <template v-slot:table-append="slotProps">
        <slot
          name="table-append"
          :page="pageSlot"
          :pageSize="pageSizeSlot"
        ></slot>
      </template>
    </table-box>
    <page-box
      ref="page-box"
      v-if="hasPage"
      :page-config="pageConfig"
      :total="total"
      @on-page-change="dealPageChange"
      @on-page-size-change="dealPageSizeChange"
      @on-event="dealEvent"
    >
      <template v-slot:page-prepend="slotProps">
        <slot name="page-prepend" :page="page" :pageSize="pageSize"></slot>
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
    model: {
      type: Object,
      default() {
        return {}
      },
    },
    searchConfig: {
      type: Object,
      validator(val) {
        if (val.fields && typeOf(val.fields) !== 'array') {
          throw new TypeError('search-config中fields属性需为Array类型！')
        }
        if (val.btns && typeOf(val.btns) !== 'array') {
          throw new TypeError('search-config中btns属性需为Array类型！')
        }
        return true
      },
      default() {
        return {
          fields: [],
        }
      },
    },
    tableConfig: {
      type: Object,
      default() {
        return {
          columns: [],
        }
      },
    },
    tableData: {
      type: Array,
      default() {
        return []
      },
    },
    pageConfig: {
      type: Object,
      default() {
        return {}
      },
    },
    total: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [findVm],
  data() {
    return {
      page: 1,
      pageSize: 10,
    }
  },
  computed: {
    hasSearch() {
      return (
        this.currentSearchConfig.fields &&
        this.currentSearchConfig.fields.length
      )
    },
    hasPage() {
      return typeof this.total === 'number'
    },
    fieldSlotList() {
      let result = []
      let fields = this.searchConfig.fields || []
      fields.forEach((field) => {
        let slotKeys = Object.keys(field).filter((key) =>
          key.toLowerCase().includes('slot')
        )
        slotKeys.forEach((key) => {
          result.push(field[key])
        })
      })
      return result
    },
    currentTableConfig() {
      let { columns = [], ...options } = this.tableConfig
      columns = columns.filter(({ hidden } = {}) => !hidden)
      columns.forEach((item) => {
        if (
          item.type === 'expand' &&
          item.slot &&
          typeOf(item.slot) === 'string'
        ) {
          item.render = (h, params) => {
            return h('div', [
              this.$scopedSlots[item.slot]({
                row: params.row,
                index: params.index,
              }),
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
          slot: 'draggable',
        })
      }
      return {
        columns,
        options,
      }
    },
    currentSearchConfig() {
      let { fields, ...options } = this.searchConfig
      return {
        fields,
        options: { searchBtn: true, resetBtn: true, ...options },
      }
    },
    tableSlotList() {
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
    pageSlot() {
      return typeof this.total === 'number' ? this.page : ''
    },
    pageSizeSlot() {
      return typeof this.total === 'number' ? this.pageSize : ''
    },
  },
  created() {},
  mounted() {
    if (this.hasPage) {
      this.pageSize = this.$refs['page-box'].currentPageConfig.pageSize
    }
  },
  methods: {
    dealSearch(done = () => {}, page = 1, eventType = 'search') {
      // 搜索
      let pageBox = this.$refs['page-box']
      pageBox && pageBox.changePage(page)
      if (pageBox) {
        this.page = page
        this.pageSize = pageBox.currentPageConfig.pageSize
        this.$emit(
          'on-search',
          page,
          pageBox.currentPageConfig.pageSize,
          done,
          eventType
        )
      } else {
        this.$emit('on-search', 1, 0, done, eventType)
      }
    },
    dealReset(page = 1) {
      let pageBox = this.$refs['page-box']
      if (pageBox) {
        this.page = page
        this.pageSize = pageBox.currentPageConfig.pageSize
        this.$emit('on-reset', page, pageBox.currentPageConfig.pageSize)
      } else {
        this.$emit('on-reset', 1, 0)
      }
    },
    dealEvent(fnName, ...rest) {
      let target = this.findVm()
      let pageBox = this.$refs['page-box']
      let params = []
      if (pageBox) {
        params = rest.concat(
          pageBox.current,
          pageBox.currentPageConfig.pageSize
        )
      } else {
        params = rest.concat(1, 0)
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
    onFoldToggle(fold) {
      this.searchConfig.fold = fold
      this.$emit('on-fold-toggle', fold)
    },
    dealPageChange(page) {
      this.page = page
      this.dealSearch(() => {}, page, 'pageChange')
    },
    dealPageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.dealSearch(() => {}, 1, 'pageSizeChange')
    },
    updateSearch(val) {
      this.$emit('update:model', val)
    },
    clearCurrentRow() {
      // 表格methods
      this.$refs['table-box'].$refs.table.clearCurrentRow()
    },
    selectAll() {
      // 表格methods
      this.$refs['table-box'].$refs.table.selectAll()
    },
    search() {
      if (this.hasSearch) {
        this.$refs['search-box'].onSearch()
      } else {
        this.dealSearch()
      }
    },
    reset() {
      if (this.hasSearch) {
        this.$refs['search-box'].onReset()
      } else {
        this.dealSearch()
        this.dealReset()
      }
    },
  },
  components: {
    searchBox,
    tableBox,
    pageBox,
  },
}
</script>
