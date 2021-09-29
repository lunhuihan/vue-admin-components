import { adaptNumberUnit } from '../utils/assist'
import { sizeRange } from '../utils/constant'

export default {
  data () {
    return {}
  },
  methods: {
    calFieldStyle ({ component, width, long, style= {} }, defaultValue = '') {
      const w = width || this.currentOptions.fieldWidth
      let caledW = '100%'
      if (component !== 'Button' || !long) {
        caledW = adaptNumberUnit(w, defaultValue, true)
      }
      return Object.assign({}, { width: caledW, ...style })
    },
    calFieldSize ({ size }) {
      const returnSize = size || this.currentOptions.size
      return sizeRange.includes(returnSize) ? returnSize : 'default'
    },
    calFieldDisabled ({ disabled }) {
      return disabled || this.currentOptions.disabled || this.currentOptions.readonly
    },
    calFieldClass ({ className, vertical }) {
      let result = [className]
      if (vertical) {
        result.push('vertical')
      }
      return result
    }
  }
}
