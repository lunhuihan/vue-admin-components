<template>
  <div>
    <search-table :search-config="searchConfig" :table-data="tableData" :table-config="tableConfig" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig2" :table-data="tableData" :table-config="tableConfig2" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig3" :loading="loading" :table-data="tableData" :table-config="tableConfig3" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig6" :table-data="tableData" :table-config="tableConfig6" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig7" :table-data="tableData" :table-config="tableConfig7" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="tableConfig88" :table-data="tableData" :table-config="tableConfig8" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig9" :table-data="tableData" :table-config="tableConfig9" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig10" :table-data="tableData10" :table-config="tableConfig10" @on-search="getData">
    </search-table>
  </div>
</template>

<script>
import searchConfig from './search-config'
import searchConfig2 from './search-config2'
import searchConfig3 from './search-config3'
import searchConfig6 from './search-config6'
import searchConfig7 from './search-config7'
import searchConfig8 from './search-config8'
import searchConfig9 from './search-config9'
import searchConfig10 from './search-config10'
import tableConfig from './table-config'
import tableConfig2 from './table-config2'
import tableConfig3 from './table-config3'
import tableConfig6 from './table-config6'
import tableConfig7 from './table-config7'
import tableConfig8 from './table-config8'
import tableConfig9 from './table-config9'
import tableConfig10 from './table-config10'
import tableData from './data'
import tableData10 from './data10'

export default {
  data () {
    return {
      searchConfig,
      searchConfig2,
      searchConfig3,
      searchConfig6,
      searchConfig7,
      searchConfig8,
      searchConfig9,
      searchConfig10,
      tableConfig,
      tableConfig2,
      tableConfig3,
      tableConfig6,
      tableConfig7,
      tableConfig8,
      tableConfig9,
      tableConfig10,
      tableData,
      tableData10,
      select: 'http',
      loading: true
    }
  },
  computed: {
    tableConfig88 () {
      return { ...this.tableConfig8 }
    }
  },
  created () {
    setTimeout(() => {
      this.$set(this.tableConfig8, 'height', 100)
    }, 3000)
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
<style>
    .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>
