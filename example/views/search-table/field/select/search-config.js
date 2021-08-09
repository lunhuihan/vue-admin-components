export default {
  labelWidth: 50,
  fieldWidth: 200,
  fold: true,
  fields: [
   {
      name: 'select',
      component: 'Select',
      width: 120,
      value: 'beijing',
      label: '基本',
      labelKey: 'desc',
      valueKey: 'code',
      // transfer: true,
      data: [
        {
          desc: '北京',
          code: 'beijing',
        },
        {
          desc: '上海',
          code: 'shanghai',
        },
      ],
      onChange(val, field) {
        console.log('val:', val)
        console.log('field:', field)
      },
    },
    {
      name: 'select2',
      component: 'Select',
      label: '清空',
      width: 100,
      clearable: true,
      data: [
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
    },
    {
      name: 'select3',
      component: 'Select',
      label: '禁用',
      width: 100,
      disabled: true,
      data: [
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
    },
    {
      name: 'select4',
      component: 'Select',
      label: '禁用某一项',
      width: 100,
      labelWidth: 100,
      data: [
        {
          label: '北京',
          value: 'beijing',
          disabled: true,
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
    },
    {
      name: 'select40',
      component: 'Select',
      label: 'filterByLabel',
      width: 100,
      labelWidth: 100,
      filterByLabel: true,
      filterable: true,
      data: [
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
    },
    {
      name: 'select5',
      component: 'Select',
      label: '多选',
      width: 200,
      labelWidth: 100,
      multiple: true,
      data: [
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
    },
    {
      name: 'select6',
      component: 'Select',
      label: 'prefix图标',
      labelWidth: 80,
      prefix: 'ios-home',
      data: [
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
    },
    {
      name: 'select7',
      component: 'Select',
      label: '设置tag数量',
      labelWidth: 90,
      multiple: true,
      maxTagCount: 3,
      maxTagPlaceholder(num) {
        return `...`
      },
      data: [
        {
          label: '武汉',
          value: 'wuhan',
        },
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
        {
          label: '重庆',
          value: 'chongqin',
        },
      ],
    },
    {
      name: 'select8',
      component: 'Select',
      label: '可搜索',
      labelWidth: 70,
      filterable: true,
      // clearable: true,
      multiple: false,
      onQueryChange (query, field, search) {
        console.log('query:', query)
        console.log('field:', field)
        console.log('search:', search)
      },
      data: [
        {
          label: '武汉',
          value: 'wuhan',
        },
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
        {
          label: '重庆',
          value: 'chongqin',
        },
      ],
    },
    {
      name: 'select20',
      component: 'Select',
      label: '是否可以创建新条目',
      labelWidth: 140,
      allowCreate: true,
      data: [
        {
          label: '武汉',
          value: 'wuhan',
        },
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
        {
          label: '重庆',
          value: 'chongqin',
        },
      ],
      onCreate(query, field, search) {
        field.data.push({
          label: query,
          value: query,
        })
      },
    },
    {
      name: 'select21',
      component: 'Select',
      label: '远程搜索默认值',
      placeholder: '请搜索',
      labelWidth: 120,
      loading: false,
      defaultLabel: '北京',
      data: [],
      onChange (value, field, search) {
        console.log('value:', value)
        console.log('field:', field)
        console.log('search:', search)
      },
      remoteMethod(query, field) {
        if (query !== '') {
          field.loading = true
          setTimeout(() => {
            this.$set(
              field,
              'data',
              this.list.filter((item) => item.label.includes(query))
            )
            field.loading = false
          }, 2000)
        } else {
          this.$set(field, 'data', [])
          field.loading = false
        }
      }
    },
    {
      name: 'select22',
      component: 'Select',
      label: '远程搜索默认值-多选',
      placeholder: '请搜索',
      labelWidth: 130,
      multiple: true,
      loading: false,
      defaultLabel: ['北京', '上海'],
      data: [],
      onChange (value, field, search) {
        console.log('value:', value)
        console.log('field:', field)
        console.log('search:', search)
      },
      onSetDefaultOptions (options, field) {
        this.$set(field, 'data', options)
      },
      remoteMethod(query, field, search) {
        if (query !== '') {
          field.loading = true
          setTimeout(() => {
            this.$set(
              field,
              'data',
              this.list.filter((item) => item.label.includes(query))
            )
            field.loading = false
          }, 2000)
        } else {
          this.$set(field, 'data', [])
          field.loading = false
        }
      },
    },
    {
      name: 'select10',
      component: 'Select',
      label: '自定义options',
      labelWidth: 100,
      optionSlot: 'selectOptionSlot',
      filterable: true,
      data: [
        {
          label: '武汉',
          value: 'wuhan',
        },
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
        {
          label: '重庆',
          value: 'chongqin',
        },
      ],
      onChange(val, field, search) {
        console.log('val:', val)
        console.log('field:', field)
        console.log('search:', search)
      },
    },
    {
      name: 'select11',
      component: 'Select',
      label: '远程搜索并自定义内容',
      placeholder: '请搜索',
      labelWidth: 200,
      remote: true,
      loading: false,
      optionSlot: 'selectOptionSlot',
      data: [],
      remoteMethod(query, field, search) {
        field.loading = true
        setTimeout(() => {
          this.$set(field, 'data', [
            {
              label: `武汉-${query}`,
              value: 'wuhan',
            },
          ])
          field.loading = false
        }, 1000)
      },
    },
    {
      name: 'select23',
      component: 'Select',
      label: 'onSelect事件',
      labelWidth: 100,
      data: [
        {
          label: '武汉',
          value: 'wuhan',
        },
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
        {
          label: '重庆',
          value: 'chongqin',
        },
      ],
      onSelect (item, field, search) {
        console.log('item:', item)
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      slot: 'select'
    },
    {
      name: 'select9',
      component: 'Select',
      label: '远程搜索',
      placeholder: '请搜索',
      labelWidth: 90,
      loading: false,
      data: [],
      value: '',
      remoteMethod(query, field, search) {
        console.log('remoteMethod:', query)
        if (query !== '') {
          field.loading = true
          setTimeout(() => {
            this.$set(
              field,
              'data',
              this.list
            )
            field.loading = false
          }, 2000)
        } else {
          this.$set(field, 'data', [])
          field.loading = false
        }
      }
    },
  ],
}
