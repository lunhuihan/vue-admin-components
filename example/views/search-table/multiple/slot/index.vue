<template>
  <div class="">
    <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :page-config="pageConfig" :total="total"
      :loading="loading" @on-search="getData">
      <template v-slot:search-append="{ search, page, pageSize }">
        <div class="download-tip">
          您可以在这里下载查询明细结果（下载结果为excel文档.xls）{{page}}--{{pageSize}}<Button type="primary" @click="download(search)">下载</Button>
        </div>
      </template>
       <template v-slot:user="{search, page, pageSize}">
        搜索项自定义：{{page}}--{{pageSize}}
      </template>
      <template v-slot:transTime="{row}">
        {{row.transTime | date }}
      </template>
      <template v-slot:transMoney="{row}">
        {{row.transMoney | money }}
      </template>
      <template v-slot:transStatus="{row}">
        <tag color="success" v-if="row.transStatus === 1">{{row.transStatusDesc}}</tag>
        <tag color="error" v-if="row.transStatus === 2">{{row.transStatusDesc}}</tag>
      </template>
      <template v-slot:action="{row, page, pageSize}">
        <Button type="success" size="small">交易明细{{page}}---{{pageSize}}</Button>
        <Button type="primary" size="small">电子回单</Button>
      </template>
      <template v-slot:table-prepend="{search, page, pageSize}">
        {{page}}--{{pageSize}}
        <Alert show-icon class="table-tooltip">已选择<span class="stress">{{selectNum}}</span>项<span
            class="stress delete-btn">删除</span></Alert>
        <Button type="success" size="small" @click="test(search)">详细信息</Button>
      </template>
      <template v-slot:table-append="{search, page, pageSize}">
        {{page}}--{{pageSize}}
        <Alert show-icon class="table-tooltip">已选择<span class="stress">{{selectNum}}</span>项<span
            class="stress delete-btn">删除</span></Alert>
        <Button type="success" size="small" @click="test(search)">详细信息</Button>
      </template>
      <template v-slot:page-prepend="{page, pageSize}">
        <span class="stress">每天提现截止时间: 22:00{{page}}--{{pageSize}}</span>
      </template>
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
        this.total = 200
        this.loading = false
        done()
      }, 2000)
    },
    download (search) {
      console.log(search)
    },
    test (search) {
      console.log(search)
    }
  },
  filters: {
    date: filter.date,
    money: filter.money
  }
}
</script>
<style>
.download-tip {
  font-weight: bold;
  color: #000;
}
.table-tooltip {
  display: flex;
  align-items: center;
}
.stress {
  color: orange;
  margin: 0 5px;
}
.delete-btn {
  cursor: pointer;
  padding: 0 10px;
}
</style>