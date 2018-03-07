<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
    <el-form-item label="单据编码">
      <el-input :clearable="true" v-model="formInline.Code" placeholder="单据编码"></el-input>
    </el-form-item>
    <el-form-item label="仓库">
      <el-select :clearable="true" v-model="formInline.WarehouseID" placeholder="仓库">
        <el-option v-for="item in formInline.WarehouseIDList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="单据状态">
      <el-select :clearable="true" v-model="formInline.Status" placeholder="单据状态">
        <el-option v-for="item in formInline.StatusList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
import { FindWarehouseList } from "../../../api/api";
export default {
  data() {
    return {
      formInline: {
        WarehouseID: null,
        WarehouseIDList: [],
        SupplierID: null,
        SupplierIDList: [],
        Code: null,
        Status: null,
        StatusList: [
          { label: "保存", value: 1 },
          { label: "审核", value: 2 },
          { label: "完成", value: 3 }
        ],
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
  created() {
    FindWarehouseList().then(result => {
      this.formInline.WarehouseIDList = result.data;
    });
  },
  mounted() {
    // this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.$refs.table.conditionData = this.formInline;
    // this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
  },
  methods: {
    onSubmit() {
      var obj = this.formInline;
      //状态为字符串为置空
      this.formInline.SupplierID =
        this.formInline.SupplierID == "" ? null : this.formInline.SupplierID;
      this.formInline.Status =
        this.formInline.Status == "" ? null : this.formInline.Status;
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.conditionData = obj;
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
    }
  }
};
</script>
<style scoped>
.toolbar .el-form-item {
  margin-bottom: 0;
}

.el-form>>>.el-input {
  width: 140px;
}
</style>