// import { deepCopy } from '../../../../utils/assist'
export default {
  labelWidth: 70,
  fieldWidth: 140,
  fold: true,
  // size: 'large',
  fields: [
    {
      name: 'cascader',
      component: 'Cascader',
      label: '基础用法',
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ],
    },
    {
      name: 'cascader1',
      component: 'Cascader',
      value: ['beijing', 'gugong'],
      label: '默认值',
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'cascader2',
      component: 'Cascader',
      value: [],
      label: '移入展开',
      trigger: 'hover',
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'cascader3',
      component: 'Cascader',
      value: [],
      label: '整体禁用',
      disabled: true,
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'cascader4',
      component: 'Cascader',
      value: [],
      label: '禁用某一项',
      labelWidth: 100,
      data: [
        {
          value: 'beijing',
          label: '北京',
          disabled: true,
          children: [
            {
              value: 'gugong',
              label: '故宫',
              code: '001001'
            },
            {
              value: 'tiantan',
              label: '天坛',
              code: '001002'
            },
            {
              value: 'wangfujing',
              label: '王府井',
              code: '001003'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                  code: '002001'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                  code: '003001'
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                  code: '003002'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'cascader5',
      component: 'Cascader',
      value: [],
      label: '选择即改变',
      labelWidth: 100,
      changeOnSelect: true,
      onChange (val, selectData, field, search) {
        console.log('onChange val:', val)
        console.log('onChange selectData:', selectData)
        console.log('onChange field:', field)
        console.log('onChange search:', search)
      },
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'custom',
      component: 'Cascader',
      label: '自定义选择',
      labelWidth: 100,
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ],
      selectSlot: 'selectSlot',
      onChange (val, selectData, field, search) {
        console.log('onChange val:', val)
        console.log('onChange selectData:', selectData)
        console.log('onChange field:', field)
        console.log('onChange search:', search)
      },
    },
    {
      name: 'cascader6',
      component: 'Cascader',
      value: [],
      label: 'render-format格式化',
      labelWidth: 150,
      renderFormat(labels, selectedData, field) {
        console.log('field:', field)
        const index = labels.length - 1
        const data = selectedData[index] || false
        if (data && data.code) {
          return labels[index] + ' - ' + data.code
        }
        return labels[index]
      },
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫',
              code: '001001'
            },
            {
              value: 'tiantan',
              label: '天坛',
              code: '001002'
            },
            {
              value: 'wangfujing',
              label: '王府井',
              code: '001003'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          code: '002',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                  code: '002001'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                  code: '003001'
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                  code: '003002'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'cascader7',
      component: 'Cascader',
      label: '动态加载数据项',
      labelWidth: 150,
      changeOnSelect: true,
      onChange (val) {
        console.log('onChange:', val)
      },
      data: [
        {
          label: '武汉',
          value: 'wuhan',
          loading: false,
          children: []
        },
        {
          label: '湖南',
          value: 'hunan',
          loading: false,
          children: []
        }
      ],
      loadData (item, callback, field, search) {
        item.loading = true
        setTimeout(() => {
          if (item.value === 'wuhan') {
            item.children = [
              {
                value: 'xinzhou',
                label: '新洲'
              },
              {
                value: 'jianghan',
                label: '江汉'
              },
              {
                value: 'wuchang',
                label: '武昌'
              }
            ]
          } else if (item.value === 'hunan') {
            item.children = [
              {
                value: 'changde',
                label: '常德'
              },
              {
                value: 'cahngsha',
                label: '长沙'
              }
            ]
          }
          item.loading = false
          callback()
        }, 1000)
      }
    },
    {
      name: 'cascader8',
      component: 'Cascader',
      value: [],
      label: '可搜索',
      labelWidth: 100,
      filterable: true,
      placeholder: '请选择或搜索',
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫',
              code: '001001'
            },
            {
              value: 'tiantan',
              label: '天坛',
              code: '001002'
            },
            {
              value: 'wangfujing',
              label: '王府井',
              code: '001003'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                  code: '002001'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                  code: '003001'
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                  code: '003002'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'cascader9',
      component: 'Cascader',
      value: [],
      label: '事件处理',
      labelWidth: 100,
      filterable: true,
      placeholder: '请选择或搜索',
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫',
              code: '001001'
            },
            {
              value: 'tiantan',
              label: '天坛',
              code: '001002'
            },
            {
              value: 'wangfujing',
              label: '王府井',
              code: '001003'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                  code: '002001'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                  code: '003001'
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                  code: '003002'
                }
              ]
            }
          ]
        }
      ],
      onChange (value, selectedData, field, search) {
        console.log('value:', value)
        console.log('selectedData:', selectedData)
        console.log('field:', field)
        console.log('search:', search)
      }
    }
  ]
}
