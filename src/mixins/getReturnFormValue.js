import { deepCopy, typeOf } from '../utils/assist'
import formatTime from '../utils/formatTime'
import collect from '../utils/collect'

function dateNeedTrans(key, value, returnDateType, originFormValue) {
  if (Array.isArray(value)) {
    return value[0] && (typeOf(originFormValue[key][0]) !== 'date' || (returnDateType && returnDateType !== 'date'))
  } else {
    return (typeOf(originFormValue[key]) !== 'date' || (returnDateType && returnDateType !== 'date'))
  }
}

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
      const originFormValue = this.originSearch || this.unformattedFormValue
      const result = deepCopy(formValue)
      for (let [key, value] of Object.entries(formValue)) {
        const { component, type = 'date', returnDateType, multiple } = this.nameField[key]
        if (component !== 'DatePicker' || !value) continue
        value = typeOf(value) === 'string' ? replaceAll(/[\.\-\/]/g, '') : value
        if (dateNeedTrans(key, value, returnDateType, originFormValue)) {
          if (type.includes('range') || multiple) {
            // 时间范围
            const formatType = returnDateType || typeOf(originFormValue[key][0])
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
            const formatType = returnDateType || typeOf(originFormValue[key])
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
