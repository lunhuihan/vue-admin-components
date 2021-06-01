<template>
  <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig" @on-search="getData">
    <template v-slot:test="{search}">
      {{search}}
    </template>
    <template v-slot:selectSlot="{search}">
      <a>选择</a>
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
  created () {
  },
  methods: {
    getData (search, page, pageSize, done) {
      console.log('search:', search)
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
