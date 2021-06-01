<template>
  <div class="">
    <Card title="示例">
      <div class="tab-wrap">
        <ButtonGroup>
          <Button size="large" v-for="(item, index) in list" :key="index"
            :type="item.routeName === routeName ? 'primary' : 'default'" @click="toPage(item.routeName)">{{item.title}}</Button>
        </ButtonGroup>
      </div>
      <router-view />
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: 'Input',
          routeName: 'search-table-field-input'
        },
        {
          title: 'InputNumber',
          routeName: 'search-table-field-input-number'
        },
        {
          title: 'Select',
          routeName: 'search-table-field-select'
        },
        {
          title: 'Datepicker',
          routeName: 'search-table-field-datepicker'
        },
        {
          title: 'RadioGroup',
          routeName: 'search-table-field-radio'
        },
        {
          title: 'Checkbox',
          routeName: 'search-table-field-checkbox'
        },
        {
          title: 'Switch',
          routeName: 'search-table-field-switch'
        },
        {
          title: 'Cascader',
          routeName: 'search-table-field-cascader'
        },
        {
          title: 'AutoComplete',
          routeName: 'search-table-field-autocomplete'
        },
        {
          title: 'button-append',
          routeName: 'search-table-field-button-append'
        },
        {
          title: 'tow-row',
          routeName: 'search-table-field-two-row'
        }
      ]
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  },
  created () { },
  methods: {
    toPage (name) {
      this.$router.push({
        name
      }).catch(err => {err})
    }
  }
}
</script>
<style>
.tab-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
</style>
