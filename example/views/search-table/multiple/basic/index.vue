<template>
  <div class="">
    <search-table
      :table-config="tableConfig"
      :table-data="tableData"
      :page-config="pageConfig"
      :loading="loading"
      @on-search="getData"
      :total="300"
    >
    </search-table>
    <Button @click="switchCol">切换类型</Button>
  </div>
</template>

<script>
import tableConfig from './table-config'
import searchConfig from './search-config'
import pageConfig from './page-config'
import data from './data'
import filter from '../../../../utils/filter'
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      pageConfig,
      selection: [],
      tableData: [],
      loading: false,
    }
  },
  computed: {
    selectNum() {
      return this.selection.length
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData(page, pageSize, done = () => {}) {
      console.log(page)
      console.log(pageSize)
      console.log(done)
      this.loading = true
      setTimeout(() => {
        this.tableData = data
        this.loading = false
        done()
      }, 1000)
    },
    switchCol() {
      tableConfig.columns[1].hidden = !tableConfig.columns[1].hidden
    },
  },
}
</script>
