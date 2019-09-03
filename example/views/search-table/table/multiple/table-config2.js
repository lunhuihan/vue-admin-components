export default {
  border: true,
  onExpand(row, status) {
    console.log(row)
    console.log(status)
    console.log(this)
  },
  columns: [
    {
      type: 'expand',
      width: 50,
      slot: 'expand'
    },
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
