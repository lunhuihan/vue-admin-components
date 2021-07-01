<template>
  <search-table :model.sync="search" :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig"
    @on-search="getData" @on-reset="reset">
    <template v-slot:custom>
      <InputNumber :max="10" :min="1" v-model="value"></InputNumber>
    </template>
    <InputNumber :max="10" :min="1" v-model="value"></InputNumber>
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
      search: {
        formatter: 30
      },
      searchConfig,
      tableConfig,
      tableData,
      pageConfig,
      value: 2
    }
  },
  created () {
  },
  methods: {
    getData (page, pageSize, done) {
      console.log('search:', this.search)
      console.log('page:', page)
      console.log('pageSize:', pageSize)
      setTimeout(() => {
        done()
      }, 3000)
    },
    reset (page, pageSize) {
      this.value = 2
    }
  },
  components: {
  }
}
</script>
