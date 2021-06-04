import { deepCopy, typeOf } from '../utils/assist'
import formatTime from '../utils/formatTime'
import collect from '../utils/collect'

export default {
  data() {
    return {}
  },
  computed: {
    nameField() {
      return collect.createObj(this.fields, 'name')
    },
    returnFormValue() {
      const formValue = this.search || this.formValue
      const originFormValue = this.originSearch || this.originFormValue
      const result = deepCopy(formValue)
      for (let [key, value] of Object.entries(formValue)) {
        const { component, type = 'date', returnDateType, multiple } = this.nameField[key]
        if (
          value &&
          component === 'DatePicker' &&
          ((!Array.isArray(value) && typeOf(value) !== 'date') || (value[0] && Array.isArray(value) && typeOf(value[0]) !== 'date') || (returnDateType && returnDateType !== 'date'))
        ) {
          if (type.includes('range') || multiple) {
            // 时间范围
            const formatType = returnDateType || typeof originFormValue[key][0]
            const oValue = Array.isArray(value)
              ? originFormValue[key]
              : originFormValue[key].split(',')
            result[key] = value
              .filter((item) => item)
              .map((item, index) => {
                const format = formatTime.getFormatStr(oValue[index], type)
                return formatTime.transTime(item, formatType, format)
              })
          } else {
            const formatType = returnDateType || typeof originFormValue[key]
            const format = formatTime.getFormatStr(originFormValue[key], type)
            result[key] = formatTime.transTime(
              value,
              formatType,
              format
            )
          }
        }
      }
      return result
    }
  },
}
