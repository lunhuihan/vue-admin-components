export default {
  columns: [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address',
      tooltip: true
    },
    {
      title: '操作',
      slot: 'action'
    }
  ],
  stripe: false,
  border: true,
  showHeader: true,
  maxHeight: 300,
  disabledHover: true,
  highlightRow: true,
  noDataText: '暂无数据',
  noFilteredDataText: '无数据',
  rowClassName(row, index) {
    if (index === 1) {
      return 'demo-table-info-row'
    } else if (index === 3) {
      return 'demo-table-error-row'
    }
    return ''
  },
  onDragDrop(index1, index2) {
    console.log(index1)
    console.log(index2)
  },
  onCurrentChange: 'onCurrentChange'
}