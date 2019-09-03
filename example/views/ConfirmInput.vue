<template>
  <div class="">
    <confirm-input :target-value="targetValue" @success="success" @error="error"></confirm-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      targetValue: '123456'
    }
  },
  created () {},
  methods: {
    success (val) {
      console.log('success:', val)
    },
    error (val) {
      console.log('error:', val)
    }
  }
}
</script>