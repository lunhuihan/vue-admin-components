<template>
  <v-form ref="form" :options="options" :fields="fields"
    :data-source="dataSource" @on-submit="submit">
    <template v-slot:select>
    </template>
    <template v-slot:radioSlot="{ formValue, label, value }">
      <Tag color="red" v-if="value === 0">{{label}}</Tag>
      <Tag color="orange" v-if="value === 1">{{label}}</Tag>
      <Tag color="green" v-if="value === 2">{{label}}</Tag>
    </template>
    <template v-slot:uploadSlot="{ formValue, field }">
      <Button>上传文件</Button>
    </template>
    <template v-slot:btnSlot>
      <Icon type="md-add" />
      新增
    </template>
  </v-form>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      options: {
        // inline: true,
        columns: 2,
        // hideRequiredMark: true,
        // showMessage: false,
        labelWidth: 110,
        colSpace: 10,
        // fieldWidth: '100%',
        // fieldWidth: 220,
        // readonly: true,
        // labelColon: true,
        labelPosition: 'right',
        // fieldWidth: '100%',
        // actionAlign: 'right',
        // submitBtn: false
        // resetBtn: false
        // size: 'large',
        submitBtn: {
          // loading: true
          // size: 'default'
        },
      },
      fields: [
        {
          label: '姓名',
          component: 'Input',
          name: 'name',
          colSpan: 1,
          group: 'a',
          rules: [
            {
              required: true,
              message: '请输入姓名',
            },
          ],
        },
        {
          component: 'Button',
          // group: 'a',
          // text: '提交',
          contentSlot: 'btnSlot',
          // labelWidth: 40,
          label: '测试',
          // width: 100,
          /* style: {
            marginLeft: '10px'
          }, */
          // long: true,
          // type: 'primary',
          onClick: 'test',
        },
        {
          label: '状态',
          component: 'RadioGroup',
          name: 'RadioGroup',
          radioSlot: 'radioSlot',
          labelKey: 'desc',
          valueKey: 'code',
        },
        {
          label: '日期',
          component: 'DatePicker',
          name: 'DatePicker',
          // returnDateType: 'number',
        },
        {
          label: '日期范围',
          component: 'DatePicker',
          type: 'daterange',
          name: 'daterange',
          width: 280
          // returnDateType: 'number',
        },
        {
          label: '兴趣爱好',
          component: 'CheckboxGroup',
          name: 'CheckboxGroup',
          // labelKey: 'desc'
        },
        {
          label: '常见兴趣爱好',
          component: 'CheckboxGroup',
          name: 'CheckboxGroup2',
        },
        {
          label: '邮箱',
          component: 'AutoComplete',
          name: 'AutoComplete',
          // group: 'C'
          // disabled: true,
        },
        {
          label: '下拉框',
          component: 'Select',
          name: 'grade',
          rules: [
            {
              required: true,
              message: '请选择',
            },
          ],
          onChange: 'change'
          // width: 100
        },
        {
          label: '地址',
          component: 'Cascader',
          name: 'Cascader',
        },
        /* {
          label: '上传组件',
          component: 'Upload',
          name: 'upload',
          action: '//jsonplaceholder.typicode.com/posts/',
          contentSlot: 'uploadSlot',
          headers: {},
          multiple: true,
        } */
      ],
      dataSource: {
        grade: [
          {
            label:
              '自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件',
            value:
              '自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件',
          },
          {
            label:
              '自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件',
            value:
              '2',
          },
          ],
          CheckboxGroup2: [
            {
              label: '唱歌',
              value: 0
            },
            {
              label: '跳舞',
              value: 1
            },
            {
              label: '跑步',
              value: 2
            }
          ],
        RadioGroup: [
          {
            desc: '紧急',
            code: 0,
          },
          {
            desc: '急',
            code: 1,
          },
          {
            desc: '一般',
            code: 2,
          },
        ],
        AutoComplete: [],
        CheckboxGroup: [],
        Cascader: [
          {
            value: 'beijing',
            label: '北京',
            children: [
              {
                value: 'gugong',
                label: '故宫',
              },
              {
                value: 'tiantan',
                label: '天坛',
              },
              {
                value: 'wangfujing',
                label: '王府井',
              },
            ],
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
                  },
                ],
              },
              {
                value: 'suzhou',
                label: '苏州',
                children: [
                  {
                    value: 'zhuozhengyuan',
                    label: '拙政园',
                  },
                  {
                    value: 'shizilin',
                    label: '狮子林',
                  },
                ],
              },
            ],
          },
        ],
      },
      formRules: {
        name: [
          {
            required: true, message: '请输入姓名'
          }
        ],
        grade: [
          {
            required: true, message: '请选择等级'
          }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
    this.$refs['form'].setFormValue({
      name: '轮回韩',
      RadioGroup: 1,
      grade: '2',
      DatePicker: '2021/06/01',
      Cascader: ['beijing', 'gugong'],
      daterange: [1623134641294, 1624164851294]
    })
    /* this.$refs['form'].setFormValue('DatePicker', '2021-09-08')
    this.$refs['form'].setFormValue('daterange', '20210908, 20210909') */
  },
  methods: {
    test(field, formValue) {
      console.log('field:', field)
      console.log('formValue:', formValue)
    },
    submit(formValue, done) {
      console.log('formValue:', formValue)
      setTimeout(() => {
        done()
      }, 1000)
    },
    change (val) {
      this.$refs['form'].setFormValue('name', val)
    }
  },
}
</script>
