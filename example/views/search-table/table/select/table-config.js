export default {
  border: true,
  onSortChange (column, key, order) {
    let orderDesc = order === 'normal' ? '' : order
    this.getData(`${column.slot}Order`, orderDesc.toUpperCase())
  },
  columns: [
    {
      title: 'Name',
      key: 'name',
      sortable: true
    },
    {
      title: 'Age',
      key: 'age',
      sortable: true
    },
    {
      title: 'Address',
      key: 'address'
    }
  ]
}
