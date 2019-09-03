export default {
  border: true,
  draggable: true,
  onDragDrop (index1, index2, search) { 
    let oldData = this.tableData5[index1]
    let newData = this.tableData5[index2]
    this.$set(this.tableData5, index1, newData)
    this.$set(this.tableData5, index2, oldData)
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
