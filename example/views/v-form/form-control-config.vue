<template>
  <v-form class="form-control-config" :model.sync="model" :config="config" :data-source="dataSource"></v-form>
</template>

<script>
/*
width // 整个表单的宽度，默认100%
columns // 表单元素分几列排列，即一行几个表单域。默认1列，及一个表单域占据一行离
colSpace // 列与列之间的距，默认0，单位px
fieldWidth // 表单元素的宽度
labelWidth // 表单域标签的宽度
labelPosition // 表单域标签的位置   left、top、right，默认right
size //表单元素大小，large、default，默认default
readonly // 表单是否只读，不可编辑，此时无操作按钮
disabled // 是否禁用整个表单
inline // 表单元素是否行内展示，与columns不可同时设置
actionAlign // 表单操作按钮的示位置 left、center、right，默认left
labelColon // 是否自动在 label 名称后添加冒号
hideRequiredMark //是否隐藏所有表单项的必选标记
showMessage // 是否显示校验错误信息
submitDisabled // 是否禁用提交按钮
*/
export default {
  name: '',
  components: {
  },
  data () {
    return {
      model: {
        width: '100%',
        columns: 1,
        colSpace: 0,
        fieldWidth: 'auto',
        labelWidth: 'auto',
        labelPosition: 'right',
        size: 'default',
        readonly: false,
        disabled: false,
        inline: false,
        actionAlign: 'left',
        labelColon: false,
        hideRequiredMark: false,
        showMessage: true,
        submitDisabled: false
      },
      config: {
        labelPosition: 'top',
        submitBtn: false,
        resetBtn: false,
        fields: [
          {
            name: 'width',
            component: 'Input',
            label: '表单宽度',
            labelPosition: 'top',
            labelAfterHtml: '（默认100%）'
          },
          {
            name: 'columns',
            component: 'InputNumber',
            label: '每行显示的表单元素个数',
            labelAfterHtml: '（默认1，占据一行）'
          },
          {
            name: 'colSpace',
            component: 'InputNumber',
            label: '列与列之间的距离',
            labelAfterHtml: '（默认0）',
            step: 5,
            min: 0,
            max: 50
          },
          {
            name: 'fieldWidth',
            component: 'Input',
            label: '表单元素的宽度',
            labelAfterHtml: '（默认auto）'
          },
          {
            name: 'labelWidth',
            component: 'Input',
            label: '表单域标签的宽度',
            labelAfterHtml: '（默认auto）'
          },
          {
            name: 'labelPosition',
            component: 'RadioGroup',
            label: '表单域标签的位置',
            labelAfterHtml: '（默认right）'
          },
          {
            name: 'size',
            component: 'RadioGroup',
            label: '表单元素大小',
            labelAfterHtml: '（默认default）'
          },
          {
            name: 'readonly',
            component: 'Checkbox',
            label: '表单元素是否只读',
            labelAfterHtml: '（默认false）',
            text: '只读'
          },
          {
            name: 'disabled',
            component: 'Checkbox',
            label: '是否禁用表单',
            labelAfterHtml: '（默认false）',
            text: '禁用'
          },
          {
            name: 'inline',
            component: 'Checkbox',
            label: '表单元素是否行内展示',
            labelAfterHtml: '（默认false）',
            text: '行内展示'
          },
          {
            name: 'actionAlign',
            component: 'RadioGroup',
            label: '操作按钮位置',
            labelAfterHtml: '（默认left）'
          },
          {
            name: 'labelColon',
            component: 'Checkbox',
            label: '是否自动在 label 名称后添加冒号',
            labelAfterHtml: '（默认false）',
            text: 'label后添加冒号',
            formItemClass: 'form-item-labelColon'
          },
          {
            name: 'hideRequiredMark',
            component: 'Checkbox',
            label: '是否隐藏所有表单项的必选标记',
            labelAfterHtml: '（默认false）',
            text: '隐藏'
          },
          {
            name: 'showMessage',
            component: 'Checkbox',
            label: '是否显示校验错误信息',
            labelAfterHtml: '（默认true）',
            text: '显示校验错误信息'
          },
          {
            name: 'submitDisabled',
            component: 'Checkbox',
            label: '是否禁用提交按钮',
            labelAfterHtml: '（默认false）',
            text: '禁用提交按钮'
          },
        ]
      },
      dataSource: {
        labelPosition: [
          {
            label: 'left',
            value: 'left'
          },
          {
            label: 'top',
            value: 'top'
          },
          {
            label: 'right',
            value: 'right'
          }
        ],
        size: [
          {
            label: 'small',
            value: 'small'
          },
          {
            label: 'default',
            value: 'default'
          },
          {
            label: 'large',
            value: 'large'
          }
        ],
        actionAlign: [
          {
            label: 'left',
            value: 'left'
          },
          {
            label: 'center',
            value: 'center'
          },
          {
            label: 'right',
            value: 'right'
          }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.form-item-labelColon{
  .form-label-append{
    left: 210px !important;
  }
}
.form-control-config{
  .ivu-form-item{
    margin-bottom: 10px;
  }
}
</style>
