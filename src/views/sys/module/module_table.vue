<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import { FindSysMoudleTable, DeleteSysMoudleRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "模块编码", width: "100", align: "left" },
        { prop: "ParentCode", label: "上级编码", width: "100", align: "left" },
        { prop: "Name", label: "模块名称", width: "180", align: "" },
        { prop: "URL", label: "模块路径", width: "180", align: "" },
        { prop: "ICON", label: "图标", width: "", align: "" },
        {
          prop: "IsMenu",
          label: "是否菜单",
          width: "",
          align: "center",
          formatter: function(row, column) {
            return row.IsMenu == 0 ? "否" : "是";
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
        },
        { prop: "Sequence", label: "显示顺序", width: "", align: "right" }
      ],
      api: {
        FindTable: FindSysMoudleTable,
        DeleteRow: DeleteSysMoudleRow
      }
    };
  }
};
</script>
