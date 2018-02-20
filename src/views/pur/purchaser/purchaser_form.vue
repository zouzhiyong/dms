<template>
  <el-form :inline="true" size="small" :model="formInline" label-width="70px" class="demo-form-inline" style="height:100%">
    <el-row style="padding: 5px 0;">
      <el-form-item label="供 应 商">
        <el-select ref="SupplierID" v-model="formInline.SupplierID" placeholder="供应商">
          <el-option v-for="item in formInline.SupplierIDList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采 购 员">
        <el-select ref="PurchaserID" v-model="formInline.PurchaserID" placeholder="采购员">
          <el-option v-for="item in formInline.PurchaserIDList" :key="item.value" :label="item.label" :value="item.value">
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
        <el-date-picker ref="BillDate" :readonly="true" v-model="formInline.BillDate" type="date" :editable="false" :clearable="false" placeholder="订单日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="过账日期">
        <el-date-picker ref="PostDate" :readonly="true" v-model="formInline.PostDate" type="date" :editable="false" :clearable="false" placeholder="过账日期">
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
      <el-form-item label="制 单 人">
        <el-select :disabled="true" v-model="formInline.CreateUserID " placeholder="制单人">
          <el-option v-for="item in formInline.CustList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修 改 人">
        <el-select :disabled="true" v-model="formInline.UpdateUserID " placeholder="修改人">
          <el-option v-for="item in formInline.CustList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审 批 人">
        <el-select :disabled="true" v-model="formInline.ConfirmUserID " placeholder="审批人">
          <el-option v-for="item in formInline.CustList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备　　注">
        <el-input ref="Remark" v-model="formInline.Remark" placeholder="备注" @keyup.enter.native="enter($refs.tablebill.$refs.table.$refs[ 'Code0'][0])" style="width: 632px;"></el-input>
      </el-form-item>
      <el-form-item label="单 据 号" v-if="formInline.Code!=null">
        {{formInline.Code}}
      </el-form-item>
    </el-row>
    <div style="height:calc(100% - 195px) ">
      <cust-table ref="table" :tableData="formInline.OrderDetail" :columns="columns" :disabled="false" :api="api" keys="Code" :isOperate="true" @summaries="getSummaries" @handleInputSelect="handleInputSelect" @onblur="onblur"></cust-table>
    </div>
    <div style="padding: 20px 0;text-align:center ">
      <el-button type="primary " size="medium " accesskey="S " @click="handleSave ">保存 (S)</el-button>
      <el-button type="primary " size="medium " accesskey="G ">审核 (G)</el-button>
    </div>
  </el-form>
</template>

