import { typeOf } from '../utils/assist'
export default {
  methods: {
    dealEvent (fnName, ...rest) {
      let target = this.findVm()
      let params = rest.concat(this.search)
      if (typeOf(fnName) === 'function') {
        fnName.bind(target)(...rest)
      }
      if (typeOf(fnName) === 'string') {
        let fn = target[fnName]
        let params = rest.concat(this.search)
        if (typeOf(fn) === 'function') {
          target[fnName](...params)
        }
      }
    }
  }
}
