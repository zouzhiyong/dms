<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import {
  FindBasDepartmentTable,
  DeleteBasDepartmentRow
} from "../../../api/api";
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
        // { prop: "ParentCode", label: "上线部门编号", width: "", align: "" },
        {
          prop: "CreateTime",
          label: "创建时间",
          width: "",
          align: "",
          formatter: function(row, column) {
            return new Date(row.CreateTime).Format("yyyy-MM-dd hh:mm:ss");
          }
        },
        {
          prop: "UpdateTime",
          label: "修改时间",
          width: "",
          align: "",
          formatter: function(row, column) {
            return new Date(row.UpdateTime).Format("yyyy-MM-dd hh:mm:ss");
          }
        },
        {
          prop: "IsValid",
          label: "有效否",
          width: "",
          align: "center",
          formatter: function(row, column) {
            return row.IsValid == 0 ? "无效" : "有效";
          }
        }
      ],
      api: {
        FindTable: FindBasDepartmentTable,
        DeleteRow: DeleteBasDepartmentRow
      }
    };
  },
  mounted() {
    this.$refs.table.GetData();
  }
};
</script>
