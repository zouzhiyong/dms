<template>
  <el-form :inline="true" size="small" :model="formInline" label-width="70px" class="demo-form-inline" style="height:100%">
    <el-row style="padding: 5px 0;">
      <el-form-item label="供 应 商">
        <el-select ref="SupplierID" v-model="formInline.SupplierID" placeholder="供应商">
          <el-option v-for="item in formInline.SupplierIDList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单类型">
        <el-select :disabled="true" v-model="formInline.BillType" placeholder="订单类型">
          <el-option v-for="item in formInline.BillTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单日期">
        <el-date-picker ref="BillDate" v-model="formInline.BillDate" type="date" :editable="false" :clearable="false" placeholder="订单日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="过账日期">
        <el-date-picker ref="PostDate" v-model="formInline.PostDate" type="date" :editable="false" :clearable="false" placeholder="过账日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="车　　辆">
        <el-select v-model="formInline.TruckID " placeholder="车辆 ">
          <el-option v-for="item in formInline.TruckIDList " :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="司　　机">
        <el-select v-model="formInline.DriverID " placeholder="司机 ">
          <el-option v-for="item in formInline.DriverIDList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采 购 员">
        <el-select v-model="formInline.PurchaserID " placeholder="采购员">
          <el-option v-for="item in formInline.PurchaserIDList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发货">
        <el-select :disabled="true" v-model="formInline.IsStockFinished" placeholder="是否发货">
          <el-option v-for="item in formInline.IsStockFinishedList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状　　态">
        <el-select :disabled="true" v-model="formInline.Status" placeholder="状态">
          <el-option v-for="item in formInline.StatusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备　　注">
        <el-input ref="Remark" v-model="formInline.Remark" placeholder="备注" @keyup.enter.native="enter($refs.tablebill.$refs.table.$refs[ 'CodeName0'][0])" style="width: 617px;"></el-input>
      </el-form-item>
    </el-row>
    <div style="height:calc(100% - 150px) ">
      <!-- <cust-table ref="table" :columns="columns" :disabled="false" :api="api" keys="Code" :isOperate="true" @summaries="getSummaries" @handleSelect="handleSelect" @onblur="onblur"></cust-table> -->
    </div>
    <div style="padding: 20px 0;text-align:center ">
      <el-button type="primary " size="medium " accesskey="S " @click="handleSave ">保存 (S)</el-button>
      <el-button type="primary " size="medium " accesskey="G ">审核 (G)</el-button>
    </div>
  </el-form>
</template>

<script>
import { FindPurOrderForm } from "../../../api/api";
import custTable from "./../../layout/layout_table_bill";
export default {
  components: {
    custTable
  },
  data() {
    return {
      obj: {
        label: "--请选择--",
        value: null
      },
      formInline: {},
      // columns: [
      //   {
      //     prop: "CodeName",
      //     label: "商品编码",
      //     width: "150",
      //     align: "",
      //     types: "autocomplete",
      //     api: FindDmsPurallComoditie,
      //     placeholder: "商品编码、名称",
      //     next: "sl"
      //   },
      //   {
      //     prop: "Code",
      //     label: "商品名称",
      //     width: "300",
      //     align: "",
      //     visible: false
      //   },
      //   {
      //     prop: "FullName",
      //     label: "商品名称",
      //     width: "300",
      //     align: ""
      //     // visible: false
      //   },
      //   { prop: "Barcode", label: "商品条码", width: "100", align: "" },
      //   {
      //     prop: "UnitID",
      //     label: "单位",
      //     width: "100",
      //     align: "",
      //     types: "select"
      //   },
      //   { prop: "kc", label: "库存", width: "100", align: "" },
      //   {
      //     prop: "sl",
      //     label: "数量",
      //     width: "100",
      //     align: "right",
      //     types: "input-number",
      //     placeholder: "",
      //     next: "CodeName",
      //     lastNext: true,
      //     placeholder: "数量"
      //   },
      //   { prop: "je", label: "金额", width: "100", align: "right" },
      //   {
      //     prop: "bz",
      //     label: "备注",
      //     width: "",
      //     align: "",
      //     types: "input",
      //     // next: "CodeName",
      //     // lastNext: true,
      //     placeholder: "备注"
      //   }
      //],
      api: {}
    };
  },
  created() {
    let row = { POID: 0 };
    FindPurOrderForm(row).then(result => {
      this.formInline = result.data;
      this.formInline.SupplierIDList.splice(0, 0, this.obj);
      this.formInline.TruckIDList.splice(0, 0, this.obj);
      this.formInline.DriverIDList.splice(0, 0, this.obj);
      this.formInline.PurchaserIDList.splice(0, 0, this.obj);

      this.dialogVisible = true;
    });
  },
  mounted() {
    //console.log(this.$refs.SupplierID);
    //this.$refs.table.GetData();
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
  margin-bottom: 10px;
}

.el-form>>>.el-input--suffix>>>.el-input__inner {
  padding-right: 15px;
}

.el-form>>>.el-input {
  width: 150px;
}

.el-form>>>.el-input {
  width: 150px;
}
</style>