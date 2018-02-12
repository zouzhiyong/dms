<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import { FindBasSupplierTable, DeleteBasCustomerRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "供应商编码", width: "100", align: "" },
        { prop: "Name", label: "供应商名称", width: "", align: "" },
        { prop: "Contact", label: "联系人", width: "100", align: "" },
        { prop: "Phone", label: "联系电话", width: "150", align: "" },
        {
          prop: "EmployeeName",
          label: "采购员",
          width: "100",
          align: "center"
        },
        {
          prop: "SupplierCategoryName",
          label: "供应商类型",
          width: "150",
          align: "center"
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
        }
      ],
      api: {
        FindTable: FindBasSupplierTable,
        DeleteRow: DeleteBasCustomerRow
      }
    };
  }
};
</script>