<template>
  <div>
    <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" @on-search="getData">
      <template v-slot:action="{row, index, search }">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index, row, search)">查看</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Button type="warning" size="small" @click="cancel(search)">取消勾选</Button>
      </template>
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig2" :table-config="tableConfig2" :table-data="tableData" @on-search="getData">
      <template v-slot:expand="{ row, index }">
        <expand-row :row="row"></expand-row>
      </template>
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig3" :table-config="tableConfig3" :table-data="tableData3" @on-search="getData">
    </search-table>
    <search-table :search-config="searchConfig6" :table-config="tableConfig6" :table-data="tableData6" @on-search="getData">
      <template v-slot:amt="{row}">
        {{ row.amt | money }}
      </template>
      <template v-slot:age="{row}">
        {{ row.age > 18 ? '成年': '未成年' }}
      </template>
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig4" :table-config="tableConfig" :table-data="tableData" @on-search="getData">
      <div class="header" slot="header">这是页头</div>
      <div class="footer" slot="footer">总计： <span class="money">11100元</span></div>
    </search-table>
    <Divider />
    <search-table :search-config="searchConfig5" :table-config="tableConfig5" :table-data="tableData5" @on-search="getData">
    </search-table>
    <search-table :search-config="searchConfig5" :table-config="tableConfig5" :table-data="tableData5" @on-search="getData">
    </search-table>
    <search-table :search-config="searchConfig7" :table-config="tableConfig7" :table-data="tableData7" @on-search="getData">
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
import searchConfig7 from './search-config7'
import tableConfig from './table-config'
import tableConfig2 from './table-config2'
import tableConfig3 from './table-config3'
import tableConfig5 from './table-config5'
import tableConfig6 from './table-config6'
import tableConfig7 from './table-config7'
import tableData from './data'
import tableData2 from './data2'
import tableData3 from './data3'
import tableData5 from './data5'
import tableData6 from './data6'
import tableData7 from './data7'
import expandRow from './expand-row'
import filter from '../../../../utils/filter'

export default {
  data () {
    return {
      searchConfig,
      searchConfig2,
      searchConfig3,
      searchConfig4,
      searchConfig5,
      searchConfig6,
      searchConfig7,
      tableConfig,
      tableConfig2,
      tableConfig3,
      tableConfig5,
      tableConfig6,
      tableConfig7,
      tableData,
      tableData3,
      tableData5,
      tableData6,
      tableData7
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
    },
    show (index, row, search) {
      console.log('index:', index)
      console.log('row:', row)
      console.log('search:', search)
      /* this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.tableConfig.data[index].name}<br>Age：${this.tableConfig.data[index].age}<br>Address：${this.tableConfig.data[index].address}`
      }) */
    },
    remove (index) {
      this.tableConfig.data.splice(index, 1)
    },
    cancel (search) {
      search.name = false
    }
  },
  components: {
    expandRow
  },
  filters: {
    money: filter.money
  }
}
</script>
<style>
.header,
.footer {
  background: #e2e3e4;
  padding: 0 10px;
  font-size: 14px;
}
.money {
  color: red;
}
</style>
