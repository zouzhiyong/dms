<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
    <el-form-item label="客户名称">
      <el-input :clearable="true" v-model="formInline.Name" placeholder="客户名称"></el-input>
    </el-form-item>
    <el-form-item label="销售区域">
      <el-cascader :clearable="true" :props="props" :options="RegionList" v-model="formInline.RegionModel" @change="handleChange"></el-cascader>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { FindBasRegionList } from "../../../api/api";
export default {
  data() {
    return {
      RegionList: [],
      props: {
        value: "RegionID",
        label: "Name"
      },
      formInline: {
        Name: "",
        RegionModel: [],
        Region: 0
      }
    };
  },
  created() {
    setTimeout(_ => {
      FindBasRegionList().then(result => {
        this.RegionList = result.data.children;
      });
    }, 300);
  },
  mounted() {
    this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.conditionData = this.formInline;
    this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
  },
  methods: {
    onSubmit() {
      var obj = this.formInline;
      obj.Region =
        this.formInline.RegionModel.length > 0
          ? this.formInline.RegionModel[this.formInline.RegionModel.length - 1]
          : 0;
      this.$parent.$parent.$parent.$parent.$refs.table.conditionData = obj;
      this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
    },
    handleChange(value) {
      // if (value.length > 0) {
      //   let region = value[value.length - 1].toString();
      //   this.formInline.Region = region;
      // } else {
      //   this.formInline.Region = "";
      // }
      // // let v = value[value.length - 1];
      // // if (v == undefined) {
      // //   v = "";
      // // }
      // // this.formInline.Region = v.toString();
      // console.log(this.formInline.Region);
    }
  }
};
</script>
<style scoped lang="scss">
.toolbar .el-form-item {
  margin-bottom: 0;
}
</style>