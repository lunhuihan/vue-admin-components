export default {
  labelWidth: 70,
  fieldWidth: 200,
  fold: true,
  fields: [
    {
      name: 'favor',
      component: 'RadioGroup',
      value: 1,
      label: '兴趣爱好',
      width: 220,
      data: [
        {
          label: '羽毛球',
          value: 0
        },
        {
          label: '篮球',
          value: 1
        },
        {
          label: '足球',
          value: 2
        }
      ]
    },
    {
      name: 'area',
      component: 'RadioGroup',
      value: 0,
      label: 'button样式',
      type: 'button',
      width: 150,
      labelWidth: 80,
      data: [
        {
          label: '武汉',
          value: 0
        },
        {
          label: '北京',
          value: 1
        }
      ]
    },
    {
      name: 'hasIcon',
      component: 'RadioGroup',
      value: 1,
      label: '带icon',
      width: 230,
      data: [
        {
          label: '苹果',
          value: 0,
          icon: 'logo-apple'
        },
        {
          label: '安卓',
          value: 1,
          icon: 'logo-android'
        },
        {
          label: 'windows',
          value: 2,
          icon: 'logo-windows'
        }
      ]
    },
    {
      name: 'disabled',
      component: 'RadioGroup',
      value: 1,
      label: '不可用',
      width: 220,
      labelWidth: 80,
      data: [
        {
          label: '羽毛球',
          value: 0,
          disabled: true
        },
        {
          label: '篮球',
          value: 1
        },
        {
          label: '足球',
          value: 2
        }
      ]
    },
    {
      name: 'event',
      component: 'RadioGroup',
      value: 1,
      label: '事件处理',
      width: 220,
      data: [
        {
          label: '羽毛球',
          value: 0
        },
        {
          label: '篮球',
          value: 1
        },
        {
          label: '足球',
          value: 2
        }
      ],
      onChange (select, field, search) {
        console.log('select:', select)
        console.log('field:', field)
        console.log('search:', search)
      }
    }
  ]
}
