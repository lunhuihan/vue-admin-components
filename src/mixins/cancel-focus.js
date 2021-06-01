export default {
  methods: {
    _cancelFocus(parentClass) {
      const wrap = document.querySelector(parentClass)
      const selectList = wrap.querySelectorAll('.ivu-select-item-focus')
      selectList.forEach((item) => {
        item.classList.remove('ivu-select-item-focus')
      })
      const datepickerList = wrap.querySelectorAll('.ivu-date-picker-cells-focused')
      datepickerList.forEach((item) => {
        item.classList.remove('ivu-date-picker-cells-focused')
      })
    },
  },
}
