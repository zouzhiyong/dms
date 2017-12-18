<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
  <el-form-item label="供货单位">
    <el-input v-model="formInline.ghdw" placeholder="客户名称" style="width: 150px;"></el-input>
  </el-form-item> 
  <el-form-item label="收货仓库">
    <el-input v-model="formInline.shck" placeholder="收货仓库" style="width: 150px;"></el-input>
  </el-form-item>  
  <el-form-item label="经手人">
    <el-input v-model="formInline.jsr" placeholder="经手人" style="width: 150px;"></el-input>
  </el-form-item> 
  <el-form-item label="交货日期">
    <el-date-picker
      v-model="formInline.jhrq"
      type="date"
      placeholder="交货日期" style="width: 150px;">
    </el-date-picker>   
  </el-form-item> 
</el-form>
</template>

<script>
import { FindBasRegionList } from "../../../api/api";
export default {
  data() {
    return {
      RegionList: [],
      formInline: {
        CustomerName: "",
        RegionName: [],
        Region: ""
      }
    };
  },
  created() {
    this.formInline.jhrq = new Date();
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.toolbar .el-form-item {
  margin-bottom: 0;
}
</style>