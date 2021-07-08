<template>
  <div class="table-box">
    <!-- prepend插槽 -->
    <slot name="table-prepend"></slot>
    <Table ref="table" :class="options.className" :width="options.width"
      :height="options.height" :columns="calColumns(columns)" :data="data"
      :stripe="typeOf(options.stripe) === 'boolean' ? options.stripe : true"
      :border="typeOf(options.border) === 'boolean' ? options.border : true"
      :row-class-name="(row, index) => { return dealReturnEvent(options.rowClassName, row, index) }"
      :loading="loading" :show-header="options.showHeader"
      :max-height="options.maxHeight" :disabled-hover="options.disabledHover"
      :highlight-row="options.highlightRow" :size="options.size"
      :no-data-text="options.noDataText"
      :no-filtered-data-text="options.noFilteredDataText"
      :draggable="options.draggable" :tooltip-theme="options.tooltipTheme"
      :row-key="options.rowKey" :indent-size="options.indentSize"
      :load-data="(item, callback) => { dealEvent(options.loadData, item, callback) }"
      @on-current-change="(currentRow, oldCurrentRow) => { dealEvent(options.onCurrentChange, currentRow, oldCurrentRow) }"
      @on-drag-drop="(index1, index2) => { dealEvent(options.onDragDrop, index1, index2) }"
      @on-select="(selection, row) => { dealEvent(options.onSelect, selection, row) }"
      @on-select-cancel="(selection, row) => { dealEvent(options.onSelectCancel, selection, row) }"
      @on-select-all="(selection) => { dealEvent(options.onSelectAll, selection) }"
      @on-select-all-cancel="(selection) => { dealEvent(options.onSelectAllCancel, selection) }"
      @on-selection-change="(selection) => { dealEvent(options.onSelectionChange, selection) }"
      @on-sort-change="({column, key, order}) => { dealSortChangeEvent(options.onSortChange, column, key, order) }"
      @on-filter-change="(column) => { dealEvent(options.onFilterChange, column) }"
      @on-row-click="(row, index) => { dealEvent(options.onRowClick, row, index) }"
      @on-row-dblclick="(row, index) => { dealEvent(options.onRowDblclick, row, index) }"
      @on-expand="(row, index) => { dealEvent(options.onExpand, row, index) }">
      <template v-for="slot in tableSlotList"
        slot-scope="{ row, column, index }" :slot="slot">
        <slot :name="slot" :row="row" :column="column" :index="index"></slot>
      </template>
      <template slot="header">
        <slot name="header"></slot>
      </template>
      <template slot="footer">
        <slot name="footer"></slot>
      </template>
      <template slot-scope="{ row }" slot="draggable">
        <Icon type="ios-menu" />
      </template>
    </Table>
    <!-- append插槽 -->
    <slot name="table-append"></slot>
  </div>
</template>

<script>
import { typeOf } from '../../utils/assist'
import findVm from '../../mixins/find-vm'
const sortTypeRange = ['asc', 'desc']
export default {
  name: 'TableBox',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [findVm],
  data() {
    return {
      typeOf: typeOf,
    }
  },
  computed: {
    tableSlotList() {
      let result = []
      let columns = this.columns || []
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
  },
  created() {},
  mounted() {
    this.addRef()
  },
  methods: {
    addRef() {
      let refName = this.options.name
      if (refName) {
        let vm = this.findVm()
        vm.$refs[refName] = this.$refs[refName]
      }
    },
    calColumns() {
      let vm = this.findVm()
      return this.columns.map((column) => {
        let result = {}
        let { filters, filteredValue, sortType = '', filterRemote } = column
        if (filters && typeOf(filters) === 'string') {
          result.filters = vm[filters]
        }
        if (filteredValue && typeOf(filteredValue) === 'string') {
          result.filteredValue = vm[filteredValue]
        }
        if (sortType && !sortTypeRange.includes(sortType)) {
          result.sortType = vm[sortType]
        }
        if (filterRemote) {
          result.filterRemote = (...rest) => {
            if (!rest[0].length) {
              if (column.filteredValue) {
                delete column.filteredValue
              }
            } else {
              column.filteredValue = rest[0]
            }
            if (typeOf(filterRemote) === 'string') {
              let fn = vm[filterRemote]
              if (typeOf(fn) === 'function') {
                return vm[filterRemote](...rest)
              }
            }
            if (typeOf(filterRemote) === 'function') {
              filterRemote.bind(vm)(...rest)
            }
          }
        }
        return { ...column, ...result }
      })
    },
    dealEvent(fnName, ...rest) {
      if (!fnName) return
      this.$emit('on-event', fnName, ...rest)
    },
    dealSortChangeEvent(fnName, ...rest) {
      if (!fnName) return
      this.$emit('on-event', fnName, ...rest)
      const keyName = rest[0].key ? 'key' : 'slot'
      const keyValue = rest[0].key || rest[0].slot
      this.columns.forEach((column) => {
        if (column[keyName] === keyValue) {
          column.sortType = rest[2]
        }
      })
    },
    dealReturnEvent(fnName, ...rest) {
      if (!fnName) return
      let target = this.findVm()
      if (typeOf(fnName) === 'function') {
        return fnName.bind(target)(...rest)
      }
      if (typeOf(fnName) === 'string') {
        let fn = target[fnName]
        if (typeOf(fn) === 'function') {
          return target[fnName](...rest)
        }
      }
    },
  },
}
</script>
