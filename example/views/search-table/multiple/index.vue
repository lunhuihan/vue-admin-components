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
          title: '基本调用',
          routeName: 'search-table-multiple-basic'
        },
        {
          title: '自定义slot额外内容',
          routeName: 'search-table-multiple-slot'
        },
        {
          title: '搜索区域收缩/展开',
          routeName: 'search-table-multiple-fold'
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