<template>
  <Drawer
    class-name="set-goods-drawer has-actions"
    title="添加商品"
    width="580"
    v-model="visible"
  >
    <v-form
      :model.sync="query"
      :options="options"
      :fields="fields"
      :data-source="dataSource"
      @on-submit="refresh"
      @on-reset="refresh"
    ></v-form>
  </Drawer>
</template>

<script>
export default {
  name: 'SetGoodsDrawer',
  props: {},
  data() {
    return {
      visible: false,
      query: {},
      options: {
        inline: true,
        submitBtn: {
          text: '搜索',
        },
      },
      fields: [
        {
          name: 'item',
          component: 'Cascader',
          loadData: 'loadData',
          trigger: 'hover',
          changeOnSelect: true,
          placeholder: '请选择商品类目',
        },
        {
          name: 'goodsName',
          component: 'Input',
          placeholder: '请输入商品名称',
          maxlength: 30,
        },
      ],
      dataSource: {
        item: [],
      },
    }
  },
  computed: {},
  created() {
    this.dataSource.item = [
      {
        value: 'beijing',
        label: '北京',
        children: [],
        loading: false,
      },
      {
        value: 'hangzhou',
        label: '杭州',
        children: [],
        loading: false,
      },
    ]
  },
  methods: {
    toggle() {
      this.visible = !this.visible
    },
    refresh(done = () => {}) {
      done()
    },
    loadData(item, callback) {
      item.loading = true
      setTimeout(() => {
        if (item.value === 'beijing') {
          item.children = [
            {
              value: 'talkingdata',
              label: 'TalkingData',
            },
            {
              value: 'baidu',
              label: '百度',
            },
            {
              value: 'sina',
              label: '新浪',
            },
          ]
        } else if (item.value === 'hangzhou') {
          item.children = [
            {
              value: 'ali',
              label: '阿里巴巴',
            },
            {
              value: '163',
              label: '网易',
            },
          ]
        }
        item.loading = false
        callback()
      }, 1000)
    },
  },
  components: {},
}
</script>
<style lang="scss">

</style>
