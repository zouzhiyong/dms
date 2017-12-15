<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import {
  FindBasComoditieTypeTable,
  DeleteBasComoditieTypeRow
} from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "TypeCode", label: "类别编码", width: "", align: "" },
        { prop: "TypeName", label: "类别名称", width: "", align: "" },
        { prop: "ParentID", label: "上级类别", width: "", align: "" },
        {
          prop: "IsValid",
          label: "有效否",
          width: "",
          align: "center",
          formatter: function(row, column) {
            return row.IsValid == 0 ? "无效" : "有效";
          }
        },
        { prop: "ModifyDate", label: "修改时间", width: "", align: "" },
        { prop: "Remark", label: "说明", width: "", align: "" }
      ],
      api: {
        FindTable: FindBasComoditieTypeTable,
        DeleteRow: DeleteBasComoditieTypeRow
      }
    };
  },
  mounted() {
    this.$refs.table.GetData();
  }
};
</script>
