import CryptoJs from 'crypto-js'

export default {
  MD5 (data) {
    return CryptoJs.MD5(data).toString()
  }
}