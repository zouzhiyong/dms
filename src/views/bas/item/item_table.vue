<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import { FindBasItemTable, DeleteBasItemRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "商品编码", width: "100", align: "" },
        { prop: "Name", label: "商品全称", width: "", align: "" },
        // { prop: "ShortName", label: "商品简称", width: "", align: "" },
        { prop: "BaseUOMName", label: "基本单位", width: "90", align: "" },
        {
          prop: "SaveInventory",
          label: "安全库存",
          width: "90",
          align: "right"
        },
        {
          prop: "IsBatch",
          label: "是否批次管理",
          width: "120",
          align: "center",
          formatter: function(row, column) {
            return row.IsBatch == 0 ? "否" : "是";
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
        },
        { prop: "UpdateUserName", label: "修改人", width: "90", align: "" },
        {
          prop: "CloseTime",
          label: "关闭时间",
          width: "100",
          align: "",
          formatter: function(row, column) {
            return row.CloseTime == null
              ? ""
              : new Date(row.CloseTime).Format("yyyy-MM-dd");
          }
        },
        { prop: "CloseUserName", label: "关闭人", width: "90", align: "" },
        { prop: "IsValid", label: "有效否", width: "90", align: "center" }
      ],
      api: {
        FindTable: FindBasItemTable,
        DeleteRow: DeleteBasItemRow
      }
    };
  }
};
</script>
