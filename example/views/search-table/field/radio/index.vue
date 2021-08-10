<template>
  <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig" @on-search="getData">
    <template v-slot:radioSlot="{ search, label, value }">
      <Tag color="red" v-if="value === 0">{{label}}</Tag>
      <Tag color="orange" v-if="value === 1">{{label}}</Tag>
      <Tag color="green" v-if="value === 2">{{label}}</Tag>
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
      tableData
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
    }
  },
  components: {
  }
}
</script>
