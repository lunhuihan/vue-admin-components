<template>
  <div class="">
    <Row>
      <Col>
        <demo>
          <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" @on-search="getData" :total="3">
          </search-table>
        </demo>
      </Col>
    </Row>
  </div>
</template>

<script>
import searchConfig from './search-config'
import tableConfig from './table-config'
import tableData from './data'
import demo from './demo'
export default {
  name: 'Event',
  data () {
    return {
      searchConfig,
      tableConfig,
      tableData,
      test: 1
    }
  },
  created () {},
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
    demo
  }
}
</script>