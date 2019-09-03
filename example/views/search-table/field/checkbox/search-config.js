export default {
  labelWidth: 70,
  fieldWidth: 200,
  fold: true,
  fields: [
    {
      name: 'checkbox',
      component: 'Checkbox',
      value: '',
      label: '勾选项',
      width: 50,
      trueValue: 1,
      falseValue: 0,
      disabled: false,
      onChange (checked, field, search) {
        console.log('checked:', checked)
        console.log('field:', field)
        console.log('search:', search)
      } 
    },
    {
      name: 'course',
      component: 'CheckboxGroup',
      label: '勾选组',
      labelWidth: 100,
      value: ['xg', 'xj'],
      data: [
        {
          value: 'xg',
          label: '西瓜',
          disabled: true 
        },
        {
          value: 'xj',
          label: '香蕉'
        },
        {
          value: 'bl',
          label: '菠萝'
        }
      ]
    },
    {
      name: 'favor',
      component: 'CheckboxGroup',
      label: '事件处理',
      labelWidth: 100,
      data: [
        {
          value: 'dy',
          label: '电影'
        },
        {
          value: 'dsj',
          label: '电视剧'
        },
        {
          value: 'xs',
          label: '小说'
        }
      ],
      onChange (checked, field, search) {
        console.log('checked:', checked)
        console.log('field:', field)
        console.log('search:', search)
      }
    }
  ]
}
