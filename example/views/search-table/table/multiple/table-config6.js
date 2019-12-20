export default {
  border: true,
  columns: [
    {
      title: '表格分组父级',
      align: 'center',
      children: [
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          minWidth: 100
        },
        {
          title: '金额',
          slot: 'amt',
          align: 'center',
          minWidth: 100
        }
      ]
    }
  ]
}
