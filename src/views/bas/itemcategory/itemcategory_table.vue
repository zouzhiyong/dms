<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import {
  FindBasItemCategoryTable,
  DeleteBasItemCategoryRow
} from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "类别编码", width: "100", align: "" },
        { prop: "Name", label: "类别名称", width: "", align: "" },
        // { prop: "GroupName", label: "大类名称", width: "", align: "" },
        // { prop: "CategoryName", label: "小类名称", width: "", align: "" },
        { prop: "ParentName", label: "对应大类", width: "", align: "" },
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
          prop: "UPdateTime",
          label: "修改时间",
          width: "100",
          align: "",
          formatter: function(row, column) {
            return row.UPdateTime == null
              ? ""
              : new Date(row.UPdateTime).Format("yyyy-MM-dd");
          }
        }
      ],
      api: {
        FindTable: FindBasItemCategoryTable,
        DeleteRow: DeleteBasItemCategoryRow
      }
    };
  }
};
</script>