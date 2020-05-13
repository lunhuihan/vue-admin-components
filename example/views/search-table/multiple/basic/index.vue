<template>
  <div class="">
    <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig"
      :loading="loading" @on-search="getData">
    </search-table>
  </div>
</template>

<script>
import tableConfig from './table-config'
import searchConfig from './search-config'
import pageConfig from './page-config'
import data from './data'
import filter from '../../../../utils/filter'
export default {
  data () {
    return {
      tableConfig,
      searchConfig,
      pageConfig,
      selection: [],
      tableData: [],
      loading: false
    }
  },
  computed: {
    selectNum () {
      return this.selection.length
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData (search = {}, done = () => { }) {
      this.loading = true
      setTimeout(() => {
        this.tableData = data
        this.loading = false
        done()
      }, 1000)
    }
  }
}
</script>