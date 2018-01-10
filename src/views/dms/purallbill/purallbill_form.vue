<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline" style="height:100%">
    <div style="padding: 5px 0;">
      <el-form-item label="供货单位">
        <el-input ref="ghdw" v-model="formInline.ghdw" placeholder="供货单位" :autofocus="true" v-enter="'shck'" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="收货仓库">
        <el-input ref="shck" v-model="formInline.shck" placeholder="收货仓库" @keyup.native.13="keyup" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="收货日期">
        <el-date-picker ref="jhrq" v-model="formInline.jhrq" type="date" :editable="false" :clearable="false" placeholder="交货日期" style="width: 150px;">
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
    </div>
    <div style="height:calc(100% - 130px)">
      <!-- <slot name="tablebill"></slot> -->
      <purallbillTable ref="tablebill"></purallbillTable>
    </div>
    <div style="padding: 5px 0;">
      <el-form-item label="供货单位">
        <el-input v-model="formInline.ghdw" placeholder="供货单位" style="width: 150px;"></el-input>
      </el-form-item>
    </div>
    <div style="padding: 5px 0;text-align:center">
      <el-button size="medium">中等按钮</el-button>
      <el-button size="medium">中等按钮</el-button>
    </div>
  </el-form>
</template>

<script>
import { FindBasRegionList } from "../../../api/api";
import purallbillTable from "./purallbill_table";
export default {
  components: {
    purallbillTable
  },
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
  methods: {
    keyup() {
      //日期跳至表格中控件
      let nextInput = this.$refs.tablebill.$refs.table.$refs["CodeName0"][0];
      nextInput.focus();
      nextInput.$refs.input.$refs.input.select();
    }
  }
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