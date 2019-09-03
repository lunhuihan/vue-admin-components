export default {
  labelWidth: '70',
  fieldWidth: '200',
  fold: true,
  fields: [
    {
      name: 'birthday',
      component: 'DatePicker',
      type: 'date',
      label: '日期',
      labelWidth: 50,
      value: '20190816'
    },
    {
      name: 'daterange',
      component: 'DatePicker',
      type: 'daterange',
      label: '日期范围',
      options: {
        shortcuts: [
          {
            text: '最近一周',
            value () {
              let today = new Date()
              let lastWeek = new Date(today - 1000 * 3600 * 24 * 7)
              return [lastWeek, today]
            }
          }
        ]
      }
    },
    {
      name: 'splitPanels',
      component: 'DatePicker',
      type: 'daterange',
      label: '面板不联动',
      labelWidth: 90,
      splitPanels: true
    },
    {
      name: 'multiple',
      component: 'DatePicker',
      type: 'date',
      label: '多选',
      labelWidth: 50,
      multiple: true
    },
    {
      name: 'showWeek',
      component: 'DatePicker',
      type: 'daterange',
      label: '显示星期数',
      labelWidth: 90,
      showWeekNumbers: true
    },
    {
      name: 'startDate',
      component: 'DatePicker',
      type: 'date',
      label: '起始日期',
      startDate: '19910901'
    },
    {
      name: 'format',
      component: 'DatePicker',
      type: 'date',
      label: 'format',
      format: 'yyyy/MM/dd'
    },
    {
      name: 'datetime',
      component: 'DatePicker',
      type: 'datetime',
      label: 'datetime'
    },
    {
      name: 'year',
      component: 'DatePicker',
      type: 'year',
      label: '年'
    },
    {
      name: 'month',
      component: 'DatePicker',
      type: 'month',
      label: '月'
    },
    {
      name: 'options',
      component: 'DatePicker',
      type: 'daterange',
      label: 'options选项',
      labelWidth: 100,
      options: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        },
        shortcuts: [
          {
            text: '最近一周',
            value () {
              let today = new Date()
              let lastWeek = new Date(today - 1000 * 3600 * 24 * 7)
              return [lastWeek, today]
            }
          }
        ]
      }
    },
    {
      name: 'confirm',
      component: 'DatePicker',
      type: 'date',
      label: '确认操作',
      confirm: true
    },
    {
      name: 'timePickerOptions',
      component: 'DatePicker',
      type: 'datetime',
      label: 'time的options',
      labelWidth: 120,
      timePickerOptions: {
        steps: [1, 30, 30]
      }
    },
    {
      name: 'other',
      component: 'DatePicker',
      type: 'daterange',
      label: '其他选项',
      placement: 'top-start',
      placeholder: '请选择日期',
      editable: true,
      separator: '/'
    },
    {
      name: 'dateSlot',
      component: 'DatePicker',
      type: 'date',
      label: '自定义slot',
      labelWidth: 110,
      slot: 'datslot',
      open: false,
      confirm: true,
      onClear (field, search) {
        field.open = false
        alert(`触发onClaer事件,返回值---field:${field}   search:${search}`)
      }
    },
    {
      name: 'event',
      component: 'DatePicker',
      type: 'date',
      label: '事件处理',
      confirm: true,
      onChange (formatDate, date, field, search) {
        search.date = '20180801'
        alert(`触发onChange事件,返回值---formatDate:${formatDate}   date:${date} field:${field} search:${search}`)
      },
      onOpenChange (open) { 
        console.log('open:', open)
      },
      onOk () { 
        console.log('点击确认按钮')
      },
      onClear () { 
        console.log('清除日期')
      }
    }
  ]
}
