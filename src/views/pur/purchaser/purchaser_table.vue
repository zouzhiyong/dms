<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true" @editClick="handleEditClick"></custtable>
</template>

<script>
import { FindPurOrderTable, DeletePurOrderRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "单据编码", width: "", align: "" },
        { prop: "PurchaserName", label: "供应商名称", width: "", align: "" },
        { prop: "StatusName", label: "状态", width: "", align: "center" },
        {
          prop: "BillDate",
          label: "订单日期",
          width: "",
          align: "right",
          formatter: function(row, column) {
            return row.BillDate == null
              ? ""
              : new Date(row.BillDate).Format("yyyy-MM-dd");
          }
        },
        {
          prop: "CreateTime",
          label: "创建日期",
          width: "",
          align: "right",
          formatter: function(row, column) {
            return row.CreateTime == null
              ? ""
              : new Date(row.CreateTime).Format("yyyy-MM-dd");
          }
        },
        {
          prop: "PostDate",
          label: "过账日期",
          width: "",
          align: "right",
          formatter: function(row, column) {
            return row.PostDate == null
              ? ""
              : new Date(row.PostDate).Format("yyyy-MM-dd");
          }
        },
        { prop: "UpdateUserName", label: "修改人", width: "", align: "" },
        {
          prop: "UpdateTime",
          label: "修改日期",
          width: "",
          align: "right",
          formatter: function(row, column) {
            return row.UpdateTime == null
              ? ""
              : new Date(row.UpdateTime).Format("yyyy-MM-dd");
          }
        }
      ],
      api: {
        FindTable: FindPurOrderTable,
        DeleteRow: DeletePurOrderRow
      }
    };
  },
  methods: {
    handleEditClick(row) {
      let obj = this.$parent.$parent.$parent.$parent.$parent.$parent;
      obj.activeName = "first";
      obj.$refs.bill.iniData(row);
    }
  }
};
</script>