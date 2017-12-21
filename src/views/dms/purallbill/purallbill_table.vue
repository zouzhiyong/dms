<template>
  <el-table ref="table" :data="tableData" border style="width: 100%" height="100%" size="small">
    <el-table-column type="index" width="50" header-align="center">
    </el-table-column>
    <el-table-column label="商品编号" width="200" header-align="center">
      <template slot-scope="scope">
        <el-autocomplete clearable 
        popper-class="popperpurallbillautocomplete" 
        v-model="scope.row.code" 
        :fetch-suggestions="querySearch" 
        placeholder="商品编码、名称" 
        :trigger-on-focus="false" 
        @select="x=>{handleSelect(x,scope.row,scope.$index)}" 
        v-enter="'dw'+scope.$index"
        :ref="'code'+scope.$index"
        style="width:100%">
          <template slot-scope="props">            
            <div>{{ props.item.Code+" "+props.item.FullName }}</div>
        </template>
        </el-autocomplete>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="商品名称" width="300" header-align="center">
    </el-table-column>
    <el-table-column prop="barcode" label="条码" width="100" header-align="center">
    </el-table-column>
    <el-table-column label="单位" width="100" header-align="center">
      <template slot-scope="scope">
        <el-select v-model="scope.row.dw" placeholder="单位" :ref="'dw'+scope.$index" v-enter="'sl'+scope.$index" >
          <el-option
            v-for="item in scope.row.dwList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="kc" label="库存" width="100" header-align="center">
    </el-table-column>
    <el-table-column label="数量" width="100" header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.sl" placeholder="数量" :ref="'sl'+scope.$index" v-enter="'bz'+scope.$index"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="je" label="金额" width="100" header-align="center">
    </el-table-column>
    <el-table-column label="备注" width="" header-align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.bz" placeholder="备注" :ref="'bz'+scope.$index" v-enter="'code'+(scope.$index+1)"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { FindDmsPurallComoditie } from "../../../api/api";
export default {
  data() {
    return {
      restaurants: [],
      iniData: {
        code: "",
        name: "",
        barcode: "",
        dwList: [],
        dw: ""
      },
      tableData: [],
      currentRow: null
    };
  },
  directives: {
    enter: {
      bind: function(el, { value }, vnode) {
        el.addEventListener("keyup", ev => {
          if (ev.keyCode === 13) {
            let nextInput = vnode.context.$refs[value];
            if (nextInput && typeof nextInput.focus === "function") {
              nextInput.focus();
            }
          }
        });
      }
    }
  },
  created() {
    this.tableData.push(JSON.parse(JSON.stringify(this.iniData)));
  },
  mounted() {},
  methods: {
    querySearch(queryString, cb) {
      FindDmsPurallComoditie(queryString).then(result => {
        cb(result.data);
      });
    },
    handleSelect(value, item, index) {
      // console.log(item);
      item.code = value.Code;
      item.name = value.FullName;
      item.barcode = value.Barcode;
      item.dwList = value.UnitList;
      item.dw = 1;

      if (this.tableData.length >= index) {
        this.tableData.push(JSON.parse(JSON.stringify(this.iniData)));
      }
    }
  }
};
</script>
<style scoped>
.el-autocomplete>>>.el-input__inner,
.el-input>>>.el-input__inner,
.el-select>>>.el-input .el-input__inner {
  border: none;
}

.el-table--enable-row-hover>>>.el-table__body-wrapper
  .el-table__body
  tr:hover
  > td {
  background-color: #fff;
}
.el-table--small>>>.el-table__body-wrapper td {
  padding: 0;
}

.el-select>>>.el-input {
  width: auto;
}
.el-table {
  height: calc(100% - 40px);
}
</style>
<style>
.popperpurallbillautocomplete {
  width: auto !important;
}
</style>
