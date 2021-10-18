
export function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object Symbol]': 'symbol'
  }
  return map[toString.call(obj)]
}
export function deepCopy(data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

export function adaptNumberUnit (value, defaultValue = '', canPercent = false, unit = 'px') {
  if (!value || isNaN(parseFloat(value))) {
    return defaultValue
  }
  if (typeof value === 'string' && value.endsWith('%')) {
    return canPercent ? value : defaultValue
  }
  return `${parseFloat(value)}${unit}`
}

export function checkKeyHazyExist (obj, partKey) {
  if (typeOf(obj) !== 'object' || !partKey) return false
  for (let key of Object.keys(obj)) {
    if (key.split('-')[1] === partKey) return key
  }
  return false
}

export function checkIsDataCmp(component) {
  return (
    component === 'Select' ||
    component === 'RadioGroup' ||
    component === 'CheckboxGroup' ||
    component === 'Cascader'
  )
}


export function operTypeZh(component) {
  switch (component) {
    case 'Select':
    case 'DatePicker':
    case 'TimePicker':
    case 'RadioGroup':
    case 'CheckboxGroup':
    case 'Switch':
    case 'Cascader':
      return '选择'
    case 'Checkbox':
      return '勾选'
    case 'Upload':
      return '上传'
    default:
      return '输入'
  }
}

export function operTypeTrigger(component) {
  switch (component) {
    case 'Input':
    case 'AutoComplete':
      return 'blur'
    default:
      return 'change'
  }
}