<script>
import {
  FindPurOrderForm,
  FindPurOrderItem,
  SavePurOrderForm
} from "../../../api/api";
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
      columns: [
        {
          prop: "Code",
          label: "商品编码",
          width: "130",
          align: "",
          types: "autocomplete",
          api: FindPurOrderItem,
          placeholder: "商品编码、名称",
          next: "UnitAmount",
          MustIsValue: "ItemID" //必须有值回车才生效
        },
        {
          prop: "Name",
          label: "商品名称",
          width: "250",
          align: ""
        },
        {
          prop: "IsGift",
          label: "是否赠品",
          width: "100",
          align: "",
          types: "select"
        },
        {
          prop: "UomID",
          label: "单位",
          width: "90",
          align: "",
          types: "select",
          change: row => {
            row.UomIDList.map(item => {
              if (row.UomID == item.value) {
                row.UnitAmount = item.PurchasePrice;
              }
            });
          }
        },
        {
          prop: "UnitAmount",
          label: "单价",
          width: "70",
          align: "right",
          types: "input-number",
          next: "BillQty",
          placeholder: "单价"
        },
        {
          prop: "BillQty",
          label: "订单数量",
          width: "80",
          align: "right",
          types: "input-number",
          next: "Code",
          lastNext: true,
          placeholder: "订单数量"
        },
        {
          prop: "OperQty",
          label: "操作数量",
          width: "80",
          align: "right",
          placeholder: "操作数量",
          formatter: (row, column) => {
            return row.OperQty == null ? 0 : row.OperQty;
          }
        },
        {
          prop: "BalanceQty",
          label: "剩余数量",
          width: "80",
          align: "right",
          placeholder: "操作数量",
          formatter: (row, column) => {
            row.BalanceQty = Number(row.BillQty) - Number(row.OperQty);
            return row.BalanceQty;
          }
        },
        {
          prop: "WarehouseID",
          label: "仓库",
          width: "100",
          align: "",
          types: "select"
        },
        {
          prop: "Amount",
          label: "金额",
          width: "80",
          align: "right",
          formatter: (row, column) => {
            row.Amount = (
              parseFloat(row.BillQty) * parseFloat(row.UnitAmount)
            ).toFixed(2);
            return row.Amount;
            // return (
            //   parseFloat(row.BillQty) * parseFloat(row.UnitAmount).toFixed(2)
            // );
          }
        },
        {
          prop: "Remark",
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
  props: {
    billtype: { type: Number }
  },
  computed: {
    OrderDetail() {
      let DetailData = JSON.parse(JSON.stringify(this.formInline.OrderDetail));
      let arr = DetailData.filter((item, index) => {
        item.RowID = index + 1;
        item.Amount = parseFloat(item.Amount);
        return item.ItemID;
      });
      return arr;
    }
  },
  created() {
    let row = { POID: 0, BillType: this.billtype };
    FindPurOrderForm(row).then(result => {
      result.data.SupplierIDList.splice(0, 0, this.obj);
      result.data.TruckIDList.splice(0, 0, this.obj);
      result.data.DriverIDList.splice(0, 0, this.obj);
      result.data.PurchaserIDList.splice(0, 0, this.obj);
      this.formInline = result.data;
      this.dialogVisible = true;
    });
  },
  mounted() {},
  methods: {
    handleSave() {
      //判断是否有明细
      if (this.OrderDetail.length == 0) {
        this.$message.error("单据明细不能为空");
        return;
      }

      //判断是否有数量为0的行，有则提示
      let arr = this.OrderDetail.filter(item => {
        return item.BillQty == 0;
      });
      if (arr.length > 0) {
        this.$message.error("有 " + arr.length + " 条记录订单数量为0");
        return;
      }

      //判断供应商是否为空
      if (this.formInline.SupplierID == null) {
        this.$message.error("供应商不能为空");
        return;
      }

      let SaveData = JSON.parse(JSON.stringify(this.formInline));
      SaveData.OrderDetail = this.OrderDetail;
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
      SavePurOrderForm(SaveData).then(result => {
        this.formInline.POID = result.data.POID;
        this.formInline.Code = result.data.Code;
        this.formInline.CreateTime = result.data.CreateTime;
        this.formInline.BillDate = result.data.BillDate;
        this.formInline.Status = result.data.Status;
        this.formInline.OrderDetail.map(item => {
          item.POID = result.data.POID;
        });
      });
      // } else {
      //   return false;
      // }
      //});
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
    handleInputSelect(value, row, index, item) {
      let arr = this.OrderDetail.filter(item => {
        return item.ItemID == value.ItemID;
      });
      if (arr.length > 0) {
        this.$confirm("当前商品记录重复, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.handleInputSelectCall(value, row, index, item);
          })
          .catch(() => {
            return;
          });
      } else {
        this.handleInputSelectCall(value, row, index, item);
      }
    },
    handleInputSelectCall(value, row, index, item) {
      row.Code = value.Code;
      row.CodeCopy = row.Code; //在未取到商品时离开焦点可将此值赋予正确值
      row.Name = value.Name;
      row.ItemID = value.ItemID;
      row.WarehouseIDList = value.WarehouseIDList;
      row.UomIDList = value.UomIDList;
      //先取基本单位，如果有采购单位就取采购单位
      value.UomIDList.map(item => {
        if (item.UomType == 1) {
          row.UomID = item.value;
          row.UnitAmount = item.PurchasePrice;
        }
        if (item.IsPurchaseUOM == 1) {
          row.UomID = item.value;
          row.UnitAmount = item.PurchasePrice;
        }
      });

      row.WarehouseID =
        value.WarehouseIDList.length > 0
          ? value.WarehouseIDList[0].value
          : null;
      row.IsGiftList = [{ label: "否", value: 0 }, { label: "是", value: 1 }];
      row.IsGift = row.IsGiftList.length > 0 ? row.IsGiftList[0].value : null;

      let curInput = this.$refs.table.$refs[item.prop + index][0];
      curInput.focus();
      curInput.$refs.input.$refs.input.select();
    },
    onblur(row) {
      row.Code = row.CodeCopy;
    },
    getSummaries(param, callback) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        let prop = column.property;
        if (prop == "Code") {
          let arr = data.filter(item => {
            return item.ItemID;
          });
          sums[index] = "合计 " + arr.length + " 种商品";
          return;
        }

        if (prop == "BillQty") {
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

        if (prop == "UnitAmount" || prop == "Amount") {
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
  width: 155px;
}
</style>