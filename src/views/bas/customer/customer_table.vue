<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import { FindBasCustomerTable, DeleteBasCustomerRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "客户编码", width: "100", align: "" },
        { prop: "Name", label: "客户名称", width: "", align: "" },
        { prop: "Contact", label: "联系人", width: "100", align: "" },
        { prop: "Tel", label: "联系电话", width: "150", align: "" },
        { prop: "regionName", label: "销售区域", width: "", align: "" },
        {
          prop: "CustCategoryName",
          label: "客户类型",
          width: "100",
          align: ""
        },
        { prop: "IsValid", label: "有效否", width: "80", align: "center" },
        {
          prop: "CreateTime",
          label: "创建时间",
          width: "100",
          align: "",
          formatter: function(row, column) {
            return row.CreateTime == null
              ? ""
              : new Date(row.CreateTime).Format("yyyy-MM-dd");
          }
        },
        {
          prop: "UpdateTime",
          label: "修改时间",
          width: "100",
          align: "",
          formatter: function(row, column) {
            return row.UpdateTime == null
              ? ""
              : new Date(row.UpdateTime).Format("yyyy-MM-dd");
          }
        }
      ],
      api: {
        FindTable: FindBasCustomerTable,
        DeleteRow: DeleteBasCustomerRow
      }
    };
  }
};
</script>