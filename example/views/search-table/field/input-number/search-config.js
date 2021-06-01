export default {
  // labelWidth: 150,
  // fieldWidth: 200,
  fold: true,
  // hiddenSearchBtn: true,
  // hiddenResetBtn: true,
  // hiddenActionIcon: true,
  fields: [
    {
      name: 'basic',
      component: 'InputNumber',
      label: '基本',
      width: 100
    },
    {
      name: 'max10',
      component: 'InputNumber',
      label: 'max10',
      max: 10
    },
    {
      name: 'min0',
      component: 'InputNumber',
      label: 'min0',
      min: 0
    },
    {
      name: 'step10',
      component: 'InputNumber',
      label: 'step10',
      step: 10
    },
    {
      name: 'disabled',
      component: 'InputNumber',
      label: 'disabled',
      disabled: true
    },
    {
      name: 'readonly',
      component: 'InputNumber',
      label: 'readonly',
      readonly: true,
      value: 2
    },
    {
      name: 'editable',
      component: 'InputNumber',
      label: 'editable',
      editable: false,
      value: 2
    },
    {
      name: 'controlsOutside',
      component: 'InputNumber',
      label: 'controlsOutside',
      controlsOutside: true,
      value: 2
    },
    {
      name: 'formatter',
      component: 'InputNumber',
      label: 'formatter',
      value: 30,
      formatter: value => (value + '%'),
      parser: value => value.replace('%', '')
    },
    {
      name: 'onChange',
      component: 'InputNumber',
      label: '事件onChange',
      onChange (value, field, search) {
        console.log(value)
        console.log(field)
        console.log(search)
      }
    },
    {
      name: 'onFocus',
      component: 'InputNumber',
      label: '事件onFocus',
      onFocus (event, field, search) {
        console.log(event)
        console.log(field)
        console.log(search)
      }
    },
    {
      name: 'onBlur',
      component: 'InputNumber',
      label: '事件onBlur',
      onBlur (field, search) {
        console.log(field)
        console.log(search)
      }
    },
    {
      label: '自定义',
      slot: 'custom'
    }
  ]
}
