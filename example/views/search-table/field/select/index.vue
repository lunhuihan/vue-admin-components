<template>
  <search-table :model="model" :search-config="searchConfig" :table-config="tableConfig"
    :page-config="pageConfig" :table-data="tableData" @on-search="getData">
    <template v-slot:selectOptionSlot="{ search, field, label, value }">
      <div>
        <Icon type="ios-home" />
        {{label}}
        {{value}}
      </div>
    </template>
    <template v-slot:select>
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">
          {{ item.label }}</Option>
      </Select>
    </template>
  </search-table>
</template>

<script>
import searchConfig from './search-config'
import tableConfig from './table-config'
import pageConfig from './page-config'
import tableData from './data'

export default {
  data() {
    return {
      model: {
        select: 'beijing'
      },
      searchConfig,
      tableConfig,
      pageConfig,
      tableData,
      list: [
        {
          value: 'beijing',
          label: '北京1111',
        },
        {
          value: 'shanghai',
          label: '上海2222',
        },
        {
          value: 'shenzhen',
          label: '深圳3333',
        },
        {
          value: 'hangzhou',
          label: '杭州4444',
        },
        {
          value: 'guangzhou',
          label: '广州5555',
        },
      ],
      cityList: [
        {
          value: 'New York',
          label: 'New York',
        },
        {
          value: 'London',
          label: 'London',
        },
        {
          value: 'Sydney',
          label: 'Sydney',
        },
        {
          value: 'Ottawa',
          label: 'Ottawa',
        },
        {
          value: 'Paris',
          label: 'Paris',
        },
        {
          value: 'Canberra',
          label: 'Canberra',
        },
      ],
      model1: 'London',
    }
  },
  created() {},
  methods: {
    getData(page, pageSize, done) {
      console.log('page:', page)
      console.log('pageSize:', pageSize)
      setTimeout(() => {
        done()
      }, 3000)
    },
    createOption(query, field, dataSource, search) {
      console.log('dataSource:', dataSource)
      dataSource.push({
        label: query,
        value: query,
      })
      console.log('query;', query)
      console.log('field;', field)
      console.log('search;', search)
    },
  },
  components: {},
}
</script>
