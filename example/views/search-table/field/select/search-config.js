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
      data: [
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        }
      ],
      onChange(val, field, search) {
        console.log('val:', val)
        console.log('field:', field)
        console.log('search:', search)
      }
    },
    {
      name: 'select2',
      component: 'Select',
      label: '清空',
      width: 100,
      // clearable: true,
      data: [
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        }
      ]
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
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        }
      ]
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
          disabled: true
        },
        {
          label: '上海',
          value: 'shanghai'
        }
      ]
    },
    {
      name: 'select5',
      component: 'Select',
      label: '多选',
      width: 100,
      labelWidth: 100,
      multiple: true,
      data: [
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        }
      ]
    },
    {
      name: 'select6',
      component: 'Select',
      label: 'prefix图标',
      labelWidth: 80,
      prefix: 'ios-home'
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
          value: 'wuhan'
        },
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        },
        {
          label: '重庆',
          value: 'chongqin'
        }
      ]
    },
    {
      name: 'select8',
      component: 'Select',
      label: '可搜索',
      labelWidth: 70,
      filterable: true,
      // clearable: true,
      multiple: false,
      data: [
        {
          label: '武汉',
          value: 'wuhan'
        },
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        },
        {
          label: '重庆',
          value: 'chongqin'
        }
      ]
    },
    {
      name: 'select9',
      component: 'Select',
      label: '远程搜索',
      placeholder: '请搜索',
      labelWidth: 90,
      remote: true,
      loading: false,
      data: [
        {
          label: '武汉',
          value: 'wuhan'
        },
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        },
        {
          label: '重庆',
          value: 'chongqin'
        }
      ],
      remoteMethod (query, field, search) {
        field.loading = true
        setTimeout(() => {
          this.$set(field, 'data', [
            {
              label: `武汉-${query}`,
              value: 'wuhan'
            }
          ])
          field.loading = false
        }, 2000)
      }
    },
    {
      name: 'select10',
      component: 'Select',
      label: '自定义options',
      labelWidth: 100,
      optionSlot: 'selectOptionSlot',
      data: [
        {
          label: '武汉',
          value: 'wuhan'
        },
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        },
        {
          label: '重庆',
          value: 'chongqin'
        }
      ]
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
      data: [
        {
          label: '武汉',
          value: 'wuhan'
        },
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        },
        {
          label: '重庆',
          value: 'chongqin'
        }
      ],
      remoteMethod (query, field, search) {
        field.loading = true
        setTimeout(() => {
          this.$set(field, 'data', [
            {
              label: `武汉-${query}`,
              value: 'wuhan'
            }
          ])
          field.loading = false
        }, 1000)
      }
    }
  ]
}
