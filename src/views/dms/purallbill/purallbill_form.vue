<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline" style="height:100%">
    <div style="padding: 5px 0;">
      <el-form-item label="供货单位">
        <el-input ref="ghdw" v-model="formInline.ghdw" placeholder="供货单位" :autofocus="true" @keyup.enter.native="enter($refs['shck'])" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="收货仓库">
        <el-input ref="shck" v-model="formInline.shck" placeholder="收货仓库" @keyup.enter.native="enter($refs.table.$refs['CodeName0'][0])" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="收货日期">
        <el-date-picker ref="jhrq" v-model="formInline.jhrq" type="date" :editable="false" :clearable="false" placeholder="交货日期" style="width: 150px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="单据类型">
        <el-select :disabled="true" v-model="formInline.type" placeholder="单据类型">
          <el-option v-for="item in formInline.typeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单据状态">
        <el-select :disabled="true" v-model="formInline.status" placeholder="单据状态">
          <el-option v-for="item in formInline.statusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <div style="padding: 5px 0;">
      <el-form-item label="备　　注">
        <el-input ref="bz" v-model="formInline.bz" placeholder="备注" @keyup.enter.native="enter($refs.tablebill.$refs.table.$refs['CodeName0'][0])" style="width: 606px;"></el-input>
      </el-form-item>
    </div>
    <div style="height:calc(100% - 150px)">
      <cust-table ref="table" :columns="columns" :disabled="false" :api="api" keys="Code" :isOperate="true" @summaries="getSummaries" @handleSelect="handleSelect" @onblur="onblur"></cust-table>
    </div>
    <div style="padding: 20px 0;text-align:center">
      <el-button type="primary" size="medium" accesskey="S" @click="handleSave">保存 (S)</el-button>
      <el-button type="primary" size="medium" accesskey="G">审核 (G)</el-button>
    </div>
  </el-form>
</template>

<script>
import { FindBasRegionList, FindDmsPurallComoditie } from "../../../api/api";
import custTable from "./../../layout/layout_table_bill";
export default {
  components: {
    custTable
  },
  data() {
    return {
      RegionList: [],
      formInline: {
        CustomerName: "",
        RegionName: [],
        Region: "",
        typeList: [{ value: "0", label: "进货单" }],
        type: "0",
        statusList: [{ value: "0", label: "新增" }],
        status: "0",
        jhrq: new Date()
      },
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
          next: "CodeName",
          lastNext: true,
          placeholder: "数量"
        },
        { prop: "je", label: "金额", width: "100", align: "right" },
        {
          prop: "bz",
          label: "备注",
          width: "",
          align: "",
          types: "input",
          // next: "CodeName",
          // lastNext: true,
          placeholder: "备注"
        }
      ],
      api: {}
    };
  },
  created() {},
  mounted() {
    this.$refs.table.GetData();
  },
  methods: {
    handleSave() {
      // console.log(this.$refs.tablebill.saveData);
    },
    enter(vnode) {
      //日期跳至表格中控件
      let nextInput = vnode;
      if (nextInput) {
        nextInput.focus();
        if (
          nextInput.$refs.input &&
          typeof nextInput.$refs.input.select === "function"
        ) {
          nextInput.$refs.input.select();
        }
      }
    },
    handleSelect(value, row, index, item) {
      for (var i in value) {
        row[i] = value[i];
      }
      row.CodeName = value.Code;
      row.UnitID = 1;

      let curInput = this.$refs.table.$refs[item.prop + index][0];
      curInput.focus();
      curInput.$refs.input.$refs.input.select();
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
<style scoped>
.el-form-item {
  margin-bottom: 0;
}

.el-select>>>.el-input {
  width: 100px;
}
</style>