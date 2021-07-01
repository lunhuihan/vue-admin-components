<template>
  <v-form ref="form" :model="form" :config="config"
    :data-source="dataSource" @on-reset="reset" @on-submit="submit">
    <template v-slot:uploadSlot>
      <Button>上传</Button>
    </template>
  </v-form>
</template>

<script>
import { deepCopy } from '../../../utils/assist'
export default {
  name: '',
  components: {},
  data() {
    return {
      visible: false,
      form: {
        day: [1623400158263, 1623700158263, 1623900158263],
        startTime: '',
        endTime: '',
        // name: ' 轮回韩 ',
        // age: '29330rr',
        // birthday: [1623400158263, 1623600158263],
        // inputNumber: 18,
        // grade: 1,
        // school: '20210901',
        // sex: 0,
        // work: true,
        // favor: [0, 2],
        // area: ['beijing', 'gugong'],
        // email: '22202'
        // switch: true
      },
      config: {
        labelWidth: 100,
        inline: true,
        // size: 'large',
        // readonly: true,
        fields: [
          {
            name: 'name',
            component: 'Input',
            label: '姓名',
            rules: [
              {
                required: true,
                message: '请输入姓名'
              }
            ]
          },
          {
            name: 'age',
            component: 'Input',
            label: '年龄',
            number: true,
          },
          {
            name: 'birthday',
            component: 'DatePicker',
            label: '出生日期',
            type: 'daterange',
            width: 240,
            returnDateType: 'string',
            returnDateSeparator: '.',
          },
          {
            name: 'day',
            component: 'DatePicker',
            label: '多选日期',
            type: 'date',
            multiple: true,
            returnDateType: 'string',
            returnDateSeparator: '/',
          },
          {
            name: 'startTime',
            component: 'DatePicker',
            label: '度假日期',
            width: 120,
            options: 'startTimeOptions',
            group: 'A'
          },
          {
            component: 'Html',
            html: '~',
            group: 'A',
            width: 30,
            style: {
              textAlign: 'center'
            }
          },
          {
            name: 'endTime',
            component: 'DatePicker',
            width: 120,
            options: 'endTimeOptions',
            group: 'A'
          },
          {
            name: 'inputNumber',
            component: 'InputNumber',
            label: '数字输入框',
            min: 1,
            max: 20,
            // size: 'large'
          },
          {
            name: 'grade',
            component: 'Select',
            label: '等级',
          },
          {
            name: 'school',
            component: 'DatePicker',
            label: '上学日期',
            width: 240,
            // type: 'datetime',
            returnDateType: 'string',
            returnDateSeparator: '/',
          },
          {
            name: 'sex',
            component: 'RadioGroup',
            label: '性别',
            labelKey: 'desc',
            valueKey: 'code',
          },
          {
            name: 'work',
            component: 'Checkbox',
            label: '是否工作',
            text: '是否工作',
            // size: 'large'
            // trueValue: 'y',
            // falseValue: 'n'
          },
          {
            name: 'favor',
            component: 'CheckboxGroup',
            label: '兴趣爱好',
          },
          {
            name: 'switch',
            component: 'Switch',
            label: '开关',
            // trueValue: 1,
            // falseValue: 0
            // size: 'large'
          },
          {
            name: 'email',
            component: 'AutoComplete',
            label: '邮箱',
            onSearch(value, field) {
              this.dataSource.email =
                !value || value.indexOf('@') >= 0
                  ? []
                  : [value + '@qq.com', value + '@sina.com', value + '@163.com']
            },
          },
          {
            name: 'area',
            component: 'Cascader',
            label: '地区',
            renderFormat(labels, selectedData, field, formValue) {
              console.log('field:', field)
              console.log('formValue:', formValue)
              const index = labels.length - 1
              const data = selectedData[index] || false
              if (data && data.code) {
                return labels[index] + ' - ' + data.code
              }
              return labels[index]
            },
          },
          {
            name: 'img',
            component: 'Upload',
            label: '上传图片',
            action: '//jsonplaceholder.typicode.com/posts/',
            contentSlot: 'uploadSlot',
            onSuccess(res) {
              console.log('res:', res)
            },
            onError(res) {
              console.log('res:', res)
            },
          },
          {
            name: 'company',
            label: '公司',
            component: 'Select',
            remoteMethod: 'queryCompany',
            loading: false,
            onQueryChange() {
              console.log('------queryChange-----')
            },
          },
        ],
      },
      dataSource: {
        grade: [
          {
            label: '初级',
            value: 0,
          },
          {
            label: '中级',
            value: 1,
          },
          {
            label: '高级',
            value: 2,
          },
        ],
        sex: [
          {
            code: 0,
            desc: '男',
          },
          {
            code: 1,
            desc: '女',
          },
        ],
        favor: [
          {
            label: '足球',
            value: 0,
          },
          {
            label: '篮球',
            value: 1,
          },
          {
            label: '棒球',
            value: 2,
          },
        ],
        email: [],
        area: [
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
        company: [],
      },
    }
  },
  computed: {
    startTimeOptions() {
      let endTime = this.form.endTime

      return {
        disabledDate(date) {
          return date && ((endTime && date > endTime) || date > new Date())
        },
      }
    },
    endTimeOptions() {
      let startTime = this.form.startTime
      return {
        disabledDate(date) {
          return date && ((startTime && date < startTime) || date > new Date())
        },
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    queryCompany(query, field) {
      if (query !== '') {
        field.loading = true
        setTimeout(() => {
          this.$set(this.dataSource, 'company', [
            {
              label: '北京1111',
              value: 'beijing',
            },
            {
              label: '上海111',
              value: 'shanghai',
            },
          ])
          field.loading = false
        }, 2000)
      } else {
        this.$set(this.dataSource, 'company', [])
        field.loading = false
      }
    },
    reset(done) {
      setTimeout(() => {
        done()
      }, 1000)
    },
    submit(done) {
      setTimeout(() => {
        done()
      }, 1000)
    },
  },
}
</script>
