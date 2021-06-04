<template>
  <v-form ref="form" :values="form" :options="options" :fields="fields"
    :data-source="dataSource">
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
        hideRequiredMark: true,
        // showMessage: false,
        labelWidth: 110,
        colSpace: 10,
        // fieldWidth: '100%',
        // fieldWidth: 220,
        // readonly: true,
        // labelColon: true,
        // labelPosition: 'left',
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
          onClick: 'test'
        },
        {
          label: '等级',
          component: 'Select',
          name: 'grade',
          // group: 'A'
        },
        {
          label: '状态',
          component: 'RadioGroup',
          name: 'RadioGroup',
          radioSlot: 'radioSlot',
        },
        {
          label: '日期',
          component: 'DatePicker',
          name: 'DatePicker',
          returnDateType: 'number',
        },
        {
          label: '日期范围',
          component: 'DatePicker',
          type: 'daterange',
          name: 'daterange',
          returnDateType: 'number',
        },
        {
          label: '兴趣爱好',
          component: 'CheckboxGroup',
          name: 'CheckboxGroup',
        },
        {
          label: '邮箱',
          component: 'AutoComplete',
          name: 'AutoComplete',
          // group: 'C'
          // disabled: true,
        },
        {
          label: '地址',
          component: 'Cascader',
          name: 'Cascader',
        },
        {
          label: '上传组件',
          component: 'Upload',
          name: 'upload',
          action: '//jsonplaceholder.typicode.com/posts/',
          contentSlot: 'uploadSlot',
          headers: {},
          multiple: true
        },
        {
          label: '自定义组件',
          slot: 'custom',
          // group: 'C'
        }
      ],
      form: {
        name: '轮回韩',
        grade: '2',
        RadioGroup: 0,
        DatePicker: '20200510',
        CheckboxGroup: [1],
        AutoComplete: '821877109@qq.com',
        Cascader: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
        // daterange: ['2020-04-30', '2020-07-20']
      },
      dataSource: {
        grade: [
          {
            label: '初级',
            value: '1',
          },
          {
            label: '中级',
            value: '2',
          },
          {
            label: '高级',
            value: '3',
          },
        ],
        RadioGroup: [
          {
            label: '紧急',
            value: 0,
          },
          {
            label: '急',
            value: 1,
          },
          {
            label: '一般',
            value: 2,
          },
        ],
        CheckboxGroup: [
          {
            label: '爬山',
            value: 0,
          },
          {
            label: '唱歌',
            value: 1,
          },
          {
            label: '跑步',
            value: 2,
          },
        ],
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
    }
  },
  created() {},
  mounted() {
    // this.$refs['_name'].focus()
  },
  methods: {
    test (field, formValue) {
      console.log('field:', field)
      console.log('formValue:', formValue)
    }
  },
}
</script>
