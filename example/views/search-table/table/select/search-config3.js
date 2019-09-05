export default {
  ref: 'search3',
  labelWidth: 50,
  hiddenSearchBtn: true,
  hiddenResetBtn: true,
  fields: [
    {
      name: 'name',
      component: 'Checkbox',
      label: '单选',
      width: 60
    },
    {
      name: 'button',
      component: 'Checkbox',
      labelWidth: 100,
      label: '清除单选项',
      onChange (val) { 
        val && this.$refs['table3'].clearCurrentRow()
      }
    }
  ]
}