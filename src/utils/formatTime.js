import Time from './time'
const time = new Time()

export default {
  /**
   * 将时间转换成指定格式
   * @param {String | Number | Date} originTime 需要转换的时间值
   * @param {String} returnType 需要转换的类型 可取值为 'number' | 'string' | 'date'
   * @param {String} format 当需要转换成string类型时，需传入格式化的值 如 'Y-m-d H:i:s'
   * @returns
   */
  transTime(originTime, returnType, format) {
    switch (returnType) {
      case 'string':
        return time.format(originTime, format)
      case 'number':
        return time.getTimestamp(originTime)
      default:
        return originTime
    }
  },
  /**
   *  获取format值
   * @param {String | Number | Date} time 时间
   * @param {String} formatType format的类型 可取值为 year | month | date | datetime
   * @returns
   */
  getFormatStr(time, formatType = 'date') {
    const dateSeparator = this.getDateSeparator(time)
    if (formatType.includes('datetime')) {
      return `Y${dateSeparator}m${dateSeparator}d H:i:s`
    } else if (formatType.includes('date')) {
      return `Y${dateSeparator}m${dateSeparator}d`
    } else if (formatType === 'year') {
      return `Y`
    } else {
      return `Y${dateSeparator}m`
    }
  },
  /**
   * 获取字符串的时间分隔符
   * @param {String} timeStr 字符串时间
   * @returns
   */
  getDateSeparator(timeStr) {
    if (typeof timeStr !== 'string') return ''
    const reg = /[\.\-\/]/g
    const sIndex = timeStr.search(reg)
    return timeStr[sIndex] || ''
  }
}
