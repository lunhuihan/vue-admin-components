export default {
  bind (el) {
    el.addEventListener('click', () => {
      el.setAttribute('disabled', true)
      el._timer = setTimeout(() => {
        el.removeAttribute('disabled')
        clearTimeout(el._timer)
      }, 1000)
    })
  },
  unbind (el) {
    delete el._timer
  }
}