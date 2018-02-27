<template>
  <el-form :inline="true" size="small" :model="formInline" label-width="70px" class="demo-form-inline" style="height:100%">
    <el-row style="padding: 5px 0;">
      <el-form-item label="供 应 商">
        <el-select :disabled="disabled" ref="SupplierID" v-model="formInline.SupplierID" placeholder="供应商">
          <el-option v-for="item in formInline.SupplierIDList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采 购 员">
        <el-select :disabled="disabled" ref="PurchaserID" v-model="formInline.PurchaserID" placeholder="采购员">
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
        <el-input :disabled="true" v-model="formInline.BillDate" placeholder="订单日期"></el-input>

        <!-- <el-date-picker ref="BillDate" v-model="formInline.BillDate" type="date" :editable="false" :clearable="false" placeholder="订单日期">
        </el-date-picker> -->
      </el-form-item>
      <el-form-item label="过账日期">
        <el-input :disabled="true" v-model="formInline.PostDate" placeholder="过账日期"></el-input>
        <!-- <el-date-picker ref="PostDate" :readonly="true" v-model="formInline.PostDate" type="date" :editable="false" :clearable="false" placeholder="过账日期">
        </el-date-picker> -->
      </el-form-item>
      <el-form-item label="车　　辆">
        <el-select :disabled="disabled" v-model="formInline.TruckID " placeholder="车辆 ">
          <el-option v-for="item in formInline.TruckIDList " :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :disabled="disabled" label="司　　机">
        <el-select :disabled="disabled" v-model="formInline.DriverID " placeholder="司机 ">
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
        <el-input :disabled="disabled" ref="Remark" v-model="formInline.Remark" placeholder="备注" @keyup.enter.native="enter($refs.tablebill.$refs.table.$refs[ 'Code0'][0])" style="width: 632px;"></el-input>
      </el-form-item>
      <el-form-item label="单 据 号" v-if="formInline.Code!=null">
        {{formInline.Code}}
      </el-form-item>
    </el-row>
    <div style="height:calc(100% - 195px) ">
      <cust-table ref="table" :formInline="formInline" :tableData="formInline.OrderDetail" :columns="columns" :disabled="disabled" :api="api" keys="Code" :isOperate="true" @summaries="getSummaries" @handleInputSelect="handleInputSelect" @onblur="onblur"></cust-table>
    </div>
    <div style="padding: 20px 0;text-align:center ">
      <cust-button>
        <el-button slot="newButton" v-if="formInline.Status>0" type="primary" icon="el-icon-news" size="medium" @click="handleNew">新建</el-button>
        <el-button slot="saveButton" v-if="formInline.Status<=1" type="primary" icon="fa fa-floppy-o" size="medium" @click="handleSave">保存</el-button>
        <el-button slot="auditButton" v-if="formInline.Status<=1" type="primary" icon="fa fa-floppy-o" size="medium" @click="handleAudit">审核</el-button>
      </cust-button>
    </div>
  </el-form>
</template>

<script>
import {
  FindPurOrderForm,
  FindPurOrderItem,
  SavePurOrderForm,
  AuditPurOrderForm
} from "../../../api/api";
import custTable from "./../../layout/layout_table_bill";
import custButton from "./../../layout/layout_button";
export default {
  components: {
    custTable,
    custButton
  },
  data() {
    return {
      obj: {
        label: "--请选择--",
        value: null
      },
      disabled: false,
      BillTypeList: [
        { label: "采购订单", value: 1 },
        { label: "采购退货单", value: -1 }
      ],
      StatusList: [
        { label: "打开", value: 0 },
        { label: "保存", value: 1 },
        { label: "审核", value: 2 },
        { label: "完成", value: 3 }
      ],
      IsStockFinishedList: [
        { label: "未完成", value: 0 },
        { label: "已完成", value: 1 }
      ],
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
          next: "BillQty",
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
          types: "switch"
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
          width: "80",
          align: "right",
          types: "input-number",
          next: "BillQty",
          placeholder: "单价"
        },
        {
          prop: "BillQty",
          label: "订单数量",
          width: "90",
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
            let OperQty = row.OperQty == null ? 0 : row.OperQty;
            return OperQty.toFixed(2); //.replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //使用正则替换，每隔三个数加一个','
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
            let BalanceQty = row.BalanceQty == null ? 0 : row.BalanceQty;
            return BalanceQty.toFixed(2); //使用正则替换，每隔三个数加一个','
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
          width: "100",
          align: "right",
          formatter: (row, column) => {
            row.Amount = (
              parseFloat(row.BillQty) * parseFloat(row.UnitAmount)
            ).toFixed(2);
            return row.Amount;
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
        },
        {
          label: "操作",
          width: "80",
          align: "center",
          types: "isOperate",
          key: "ItemID"
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
    let row = { POID: 0 };
    this.iniData(row);
  },
  methods: {
    iniData(row) {
      this.formInline = {};
      row.BillType = this.billtype;
      FindPurOrderForm(row).then(result => {
        result.data.BillTypeList = this.BillTypeList;
        result.data.StatusList = this.StatusList;
        result.data.IsStockFinishedList = this.IsStockFinishedList;
        result.data.SupplierIDList.splice(0, 0, this.obj);
        result.data.TruckIDList.splice(0, 0, this.obj);
        result.data.DriverIDList.splice(0, 0, this.obj);
        result.data.PurchaserIDList.splice(0, 0, this.obj);
        this.formInline = result.data;
        this.formInline.BillDate = new Date(this.formInline.BillDate).Format(
          "yyyy-MM-dd"
        );
        this.formInline.ConfirmTime = new Date(
          this.formInline.ConfirmTime
        ).Format("yyyy-MM-dd");

        //如果为状态为保存，则明细新增空行
        if (result.data.Status == 1) {
          this.$nextTick(item => {
            this.$refs.table.GetData();
          });
        }

        if (result.data.Status > 1) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      });
    },
    handleNew() {
      let row = { POID: 0 };
      this.iniData(row);
    },
    handleSave() {
      //判断供应商是否为空
      if (this.formInline.SupplierID == null) {
        this.$message.error("供应商不能为空");
        return;
      }

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

      let SaveData = JSON.parse(JSON.stringify(this.formInline));
      SaveData.OrderDetail = this.OrderDetail;
      SavePurOrderForm(SaveData).then(result => {
        let row = { POID: result.data.POID };
        this.iniData(row);
      });
    },
    handleAudit() {
      let SaveData = JSON.parse(JSON.stringify(this.formInline));
      SaveData.OrderDetail = this.OrderDetail;
      AuditPurOrderForm(SaveData).then(result => {
        let row = { POID: result.data.POID };
        this.iniData(row);
      });
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
        return item.ItemID == value.ItemID && item.ItemID != row.ItemID;
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

      // row.IsGift = row.IsGiftList.length > 0 ? row.IsGiftList[0].value : null;

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
          sums[index] = sums[index]
            .toFixed(2)
            .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
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
          sums[index] =
            "￥" +
            sums[index]
              .toFixed(2)
              .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
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