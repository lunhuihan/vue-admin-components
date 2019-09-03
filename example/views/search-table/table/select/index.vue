<template>
  <div>
    <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig2" :table-config="tableConfig2" :table-data="tableData2" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig3" :table-config="tableConfig3" :table-data="tableData3" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig4" :table-config="tableConfig4" :table-data="tableData" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig5" :table-config="tableConfig5" :table-data="tableData5" @on-search="getData">
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig6" :table-config="tableConfig6" :table-data="tableData" @on-search="getData">
    </search-table>
  </div>
</template>

<script>
import searchConfig from './search-config'
import searchConfig2 from './search-config2'
import searchConfig3 from './search-config3'
import searchConfig4 from './search-config4'
import searchConfig5 from './search-config5'
import searchConfig6 from './search-config6'
import tableConfig from './table-config'
import tableConfig2 from './table-config2'
import tableConfig3 from './table-config3'
import tableConfig4 from './table-config4'
import tableConfig5 from './table-config5'
import tableConfig6 from './table-config6'
import tableData from './data'
import tableData2 from './data2'
import tableData3 from './data3'
import tableData5 from './data5'

export default {
  data () {
    return {
      searchConfig,
      searchConfig2,
      searchConfig3,
      searchConfig4,
      searchConfig5,
      searchConfig6,
      tableConfig,
      tableConfig2,
      tableConfig3,
      tableConfig4,
      tableConfig5,
      tableConfig6,
      tableData,
      tableData2,
      tableData3,
      tableData5
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