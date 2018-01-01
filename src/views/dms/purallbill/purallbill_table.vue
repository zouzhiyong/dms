<template>
  <cust-table ref="table" :columns="columns" :api="api" keys="FullName" :isOperate="true" @handleSelect="handleSelect"></cust-table>
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
          prop: "Code",
          label: "商品编码",
          width: "200",
          align: "",
          types: "autocomplete",
          api: FindDmsPurallComoditie,
          placeholder: "商品编码、名称",
          next: "sl"
        },
        { prop: "FullName", label: "商品名称", width: "300", align: "" },
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
          next: "Code",
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
    handleSelect(value, item, index) {
      for (var i in value) {
        item[i] = value[i];
      }
      item.UnitID = 1;
    }
  }
};
</script>
