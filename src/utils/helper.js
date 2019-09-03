import storage from './storage'
import { typeOf } from './assist'

export default {
  getUserInfo (infoKey = '', defaultValue = '') {
    return storage.getSessionObj('userInfo', infoKey, defaultValue)
  },
  saveUserInfo (infoObj) {
    storage.setSession('userInfo', infoObj)
  },
  updateUserInfo (infoObj) {
    storage.updateSessionObj('userInfo', infoObj)
  },
  clearUserInfo () {
    storage.removeSession('userInfo')
  },
  hasAuth (authKey) {
    if (typeOf(authKey) !== 'string') return false
    let authList = this.getUserInfo('permissions', [])
    return authList.includes(authKey)
  }
}
