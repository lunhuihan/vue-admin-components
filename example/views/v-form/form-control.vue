<template>
  <div class="control-box">
    <Tabs value="name1">
      <TabPane label="表单配置" name="name1">
        <form-control-config></form-control-config>
      </TabPane>
      <TabPane label="表单域配置" name="name2">标签二的内容</TabPane>
      <TabPane label="数据源配置" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import formControlConfig from './form-control-config.vue'
export default {
  name: '',
  components: { formControlConfig },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.control-box {
  width: 400px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 0 5px 0px #eee;
  margin-right: 15px;
  .ivu-tabs-content{
    padding-left: 15px;
    padding-right: 15px;
  }
  .form-label-append{
    color: #999;
  }
}
</style>
