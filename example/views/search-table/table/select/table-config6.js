export default {
  border: true,
  columns: [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Age',
      key: 'age',
      filters: [
        {
          label: '小于25岁',
          value: 1,
        },
        {
          label: '大于等于25岁',
          value: 2,
        },
        {
          label: '大于等于30岁',
          value: 3,
        },
      ],
      // filterMultiple: false,
      // filteredValue: 'filteredValue',
      filterRemote: 'getData'
    },
    {
      title: 'Address',
      key: 'address',
    },
  ],
}
