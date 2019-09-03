<template>
  <div class="">
    <Card title="示例">
      <div class="tab-wrap">
        <ButtonGroup>
          <Button size="large" v-for="(item, index) in list" :key="index"
            :type="item.routeName === routeName ? 'primary' : 'default'" @click="toPage(item.routeName)">{{item.title}}</Button>
        </ButtonGroup>
      </div>
      <router-view />
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '基本属性和样式',
          routeName: 'search-table-table-basic'
        },
        {
          title: '选择、筛选和过滤',
          routeName: 'search-table-table-select'
        },
        {
          title: '复杂表格/操作',
          routeName: 'search-table-table-multiple'
        },
        {
          title: '事件处理',
          routeName: 'search-table-table-event'
        }
      ]
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  },
  created () { },
  methods: {
    toPage (name) {
      this.$router.push({
        name
      })
    }
  }
}
</script>
<style>
.tab-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
</style>