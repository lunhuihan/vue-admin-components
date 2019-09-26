export default {
  // labelWidth: 70,
  // fieldWidth: 200,
  fold: true,
  // hiddenSearchBtn: true,
  // hiddenResetBtn: true,
  // hiddenActionIcon: true,
  fields: [
    {
      name: 'basic',
      component: 'InputNumber',
      label: '基本'
    },
    {
      name: 'max',
      component: 'InputNumber',
      label: 'max',
      max: 10
    },
    {
      name: 'min',
      component: 'InputNumber',
      label: 'min',
      min: 2
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
      name: 'formatter',
      component: 'InputNumber',
      label: 'formatter',
      value: 30000,
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
