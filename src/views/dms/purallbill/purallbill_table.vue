<template>
  <cust-table ref="table" :columns="columns" :api="api" keys="Code" :isOperate="true" @summaries="getSummaries" @handleSelect="handleSelect" @onblur="onblur"></cust-table>
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
          types: "input-number",
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

      let nextInput = this.$refs.table.$refs[item.next + index][0];
      nextInput.focus();
      nextInput.$refs.input.$refs.input.select();
    },
    onblur(row) {
      row.CodeName = row.Code;
    },
    getSummaries(param, callback) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        let prop = column.property;
        if (prop == "CodeName") {
          let arr = data.filter(item => {
            return item.Code != "";
          });
          sums[index] = "合计 " + arr.length + " 种商品";
          return;
        }

        if (prop == "sl") {
          const values = data.map(item => Number(item[prop]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2);
        }

        if (prop == "je") {
          const values = data.map(item => Number(item[prop]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = "￥" + sums[index].toFixed(2);
        }
      });
      callback(sums);
    }
  }
};
</script>
