export default {
  onRowClick (row, index, page, pageSize) {
    console.log('-------')
    console.log(row)
    console.log(index)
    console.log(page)
    console.log(pageSize)
    console.log('-------')
  },
  onRowDblclick(row, index, search) {
    console.log('row:', row)
    console.log('index:', index)
    console.log('search:', search)
  },
  highlightRow: true,
  onCurrentChange(currentRow, oldCurrentRow) {
    console.log('currentRow:', currentRow)
    console.log('oldCurrentRow:', oldCurrentRow)
  },
  onSelect(selection, row, search) {
    /* console.log('selection:', selection)
    console.log('row:', row)
    console.log('search:', search) */
  },
  onSelectionChange () {
    console.log(this.$options.name)
  },
  onFilterChange (column, search) {
    console.log('column:', column)
    console.log('search:', search)
  },
  rowClassName (row, index, search) {
    console.log('search:', search)
    if (index === 1) {
      return 'demo-table-info-row'
    } else if (index === 3) {
      return 'demo-table-error-row'
    }
    return ''
  },
  columns: [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age',
      filters: [
        {
          label: '小于25岁',
          value: 1
        },
        {
          label: '大于等于25岁',
          value: 2
        }
      ],
      filterMultiple: false,
      filterMethod(value, row, search) {
        if (value === 1) {
          return row.age < 25
        } else if (value === 2) {
          return row.age >= 25
        }
      }
    },
    {
      title: 'Address',
      key: 'address'
    }
  ]
}
