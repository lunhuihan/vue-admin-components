export default {
  labelWidth: 70,
  fieldWidth: 200,
  fold: true,
  fields: [
    {
      name: 'switch',
      component: 'Switch',
      label: '是否开启',
      value: true
    },
    {
      name: 'switch2',
      component: 'Switch',
      label: '大小',
      size: 'large'
    },
    {
      name: 'switch3',
      component: 'Switch',
      label: '不可用',
      disabled: true
    },
    {
      name: 'switch4',
      component: 'Switch',
      value: true,
      label: '加载中',
      loading: true
    },
    {
      name: 'switch5',
      component: 'Switch',
      value: 1,
      label: '选中1没选中0',
      labelWidth: 200,
      trueValue: 1,
      falseValue: 0
    },
    {
      name: 'switch6',
      component: 'Switch',
      value: false,
      label: '自定义显示内容',
      labelWidth: 120,
      openText: '开',
      closeText: '关'
    },
    {
      name: 'switch7',
      component: 'Switch',
      label: '事件处理',
      labelWidth: 200,
      onChange (val, field, search) {
        console.log('val:', val)
        console.log('field:', field)
        console.log('search:', search)
      }
    }
  ]
}
