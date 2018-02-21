<template>
  <el-button slot="newButton" type="text" icon="el-icon-news" style="padding-top:0;padding-bottom:0" @click="handleClickNew">新建</el-button>
</template>
<script>
export default {
  methods: {
    handleClickNew() {
      let obj = this.$parent.$parent.$parent.$parent.$parent.$parent;
      obj.activeName = "first";
      let row = { POID: 0 };
      obj.$refs.bill.iniData(row);
    }
  }
};
</script>

