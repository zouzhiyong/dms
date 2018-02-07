<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import { FindBasWarehouseTable, DeleteBasWarehouseRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "部门编号", width: "", align: "" },
        { prop: "Name", label: "部门名称", width: "", align: "" },
        { prop: "Contact", label: "联系人", width: "100", align: "" },
        { prop: "Address", label: "地址", width: "", align: "" },
        { prop: "Tel", label: "电话", width: "", align: "" },
        {
          prop: "CreateTime",
          label: "创建时间",
          width: "",
          align: "",
          formatter: function(row, column) {
            return row.CreateTime == null
              ? ""
              : new Date(row.CreateTime).Format("yyyy-MM-dd hh:mm:ss");
          }
        },
        {
          prop: "CloseTime",
          label: "关闭时间",
          width: "",
          align: "",
          formatter: function(row, column) {
            return row.CloseTime == null
              ? ""
              : new Date(row.CloseTime).Format("yyyy-MM-dd hh:mm:ss");
          }
        },
        { prop: "CloseUser", label: "关闭操作员", width: "100", align: "" },
        {
          prop: "IsValid",
          label: "有效否",
          width: "100",
          align: "center"
        }
      ],
      api: {
        FindTable: FindBasWarehouseTable,
        DeleteRow: DeleteBasWarehouseRow
      }
    };
  },
  mounted() {
    this.$refs.table.GetData();
  }
};
</script>
