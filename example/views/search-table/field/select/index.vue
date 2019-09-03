<template>
  <search-table :search-config="searchConfig" :table-config="tableConfig" :page-config="pageConfig" :table-data="tableData" @on-search="getData">
    <template v-slot:selectOptionSlot="{ search, field, label, value }">
      <div>
        <Icon type="ios-home" />
        {{label}}
        {{value}}
      </div>
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