export default {
  border: true,
  onSortChange (column, key, order, current, pageSize) {
    this.tableData2 = [
      {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      },
      {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      },
      {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      },
      {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      }
    ]
    console.log('current:', current)
    console.log('pageSize:', pageSize)
  },
  columns: [
    {
      title: 'Name',
      key: 'name',
      sortable: 'custom'
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
