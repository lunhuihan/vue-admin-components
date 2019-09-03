import { typeOf } from './assist'

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

function fliterState(val) {
  let state
  switch (val) {
    case 0:
      state = '正常'
      break
    case 1:
      state = '禁用'
      break
    case 2:
      state = '未激活'
      break
    default:
      state = 'error'
      break
  }
  return state
}
function fliterStateModal(val) {
  let state
  switch (val) {
    case 0:
      state = 'user-success'
      break
    case 1:
      state = 'user-error'
      break
    case 2:
      state = 'user-warning'
      break
    default:
      state = 'error'
      break
  }
  return state
}

export default {
  date,
  fliterState,
  fliterStateModal
}