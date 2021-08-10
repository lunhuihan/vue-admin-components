<template>
  <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig" @on-search="getData">
    <template v-slot:system>
      <DatePicker v-model="year" type="year" placeholder="Select year" style="width: 200px"></DatePicker>
      <DatePicker v-model="month" type="month" placeholder="Select month" style="width: 200px"></DatePicker>
    </template>
  </search-table>
</template>

<script>
import searchConfig from './search-config'
import tableConfig from './table-config'
import pageConfig from './page-config'
import tableData from './data'

export default {
  data () {
    return {
      searchConfig,
      tableConfig,
      pageConfig,
      tableData,
      year: '',
      month: ''
    }
  },
  created () { },
  methods: {
    getData (page, pageSize, done) {
      console.log('page:', page)
      console.log('pageSize:', pageSize)
      setTimeout(() => {
        done()
      }, 3000)
    },
    onChange (a, b) {
      console.log('a:', a)
      console.log('b:', typeof a)
      console.log('b:', b)
    },
    clickDate (data) {
      console.log('data:', data)
    }
  },
  components: {
  }
}
</script>
