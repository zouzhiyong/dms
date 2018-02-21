<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
    <el-form-item label="单据编码">
      <el-input :clearable="true" v-model="formInline.Code" placeholder="单据编码"></el-input>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker :clearable="false" value-format="yyyy-MM-dd" v-model="formInline.Date" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        Code: "",
        Date: [new Date().Format("yyyy-MM-dd"), new Date().Format("yyyy-MM-dd")]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    // this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.$refs.table.conditionData = this.formInline;
    // this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
  },
  methods: {
    onSubmit() {
      var obj = this.formInline;
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.conditionData = obj;
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
    }
  }
};
</script>
<style scoped lang="scss">
.toolbar .el-form-item {
  margin-bottom: 0;
}
</style>