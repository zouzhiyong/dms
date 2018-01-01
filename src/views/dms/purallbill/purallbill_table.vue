<template>
  <cust-table ref="table" :columns="columns" :api="api" keys="Code" :isOperate="true" @handleSelect="handleSelect" @onblur="onblur"></cust-table>
</template>
<script>
import { FindDmsPurallComoditie } from "../../../api/api";
import custTable from "./../../layout/layout_table_bill";
export default {
  components: {
    custTable
  },
  data() {
    return {
      columns: [
        {
          prop: "CodeName",
          label: "商品编码",
          width: "150",
          align: "",
          types: "autocomplete",
          api: FindDmsPurallComoditie,
          placeholder: "商品编码、名称",
          next: "sl"
        },
        {
          prop: "Code",
          label: "商品名称",
          width: "300",
          align: "",
          visible: false
        },
        {
          prop: "FullName",
          label: "商品名称",
          width: "300",
          align: ""
          // visible: false
        },
        { prop: "Barcode", label: "商品条码", width: "100", align: "" },
        {
          prop: "UnitID",
          label: "单位",
          width: "100",
          align: "",
          types: "select"
        },
        { prop: "kc", label: "库存", width: "100", align: "" },
        {
          prop: "sl",
          label: "数量",
          width: "100",
          align: "right",
          types: "input",
          placeholder: "",
          next: "bz",
          placeholder: "数量"
        },
        { prop: "je", label: "金额", width: "100", align: "right" },
        {
          prop: "bz",
          label: "备注",
          width: "",
          align: "",
          types: "input",
          next: "CodeName",
          lastNext: true,
          placeholder: "备注"
        }
      ],
      api: {}
    };
  },
  mounted() {
    this.$refs.table.GetData();
  },
  methods: {
    handleSelect(value, row, index, item) {
      for (var i in value) {
        row[i] = value[i];
      }
      row.CodeName = value.Code;
      row.UnitID = 1;
    },
    onblur(row) {
      row.CodeName = row.Code;
    }
  }
};
</script>
