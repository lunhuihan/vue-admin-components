
import { componentNames } from '../utils/constant'

export default {
	methods: {
		findVm() {
      let parent = this.$parent
			while (componentNames.includes(parent.$options.name)) {
				parent = parent.$parent
			}
			return parent
		}
	}
}