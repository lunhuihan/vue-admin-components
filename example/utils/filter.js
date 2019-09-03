import { typeOf } from './assist'
import { toMoney } from './money'

function date (timeVal, format = 'Y-m-d H:i:s') {
  let time = {}
  if (typeOf(timeVal) === 'string') {
    time.year = timeVal.substring(0, 4)
    time.month = timeVal.substring(4, 6)
    time.date = timeVal.substring(6, 8)
    if (timeVal.length <= 8) {
      time.hours = '00'
      time.minutes = '00'
      time.seconds = '00'
    } else {
      time.hours = timeVal.substring(8, 10)
      time.minutes = timeVal.substring(10, 12)
      time.seconds = timeVal.substring(12, 14)
    }
    return format
      .replace('Y', time.year)
      .replace('m', time.month)
      .replace('d', time.date)
      .replace('H', time.hours)
      .replace('i', time.minutes)
      .replace('s', time.seconds)
  } else if (typeOf(timeVal) === 'date' || typeOf(timeVal) === 'number') {
    if (typeOf(timeVal) === 'number') {
      timeVal = new Date(timeVal)
    }
    time.year = timeVal.getFullYear()
    time.month = timeVal.getMonth() + 1
    time.date = timeVal.getDate()
    time.hours = timeVal.getHours()
    time.minutes = timeVal.getMinutes()
    time.seconds = timeVal.getSeconds()
    Object.keys(time).forEach(key => {
      time[key] = time[key].toString().padStart(2, '0')
    })
    return format
      .replace('Y', time.year)
      .replace('m', time.month)
      .replace('d', time.date)
      .replace('H', time.hours)
      .replace('i', time.minutes)
      .replace('s', time.seconds)
  } else {
    return timeVal
  }
}
function strToDate(timeStr) {
  let time = {}
  time.year = timeStr.substr(0, 4)
  time.month = timeStr.substr(4, 2)
  time.day = timeStr.substr(6, 2)
  if (timeStr.length <= 8) {
    time.hour = '00'
    time.minute = '00'
    time.second = '00'
  } else {
    time.hour = timeStr.substr(-6, 2)
    time.minute = timeStr.substr(-4, 2)
    time.second = timeStr.substr(-2, 2)
  }
  return new Date(
    Number(time.year),
    Number(time.month) - 1,
    Number(time.day),
    Number(time.hour),
    Number(time.minute),
    Number(time.second)
  )
}
function money(number, precision = 2, thousand = ',') {
  return toMoney(number, precision, thousand)
}
function percent(number, precision = 2) {
  if (typeOf(number) === 'array') {
    return number.map(val => percent(val, precision))
  }
  number = unformat(number)
  if (number < 0) return '0%'
  if (number > 1) return '100%'
  return toFixed(number * 100, precision) + '%'
}

function ellipsis(str = '', maxNum = 25) {
  return str.length > maxNum ? str.substring(0, maxNum) + '...' : str
}

function shortName(value = '', start = -2) {
  return value.substr(start)
}

export default {
  date,
  strToDate,
  money,
  percent,
  ellipsis,
  shortName
}