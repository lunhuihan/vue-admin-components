import { typeOf } from '../utils/assist'
export default {
  data () {
    return {}
  },
  methods: {
    checkForm (formRef = '', callback) {
      this.$refs[formRef] && this.$refs[formRef].validate((valid) => {
        if (valid) {
          typeOf(callback) === 'function' && callback()
        }
      })
    },
    resetForm (formRef = '') {
      this.$refs[formRef] && this.$refs[formRef].resetFields()
    }
  }
}
