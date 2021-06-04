import { adaptNumberUnit, typeOf } from '../../utils/assist'
import { sizeRange } from '../../utils/constant'
import findVm from '../../mixins/find-vm'

export default {
  mixins: [findVm],
  data () {
    return {
      parentOptions: {}
    }
  },
  mounted() {
    const fieldParentComp = this.findComp(['SearchBox', 'VForm'])
    this.parentOptions = fieldParentComp.options
  },
  methods: {
    calFieldStyle ({ component, width, long, style= {}, name }, defaultValue = '') {
      const w = width || this.parentOptions.fieldWidth
      let caledW = '100%'
      if (component !== 'Button' || !long) {
        caledW = adaptNumberUnit(w, defaultValue, true)
      }
      return Object.assign({}, { width: caledW, ...style })
    },
    calFieldSize ({ size }) {
      const returnSize = size || this.parentOptions.size
      return sizeRange.includes(returnSize) ? returnSize : 'default'
    },
    calFieldClass({
      component = '',
      search = false,
      enterButton = false,
      clearable = true,
      className = '',
    }) {
      let result = []
      if (component === 'Input') {
        if (clearable && search && enterButton) {
          result.push('input-search-clear')
        }
      }
      className && result.push(className)
      return result
    },
    calClear() {
      const {
        clearable,
        icon,
        maxlength,
        showWordLimit,
        suffix,
        enterButton,
        component,
        multiple,
        name,
        password,
        type
      } = this.item
      if (component === 'Input') {
        if (typeOf(clearable) === 'boolean') {
          return clearable
        } else {
          if (
            icon ||
            (maxlength && showWordLimit) ||
            (suffix && !enterButton) ||
            (type === 'password' && password)
          ) {
            return false
          }
          return true
        }
      } else if (component === 'Select') {
        if (typeOf(clearable) === 'boolean') {
          return clearable
        }
        if (multiple) {
          return false
        }
        return true
      } else if (component === 'AutoComplete') {
        if (icon) {
          return false
        } else {
          return typeOf(clearable) === 'boolean' ? clearable : true
        }
      } else {
        return typeOf(clearable) === 'boolean' ? clearable : true
      }
    },
    calReadonly ({ readonly }) {
      return readonly || this.parentOptions.readonly
    },
    calFieldDisabled ({ disabled }) {
      return disabled || this.parentOptions.disabled || this.parentOptions.readonly
    },
    selectQueryChange(...args) {
      this.$emit('select-query-change', ...args)
    },
    dealEvent (...args) {
      this.$nextTick(() => {
        this.$emit('deal-event', ...args)
      })
    },
    dealNumber (...args) {
      this.$emit('deal-number', ...args)
    },
    dealReturnEvent (fnName, ...rest) {
      if (!fnName) return
      let target = this.findVm()
      let params = rest.concat(this.returnFormValue)
      if (typeOf(fnName) === 'function') {
        return fnName.bind(target)(...params)
      }
      if (typeOf(fnName) === 'string') {
        let fn = target[fnName]
        if (typeOf(fn) === 'function') {
          return target[fnName](...params)
        }
      }
    }
  }
}
