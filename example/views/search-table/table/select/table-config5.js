export default {
  border: true,
  onSelect (selection, row, search) { 
    console.log(selection)
    console.log(row)
    console.log(search)
  },
  onSelectAll (selection, search) { 
    console.log(selection)
    console.log(search)
  },
  onSelectionChange(selection, search) { 
    console.log(selection)
    console.log(search)
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
