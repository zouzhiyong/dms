<template>
  <custtable ref="table" :columns="columns" :api="api" :isOperate="true"></custtable>
</template>

<script>
import { FindBasComoditieTable, DeleteBasComoditieRow } from "../../../api/api";
import custtable from "./../../layout/layout_table";
export default {
  components: {
    custtable
  },
  data() {
    return {
      columns: [
        { prop: "Code", label: "商品编码", width: "180", align: "" },
        { prop: "FullName", label: "商品全称", width: "180", align: "" },
        { prop: "ShorName", label: "商品简称", width: "180", align: "" },
        { prop: "BrandID", label: "品牌", width: "", align: "" },
        { prop: "RecPrice", label: "进货价", width: "", align: "" },
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
        FindTable: FindBasComoditieTable,
        DeleteRow: DeleteBasComoditieRow
      }
    };
  }
};
</script>
