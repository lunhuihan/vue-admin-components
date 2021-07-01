export default {
  border: true,
  rowClassName (row, index) {
    if (index === 1) {
      return 'demo-table-info-row'
    } else if (index === 3) {
      return 'demo-table-error-row'
    }
    return ''
  },
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
      key: 'address'
    }
  ]
}
