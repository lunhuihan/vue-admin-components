export default {
  labelWidth: 70,
  fieldWidth: 200,
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
    }
  ]
}
