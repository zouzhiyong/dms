<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import { FindBasUserTable, DeleteBasUserRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "登录账号", width: "", align: "" },
        { prop: "UserName", label: "用户姓名", width: "", align: "" },
        { prop: "DeptName", label: "部门", width: "", align: "" },
        // { prop: "RightsName", label: "权限名称", width: "", align: "" },
        { prop: "Phone", label: "手机号码", width: "", align: "" },
        { prop: "EmpCategoryName", label: "人员类型", width: "", align: "" },
        { prop: "UpdateUser", label: "修改人", width: "", align: "" },
        {
          prop: "IsValid",
          label: "有效否",
          width: "80",
          align: "center"
          // formatter: function(row, column) {
          //   return row.IsValid == 0 ? "无效" : "有效";
          // }
        },
        {
          prop: "IsLockedout",
          label: "是否锁定",
          width: "80",
          align: "center"
        },
        {
          prop: "LastActiveTIme",
          label: "最后操作时间",
          width: "",
          align: "",
          formatter: function(row, column) {
            return row.LastActiveTIme
              ? new Date(row.LastActiveTIme).Format("yyyy-MM-dd hh:mm:ss")
              : "";
          }
        },
        {
          prop: "LastLoginDate",
          label: "最后登录时间",
          width: "",
          align: "",
          formatter: function(row, column) {
            return row.LastLoginDate
              ? new Date(row.LastLoginDate).Format("yyyy-MM-dd hh:mm:ss")
              : "";
          }
        }
      ],
      api: {
        FindTable: FindBasUserTable,
        DeleteRow: DeleteBasUserRow
      }
    };
  }
};
</script>
