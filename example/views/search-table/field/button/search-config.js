export default {
  fieldWidth: 200,
  fold: true,
  fields: [
    {
      component: 'Button',
      name: 'button1',
      width: '100',
      text: 'default',
      label: '默认按钮',
      labelWidth: 300,
      // loading: true,
      type: 'primary',
      // disabled: true,
      ghost: true,
      icon: 'ios-search',
      size: 'large',
      shape: 'circle',
      long: true,
      click () {
        console.log('this:', this)
      }
    }
  ],
}
