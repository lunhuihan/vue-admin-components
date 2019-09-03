export default {
  border: true,
  columns: [
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
      filteredValue: [1],
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
