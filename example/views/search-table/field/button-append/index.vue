<template>
  <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig">
    <template v-slot:action-append="{search}">
      <Button type="primary">下载</Button>
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
      tableData,
      pageConfig
    }
  },
  created () { },
  methods: {}
}
</script>