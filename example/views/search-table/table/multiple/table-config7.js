export default {
  border: true,
  rowKey: 'name',
  indentSize: 10,
  loadData: (item, callback) => {
    setTimeout(() => {
      const data = [
        {
          name: `子集${Math.random().toString().substring(1, 4)}`,
          age: 28,
          address: '新洲区',
          date: '2016-10-01',
          action: '操作子集',
          _loading: false,
          children: []
        }
      ]
      callback(data)
    }, 2000)
  },
  columns: [
    {
      title: 'Name',
      key: 'name',
      tree: true
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Action',
      slot: 'action',
      width: 220,
      align: 'center'
    }
  ]
}
