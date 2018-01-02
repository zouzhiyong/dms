<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
    <el-form-item label="供货单位">
      <el-input v-model="formInline.ghdw" placeholder="客户名称" style="width: 150px;"></el-input>
    </el-form-item>
    <el-form-item label="收货仓库">
      <el-input v-model="formInline.shck" placeholder="收货仓库" style="width: 150px;"></el-input>
    </el-form-item>
    <el-form-item label="收货日期">
      <el-date-picker v-model="formInline.jhrq" type="date" :editable="false" :clearable="false" placeholder="交货日期" style="width: 150px;">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="单据类型">
      <el-select :disabled="true" v-model="formInline.type" placeholder="单据类型">
        <el-option v-for="item in formInline.typeList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="单据状态">
      <el-select :disabled="true" v-model="formInline.status" placeholder="单据状态">
        <el-option v-for="item in formInline.statusList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
        Region: "",
        typeList: [{ value: "0", label: "进货单" }],
        type: "0",
        statusList: [{ value: "0", label: "新增" }],
        status: "0",
        jhrq: new Date()
      }
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0;
}
.el-select>>>.el-input {
  width: 100px;
}
</style>