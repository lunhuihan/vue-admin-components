export default {
  // labelWidth: 70,
  // fieldWidth: 200,
  fold: true,
  // hiddenSearchBtn: true,
  // hiddenResetBtn: true,
  // hiddenActionIcon: true,
  fields: [
    {
      name: 'name',
      component: 'Input',
      label: '姓名',
      labelWidth: 40,
      placeholder: '请输入姓名',
      size: 'default',
      clearable: false
    },
    {
      name: 'tel',
      component: 'Input',
      label: '手机号',
      labelWidth: 60,
      placeholder: '清空属性',
      clearable: true,
      maxlength: 11
    },
    {
      name: 'tel1',
      component: 'Input',
      label: '数字类型',
      labelWidth: 70,
      placeholder: '清空属性',
      clearable: true,
      number: true,
      maxlength: 11,
      onBlur (field, search) { 
        console.log('search:', search)
      }
    },
    {
      name: 'icon',
      component: 'Input',
      label: '带icon',
      labelWidth: 60,
      placeholder: '',
      clearable: true,
      icon: 'ios-clock-outline',
      onClick(field, search) {
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'prefix',
      component: 'Input',
      label: '前置图标',
      labelWidth: 80,
      placeholder: '',
      prefix: 'ios-search',
      onClick(field, search) {
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'suffix',
      component: 'Input',
      label: '后置图标',
      labelWidth: 80,
      placeholder: '',
      suffix: 'ios-search',
      onClick(field, search) {
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'search',
      component: 'Input',
      label: '搜索框',
      labelWidth: 80,
      placeholder: '',
      suffix: 'ios-search',
      search: true,
      clearable: true,
      onSearch(value, field, search) {
        console.log('value:', value)
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'search2',
      component: 'Input',
      label: '搜索框2',
      labelWidth: 80,
      placeholder: '',
      suffix: 'ios-search',
      search: true,
      enterButton: true,
      clearable: true,
      onSearch(value, field, search) {
        console.log('value:', value)
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'address',
      component: 'Input',
      label: '文本域',
      type: 'textarea',
      rows: 2
    },
    {
      label: '自定义组件',
      labelWidth: 120,
      width: 120,
      slot: 'custom'
    },
    {
      name: 'auto',
      component: 'Input',
      label: '文本域自适应高度',
      labelWidth: 130,
      type: 'textarea'
    },
    {
      name: 'inputPrependSlot',
      component: 'Input',
      label: '复合输入框',
      labelWidth: 120,
      prependSlot: 'inputPrependSlot',
      appendSlot: 'inputAppendSlot'
    }
  ]
}
