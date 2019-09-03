<template>
  <div class="">
    <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :loading="loading" :total="total" :page-config="pageConfig"
      @on-search="getData">
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
      total: 0,
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
    getData (search = {}, page = 1, pageSize = 10, done = () => { }) {
      this.loading = true
      setTimeout(() => {
        this.tableData = data
        this.total = 2
        this.loading = false
        done()
      }, 2000)
    },
    download (search) {
      console.log(search)
    }
  },
  filters: {
    date: filter.date,
    money: filter.money
  }
}
</script>