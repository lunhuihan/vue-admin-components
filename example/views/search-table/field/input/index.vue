<template>
<div>
    <search-table ref="search-table" :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig" @on-search="getData" @on-reset="onReset" :total="100">
      <Select v-model="select" slot="inputPrependSlot" style="width: 80px">
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
      <template v-slot:custom="{search}">
        <p class="custom">自定义组件</p>
      </template>
      <template v-slot:action-append="{search}">
      </template>
    </search-table>
    <Button type="primary" @click="reset">手动重置</Button>
  </div>
</template>

<script>
import searchConfig from './search-config'
import tableConfig from './table-config'
import pageConfig from './page-config'
import tableData from './data'

export default {
  data() {
    return {
      searchConfig,
      tableConfig,
      tableData,
      pageConfig,
      select: 'http',
    }
  },
  created() {},
  methods: {
    getData(search, page, pageSize, done, eventType) {
      console.log('search:', search)
      console.log('page:', page)
      console.log('pageSize:', pageSize)
      console.log('done:', done)
      console.log('eventType:', eventType)
      setTimeout(() => {
        done()
      }, 3000)
    },
    onReset(key1, key2, key3, key4, key5) {
      console.log('kye1:', key1)
      console.log('key2:', key2)
      console.log('key3:', key3)
      console.log('key4:', key4)
      console.log('key5:', key5)
    },
    reset() {
      this.$refs['search-table'].reset()
    },
    search() {
      this.$refs['search-table'].search()
    },
  },
  components: {},
}
</script>