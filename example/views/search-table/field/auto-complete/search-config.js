export default {
  fieldWidth: 200,
  fold: true,
  fields: [
    {
      name: 'autocomplete',
      component: 'AutoComplete',
      value: '',
      data: [],
      onSearch(value, field, search) {
        this.$set(field, 'data', [
          value + '@sina.com',
          value + '@qq.com',
          value + '@263.com',
        ])
      },
    },
    {
      component: 'Html',
      html: '自定义文本内容',
      label: 'html元素',
      width: 200,
      className: 'test-html'
    },
    {
      name: 'autocomplete2',
      component: 'AutoComplete',
      label: 'dropdownSlot',
      dropdownSlot: 'dropdownSlot',
      onSearch(value) {
        this.data =
          !value || value.indexOf('@') >= 0
            ? []
            : [value + '@qq.com', value + '@sina.com', value + '@163.com']
      }
    },
    {
      slot: 'autoSlot'
    },
    {
      name: 'autocomplete3',
      component: 'AutoComplete',
      label: '过滤',
      value: '',
      data: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
      filterMethod (value, option, field, search) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
      }
    },
    {
      name: 'atuo4',
      component: 'AutoComplete',
      icon: 'ios-search',
      label: '复杂布局',
      dropdownSlot: 'multi',
      onChange (value, field, search) {
        console.log('value:', value)
        console.log('field:', field)
        console.log('search:', search)
      }
    }
  ],
}
