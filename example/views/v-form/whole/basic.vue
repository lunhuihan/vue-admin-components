<template>
  <div class="page v-form-page">
    <v-form ref="form" :model.async="form" :options="options" :fields="fields"
      :data-source="dataSource" @on-submit="submit">
      <template v-slot:favorRadio="{field, value, data}">
        <p class="item">这是签约文件{{value}}<a class="link">查看详情{{data.id}}</a></p>
      </template>
      <template v-slot:checkboxSlot="{field, value, data}">
        <span>轮回韩</span>
      </template>
    </v-form>
  </div>
</template>

<script>
import { deepCopy } from '../../../utils/assist'
export default {
  name: '',
  components: {},
  data() {
    const qualityPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入'))
      } else if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
        callback(new Error('密码必须包含数字和字母'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      submitDisabled: true,
      form: {
        favor: '1',
        grade: 0,
        name: '测试',
        trans: true,
        account: [1]
      },
      options: {
        labelWidth: 100,
        // readonly: true,
        // disabled: true,
        // columns: 2,
        size: 'large'
      },
      show: false,
      fields: [
        {
          name: 'grade',
          component: 'Select',
          label: '年级',
          required: true,
        },
        {
          name: 'name',
          component: 'Input',
          label: '姓名',
          required: true,
        },
        {
          name: 'favor',
          component: 'RadioGroup',
          label: '兴趣爱好',
          radioSlot: 'favorRadio',
          vertical: true,
          required: true,
          className: 'test',
          colSpan: 2
        },
        {
          name: 'trans',
          component: 'Checkbox',
          label: '是否转账',
          required: true
        },
        {
          name: 'account',
          component: 'CheckboxGroup',
          label: '账单日',
          required: true,
          vertical: true,
          checkboxSlot: 'checkboxSlot',
        },
        {
          name: 'name1',
          component: 'Input',
          label: '姓名',
          required: true,
        },
      ],
      dataSource: {
        favor: [
          {
            label: '<strong>游泳</strong>',
            value: 1,
            id: '001',
            name: '名称1',
          },
          {
            label: '爬山',
            value: 2,
            id: '002',
            name: '名称2',
          },
          {
            label: '打球',
            value: 3,
            id: '003',
            disabled: true,
            name: '名称3',
          },
        ],
        grade: [
          {
            label: '一年级',
            value: 0,
          },
          {
            label: '二年级',
            value: 1,
          },
          {
            label: '三年级',
            value: 2,
          },
        ],
        account: [
          {
            label: '周一',
            value: 0,
            disabled: true
          },
          {
            label: '周二',
            value: 1,
          },
          {
            label: '周三',
            value: 2,
          },
        ],
      },
    }
  },
  computed: {
    startTimeOptions() {
      e.provent
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
  created() {
    setTimeout(() => {
      this.show = true
    }, 5000)
  },
  mounted() {},
  methods: {
    changeInline(value) {
      this.$set(this.config, 'inline', value)
      if (value) {
        delete this.config.columns
      }
    },
    onChange(key, value) {
      this.$set(this.config, key, value)
    },
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
      console.log('提交')
      // this.fields[0].error = '错误'
      setTimeout(() => {
        done()
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
.v-form-page {
  display: flex;
}
</style>
