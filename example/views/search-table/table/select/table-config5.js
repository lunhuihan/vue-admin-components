export default {
  border: true,
  onSelect (selection, row) {
    console.log(selection)
    console.log(row)
  },
  onSelectAll (selection) {
    console.log(selection)
  },
  onSelectionChange(selection) {
    console.log(selection)
  },
  columns: [
    {
      type: 'selection',
      width: 50,
      align: 'center'
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
