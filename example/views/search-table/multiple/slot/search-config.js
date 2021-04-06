export default {
  fieldWidth: 200,
  labelWidth: 70,
  fields: [
    {
      name: 'date',
      component: 'DatePicker',
      type: 'daterange',
      label: '选择日期',
      value: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),new Date()],
      options: {
        shortcuts: [
          {
            text: '最近三天',
            value() {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              return [start, end]
            }
          },
          {
            text: '最近一周',
            value() {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          }
        ]
      }
    },
    {
      name: 'type',
      component: 'Select',
      label: '类型',
      clearable: true,
      data: [
        {
          label: '充值',
          value: 0
        },
        {
          label: '提现',
          value: 1
        },
        {
          label: '付款',
          value: 2
        },
        {
          label: '收款',
          value: 3
        }
      ]
    },
    {
      name: 'status',
      component: 'Select',
      label: '状态',
      clearable: true,
      data: [
        {
          label: '处理中',
          value: 0
        },
        {
          label: '处理成功',
          value: 1
        },
        {
          label: '处理失败',
          value: 2
        }
      ]
    },
    {
      name: 'user',
      label: '自定义label',
      slot: 'user'
    }
  ]
}
