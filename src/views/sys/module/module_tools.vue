<template>
  <el-button slot="newButton" type="text" icon="el-icon-news" style="padding-top:0;padding-bottom:0" @click="handleClickNew">新建</el-button>
</template>
<script>
export default {
  methods: {
    handleClickNew() {
      let node = this.$parent.$parent.$parent.$parent.$refs.tree.$refs.tree.getCurrentNode();
      let row = { FID: 0, ParentCode: node.Code.substring(0, 2) };
      this.$parent.$parent.$parent.$parent.$refs.form.GetData(row);
    }
  }
};
</script>

