<template>
  <search-table ref="search-table" :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig"
    @on-search="getData" :total="100">
    <Select v-model="select" slot="inputPrependSlot" style="width: 80px">
      <Option value="http">http://</Option>
      <Option value="https">https://</Option>
    </Select>
    <template v-slot:custom="{search}">
      <p class="custom">自定义组件</p>
    </template>
    <template v-slot:action-append="{search}">
      <Button type="primary" @click="changePageSize">切换每页条数</Button>
    </template>
    <Button slot="inputAppendSlot" icon="ios-search"></Button>
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
      pageConfig,
      select: 'http'
    }
  },
  created () {
  },
  methods: {
    getData (search, page, pageSize, done, eventType) {
      console.log('search:', search)
      console.log('page:', page)
      console.log('pageSize:', pageSize)
      console.log('eventType:', eventType)
      setTimeout(() => {
        done()
      }, 3000)
    },
    changePageSize () {
      this.$refs['search-table'].changePageSize(15)
    }
  },
  components: {
  }
}
</script>