<template>
  <div style="height:100%">
    <el-table :data="tableData" ref="table" size="small" border height="100%" show-summary :summary-method="getSummaries">
      <el-table-column type="index" width="70" header-align="center" align="center">
      </el-table-column>
      <el-table-column :prop="item.prop" :width="item.width" :formatter="item.formatter" :label="item.label" header-align="center" :align="item.align" v-if="item.visible!=false" v-for="item in columns" :key="item.id">
        <template slot-scope="scope">
          <el-autocomplete size="small" @blur="handleBlur(scope.row)" v-if="item.types && item.types.toLowerCase()=='autocomplete'" clearable popper-class="popperpurallbillautocomplete" v-model="scope.row[item.prop]" :fetch-suggestions="(x,y)=>{querySearch(item.prop+scope.$index,item.api,x,y)}" :placeholder="item.placeholder" :trigger-on-focus="false" @select="x=>{handleSelect(x,scope.row,scope.$index,item)}" :ref="item.prop+scope.$index" style="width:100%">
            <template slot-scope="props">
              <div>{{ props.item.CodeTemplate }}</div>
            </template>
          </el-autocomplete>
          <el-select size="small" v-else-if="item.types && item.types.toLowerCase()=='select'" v-model="scope.row[item.prop]" popper-class="popper" :placeholder="item.placeholder" :ref="item.prop+scope.$index" v-enter="item.next+(item.lastNext?scope.$index+1:scope.$index)">
            <el-option v-for="item in scope.row[item.prop+'List']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input size="small" v-else-if="item.types && item.types.toLowerCase()=='input'" v-model="scope.row[item.prop]" :placeholder="item.placeholder" :ref="item.prop+scope.$index" v-enter="item.next+(item.lastNext?scope.$index+1:scope.$index)"></el-input>
          <el-input-number :controls="false" style="width:100%" size="small" v-else-if="item.types && item.types.toLowerCase()=='input-number'" v-model="scope.row[item.prop]" :placeholder="item.placeholder" :ref="item.prop+scope.$index" v-enter="item.next+(item.lastNext?scope.$index+1:scope.$index)"></el-input-number>
          <div class="cell-div" v-else>{{scope.row[item.prop]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center" header-align="center" v-if="isOperate">
        <template slot-scope="scope">
          <span style="width:32px;display:inline-block">
            <el-button size="small" v-if="scope.row[keys] && scope.row[keys]!=''" type="text" icon="el-icon-delete" @click="handleDeleteClick(scope.$index,scope.row)"></el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  props: {
    keys: { type: String },
    api: { type: Object },
    columns: { type: Array },
    isOperate: { default: false }
  },
  methods: {
    GetData() {
      let obj = {};
      this.columns.map(item => {
        obj[item.prop] = "";
      });
      this.tableData.push(obj);
    },
    handleDeleteClick(index, row) {
      this.tableData.splice(index, 1);
      // this.$confirm("是否确认删除?", "提示", {
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.tableData.splice(index, 1);
      //   })
      //   .catch(() => {});
    },
    handleBlur(row) {
      this.$emit("onblur", row);
    },
    querySearch(ref, api, queryString, cb) {
      this.$refs[ref][0].highlightedIndex = 0;
      api(queryString).then(result => {
        cb(result.data);
      });
    },
    handleSelect(value, row, index, item) {
      this.$emit("handleSelect", value, row, index, item);
      if (this.tableData.length == index + 1) {
        this.GetData();
      }
    },
    getSummaries(param) {
      let result;
      this.$emit("summaries", param, x => {
        result = x;
      });
      return result;
    }
  }
};
</script>

<style scoped>
.el-autocomplete>>>.el-input__inner,
.el-input>>>.el-input__inner,
.el-input-number>>>.el-input__inner,
.el-select>>>.el-input .el-input__inner {
  border-color: transparent;
  /* padding: 0 10px; */
}

.el-autocomplete>>>.el-input__inner:focus,
.el-input>>>.el-input__inner:focus,
.el-input-number>>>.el-input__inner:focus,
.el-select>>>.el-input .el-input__inner:focus {
  border-color: #409eff;
  border-radius: 0;
  outline: 0;
}

/* .el-autocomplete>>>.el-input__inner:focus,
.el-input>>>.el-input__inner:focus,
.el-select>>>.el-input .el-input__inner:focus {
  background: rgb(245, 239, 230);
} */

.el-table--small>>>.el-table__footer-wrapper .el-table__footer .has-gutter {
  font-weight: bold;
}

.el-table--small>>>.el-table__footer-wrapper .el-table__footer .has-gutter td {
  border-right: none;
  color: #000;
}

.el-table--enable-row-hover>>>.el-table__body-wrapper
  .el-table__body
  tr:hover
  > td {
  background-color: #fff;
}

.el-table--small>>>.el-table__body-wrapper td,
.el-table--small>>>.el-table__body-wrapper td .cell {
  padding: 0;
}
.cell-div {
  padding: 5px;
}
.el-select>>>.el-input {
  width: auto;
}

.el-table {
  height: 100%;
}
</style>

<style>
.popperpurallbillautocomplete {
  width: auto !important;
}

.el-popper[x-placement^="bottom"].popper .popper__arrow {
  display: none;
}

.el-popper[x-placement^="bottom"].popper {
  margin-top: 0;
}
</style>