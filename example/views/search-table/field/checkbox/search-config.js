export default {
  fold: true,
  // size: 'large',
  fields: [
    {
      name: 'checkbox',
      component: 'Checkbox',
      value: '',
      label: '勾选项',
      width: 120,
      icon: 'logo-twitter',
      disabled: false,
      onChange (checked, field, search) {
        console.log('checked:', checked)
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'indeterminate',
      component: 'Checkbox',
      value: '',
      label: 'indeterminate',
      indeterminate: true,
      onChange (checked, field, search) {
        console.log('checked:', checked)
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'course',
      component: 'CheckboxGroup',
      label: 'CheckboxGroup',
      value: ['xg', 'xj'],
      labelKey: 'desc',
      valueKey: 'code',
      data: [
        {
          code: 'xg',
          desc: '西瓜',
          disabled: true
        },
        {
          code: 'xj',
          desc: '香蕉'
        },
        {
          code: 'bl',
          desc: '菠萝'
        }
      ]
    },
    {
      name: 'event',
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
    },
    {
      name: 'course1',
      component: 'CheckboxGroup',
      label: '兴趣爱好',
      labelKey: 'desc',
      valueKey: 'code',
      border: true,
      data: [
        {
          code: 'xg',
          desc: '西瓜',
          disabled: true
        },
        {
          code: 'xj',
          desc: '香蕉'
        },
        {
          code: 'bl',
          desc: '菠萝'
        }
      ]
    }
  ]
}
