export default {
  // fieldWidth: 200,
  // fold: true,
  // searchBtn: false,
  resetBtn: false,
  // hiddenActionIcon: true,
  labelWidth: 100,
  // labelColon: true,
  hideRequiredMark: true,
  // actionLineFeed: true,
  // size: 'large',
  fields: [
    {
      name: 'name',
      component: 'Input',
      label: '姓名',
      placeholder: '请输入姓名',
      type: 'positiveNumber',
      maxlength: 10,
      rules: [{
        required: true,
        message: '请输入姓名'
      }]
    },
    {
      name: 'favor',
      component: 'RadioGroup',
      value: 0,
      // type: 'button',
      label: '兴趣爱好',
      // width: 220,
      labelKey: 'desc',
      valueKey: 'code',
      data: [
        {
          desc: '羽毛球',
          code: 0
        },
        {
          desc: '篮球',
          code: 1
        },
        {
          desc: '足球',
          code: 2
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
      name: 'InputB',
      component: 'Input',
      label: '不显示边框',
      labelWidth: 100,
      placeholder: '不显示边框',
      border: false,
    },
    {
      name: 'InputL',
      component: 'Input',
      label: '显示输入统计',
      labelWidth: 100,
      maxlength: 30,
      showWordLimit: true,
    },
    {
      name: 'tel',
      component: 'Input',
      label: '手机号',
      labelWidth: 60,
      placeholder: '清空属性',
      clearable: true,
      maxlength: 11,
    },
    {
      name: 'tel1',
      component: 'Input',
      label: '数字类型',
      labelWidth: 80,
      placeholder: '清空属性',
      clearable: true,
      number: true,
      maxlength: 11,
      onBlur: 'test',
    },
    /* {
      name: 'password',
      component: 'Input',
      label: '密码框',
      type: 'password',
      password: true,
    },
    {
      name: 'focus',
      component: 'Input',
      label: '聚焦并全选',
      labelWidth: 90,
      suffix: 'ios-clock-outline',
      onClick(field, search) {
        this.$refs['_focus'].focus({
          cursor: 'all',
        })
      },
    },
    {
      name: 'icon',
      component: 'Input',
      label: '带icon',
      labelWidth: 60,
      placeholder: '',
      // clearable: true,
      icon: 'ios-clock-outline',
      onClick(field, search) {
        console.log('field:', field)
        console.log('search:', search)
      },
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
      },
    },
    {
      name: 'search',
      component: 'Input',
      label: '搜索框',
      labelWidth: 80,
      placeholder: '',
      suffix: 'ios-search',
      search: true,
      onSearch(field, search) {
        console.log('field:', field)
        console.log('search:', search)
      },
    },
    {
      name: 'search2',
      component: 'Input',
      label: '搜索框2',
      labelWidth: 80,
      placeholder: '',
      search: true,
      enterButton: '搜索',
      onSearch(field, search) {
        console.log('field:', field)
        console.log('search:', search)
      },
    },
    {
      name: 'address',
      component: 'Input',
      label: '文本域',
      type: 'textarea',
      rows: 4,
      maxlength: 100,
      showWordLimit: true,
    },
    {
      label: '自定义组件',
      labelWidth: 120,
      width: 120,
      slot: 'custom',
    },
    {
      name: 'auto',
      component: 'Input',
      label: '文本域自适应高度',
      labelWidth: 130,
      type: 'textarea',
    },
    {
      name: 'inputPrependSlot',
      component: 'Input',
      label: '复合输入框',
      labelWidth: 120,
      prependSlot: 'inputPrependSlot',
      appendSlot: 'inputAppendSlot',
    },
    {
      name: 'prefix1',
      component: 'Input',
      label: '前置图标',
      prefix: 'ios-contact',
    },
    {
      name: 'suffix2',
      component: 'Input',
      label: '后置图标',
      suffix: 'ios-contact',
    },
    {
      name: 'chinese',
      component: 'Input',
      label: '输入金额时显示中文',
      numberToChinese: true,
    }, */
  ],
}
