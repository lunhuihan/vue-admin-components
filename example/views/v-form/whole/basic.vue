<template>
  <div class="page v-form-page">
    <v-form ref="form" :model.async="form" :options="options" :fields="fields"
      :data-source="dataSource" @on-submit="submit">
      <template v-slot:favorRadio="{value}">
        <p class="item">这是签约文件{{value}}<a class="link">查看详情</a></p>
      </template>
    </v-form>
    <div v-if="show">111111</div>
  </div>
</template>

<script>
import { deepCopy } from '../../../utils/assist'
export default {
  name: '',
  components: {  },
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
        favor: []
      },
      options: {
        labelWidth: 100
      },
      show: false,
      fields: [
        {
          name: 'grade',
          component: 'Select',
          label: '年级',
          required: true
        },
        {
          name: 'name',
          component: 'Input',
          label: '姓名',
          required: true
        },
        {
          name: 'favor',
          component: 'CheckboxGroup',
          label: '兴趣爱好',
          // radioSlot: 'favorRadio',
          vertical: true,
          required: true
         /*  rules: [
            {
              required: true, message: '请选择', trigger: 'change'
            }
          ] */
        }
      ],
      dataSource: {
        favor: [
          {
            label: '0',
            value: 1,
            id: '001',
            name: '名称1'
          },
          {
            label: '1',
            value: 2,
            id: '002',
            name: '名称2'
          },
          {
            label: '2',
            value: 3,
            id: '003',
            name: '名称3'
          }
        ],
        grade: [
          {
            label: '一年级',
            value: 0
          },
          {
            label: '二年级',
            value: 1
          },
          {
            label: '三年级',
            value: 2
          }
        ]
      }
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
