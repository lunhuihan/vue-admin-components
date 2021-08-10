<template>
  <search-table :search-config="searchConfig" :table-config="tableConfig"
    :table-data="tableData" :page-config="pageConfig" @on-search="getData">
    <template v-slot:custom="{search}">
      <AutoComplete v-model="value1" :data="data1" @on-search="handleSearch1"
        placeholder="input here" style="width:200px"></AutoComplete>
    </template>
    <template v-slot:dropdownSlot="{search, field}">
      <Option v-for="item in data" :value="item" :key="item">{{ item }}</Option>
    </template>
    <template v-slot:autoSlot>
      <AutoComplete v-model="value3" :data="data3" :filter-method="filterMethod"
        placeholder="input here" style="width:200px">
      </AutoComplete>
    </template>
   <template v-slot:multi>
      <div class="demo-auto-complete-item" v-for="item in data4">
        <div class="demo-auto-complete-group">
          <span>{{ item.title }}</span>
          <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
        </div>
        <Option v-for="option in item.children" :value="option.title"
          :key="option.title">
          <span class="demo-auto-complete-title">{{ option.title }}</span>
          <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
        </Option>
      </div>
      <a href="https://www.google.com/search?q=iView" target="_blank"
        class="demo-auto-complete-more">查看所有结果</a>
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
      searchConfig,
      tableConfig,
      pageConfig,
      tableData,
      data: [],
      value1: '',
      value3: '',
      data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
      data4: [
        {
          title: '话题',
          children: [
            {
              title: 'iView',
              count: 10000,
            },
            {
              title: 'iView UI',
              count: 10600,
            },
          ],
        },
        {
          title: '问题',
          children: [
            {
              title: 'iView UI 有多好',
              count: 60100,
            },
            {
              title: 'iView 是啥',
              count: 30010,
            },
          ],
        },
        {
          title: '文章',
          children: [
            {
              title: 'iView 是一个设计语言',
              count: 100000,
            },
          ],
        },
      ]
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
    handleSearch1(value) {
      this.data1 = !value ? [] : [value, value + value, value + value + value]
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
  },
  components: {},
}
</script>
<style>
    .demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #666;
        font-weight: bold;
    }
    .demo-auto-complete-group a{
        float: right;
    }
    .demo-auto-complete-count{
        float: right;
        color: #999;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
</style>

