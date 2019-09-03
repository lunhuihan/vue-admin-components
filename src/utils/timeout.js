function timeout (fn, inteval = 500) { 
  let timer = null
  return function () {
    let args = arguments

    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, inteval)
  }
}
export default timeout