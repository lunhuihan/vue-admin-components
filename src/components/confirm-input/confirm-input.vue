<template>
  <div class="v-component confirm-input">
    <input class="input-item" onpaste="return false" type="text" maxlength="1" v-for="(item,index) in inputArr" :key="index" :placeholder="targetValue.charAt([index])" v-model="inputArr[index]" @keyup="inputChange(index)">
  </div>
</template>
<script>

import { trim } from '../../utils/assist'
export default {
  name: 'ConfirmInput',
  props: {
    targetValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputArr: []
    }
  },
  watch: {
    targetValue (val) {
      this.initInput(val)
    }
  },
  created () {
    this.initInput(this.targetValue)
  },
  methods: {
    initInput (val) {
      if (val !== '') {
        this.inputArr = new Array(val.length).fill('')
      } else {
        this.inputArr = new Array(6).fill('')
      }
      this.$nextTick(() => {
        this.$el.getElementsByTagName('input')[0].focus()
      })
    },
    paste () {
      return false
    },
    inputChange (index) {
      if (index !== this.inputArr.length - 1) {
        if (this.$el.getElementsByTagName('input')[index].value !== '') {
          this.$el.getElementsByTagName('input')[index + 1].focus()
        }
      }
      if (index !== 0) {
        if (this.$el.getElementsByTagName('input')[index].value === '') {
          this.$el.getElementsByTagName('input')[index - 1].focus()
        }
      }
      let _str = ''
      if (this.inputArr.length > 1) {
        for (var i = 0; i < this.inputArr.length; i++) {
          _str += this.$el.getElementsByTagName('input')[i].value
        }
      } else {
        _str = this.$el.getElementsByTagName('input')[0].value
      }
      _str = trim(_str)
      if (_str === '') {
        return false
      }
      if (_str.length === this.inputArr.length) {
        this.$el.getElementsByTagName('input')[index].blur()
        if (this.targetValue !== '') {
          if (_str.toLowerCase() === this.targetValue.toLowerCase()) {
            this.$emit('success', _str)
          } else {
            this.$emit('error', _str)
          }
        } else {
          this.$emit('success', _str)
        }
        this.initInput(this.targetValue)
      }
    }
  }
}
</script>