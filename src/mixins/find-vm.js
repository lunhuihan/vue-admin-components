
import { componentNames } from '../utils/constant'

export default {
	methods: {
		findVm() {
      let parent = this.$parent
			while (componentNames.includes(parent.$options.name)) {
				parent = parent.$parent
			}
			return parent
		},
    findComp (name) {
      if (!name) return
      let parent = this.$parent
      while (parent && !name.includes(parent.$options.name)) {
				parent = parent.$parent
			}
			return parent
    }
	}
}
