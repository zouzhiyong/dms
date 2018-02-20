<template>
  <div style="height:100%">
    <el-table :data="tableData" ref="table" size="small" border height="100%" show-summary :summary-method="getSummaries">
      <el-table-column type="index" width="60" header-align="center" align="center">
      </el-table-column>
      <template v-for="item in columns">
        <el-table-column v-if="item.types && item.types.toLowerCase()=='autocomplete' && item.visible!=false" :prop="item.prop" :width="item.width" :label="item.label" header-align="center" :align="item.align" :key="item.id">
          <template slot-scope="scope">
            <el-autocomplete :disabled="disabled" size="small" @blur="handleBlur(scope.row)" v-if="item.types && item.types.toLowerCase()=='autocomplete'" clearable popper-class="popperpurallbillautocomplete" v-model="scope.row[item.prop]" :fetch-suggestions="(x,y)=>{querySearch(item.prop+scope.$index,item.api,x,y)}" :placeholder="item.placeholder" :trigger-on-focus="false" @select="x=>{handleInputSelect(x,scope.row,scope.$index,item)}" @keyup.enter.native="enter($refs[item.next+(item.lastNext?scope.$index+1:scope.$index)],scope.row[item.MustIsValue] || !item.MustIsValue)" :ref="item.prop+scope.$index" style="width:100%">
              <template slot-scope="props">
                <div>{{ props.item.CodeTemplate }}</div>
              </template>
            </el-autocomplete>
          </template>
        </el-table-column>
        <el-table-column v-if="item.types && item.types.toLowerCase()=='select' && item.visible!=false" :prop="item.prop" :width="item.width" :label="item.label" header-align="center" :align="item.align" :key="item.id">
          <template slot-scope="scope">
            <el-select :disabled="disabled" size="small" @change="item.change?item.change(scope.row):''" v-model="scope.row[item.prop]" popper-class="popper" :placeholder="item.placeholder" @keyup.enter.native="enter($refs[item.next+(item.lastNext?scope.$index+1:scope.$index)],scope.row[item.MustIsValue] || !item.MustIsValue)" :ref="item.prop+scope.$index">
              <el-option v-for="item in scope.row[item.prop+'List']" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-if="item.types && item.types.toLowerCase()=='input' && item.visible!=false" :prop="item.prop" :width="item.width" :label="item.label" header-align="center" :align="item.align" :key="item.id">
          <template slot-scope="scope">
            <el-input :disabled="disabled" size="small" v-model="scope.row[item.prop]" :placeholder="item.placeholder" :ref="item.prop+scope.$index" @keyup.enter.native="enter($refs[item.next+(item.lastNext?scope.$index+1:scope.$index)],scope.row[item.MustIsValue] || !item.MustIsValue)"></el-input>
          </template>
        </el-table-column>
        <el-table-column v-if="item.types && item.types.toLowerCase()=='input-number' && item.visible!=false" :prop="item.prop" :width="item.width" :label="item.label" header-align="center" :align="item.align" :key="item.id">
          <template slot-scope="scope">
            <el-input-number :disabled="disabled" :min="0" :controls="false" style="width:100%" size="small" v-model="scope.row[item.prop]" :placeholder="item.placeholder" :ref="item.prop+scope.$index" @keyup.enter.native="enter($refs[item.next+(item.lastNext?scope.$index+1:scope.$index)],scope.row[item.MustIsValue] || !item.MustIsValue)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column class-name="cell-div" v-if="!item.types && item.visible!=false" :prop="item.prop" :width="item.width" :formatter="item.formatter" :label="item.label" header-align="center" :align="item.align" :key="item.id">
        </el-table-column>
      </template>
      <el-table-column label="操作" width="80" align="center" header-align="center" v-if="isOperate">
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
  // data() {
  //   return {
  //     tableData: []
  //   };
  // },
  props: {
    keys: { type: String },
    api: { type: Object },
    columns: { type: Array },
    isOperate: { default: false },
    disabled: { type: Boolean },
    tableData: { type: Array }
  },
  methods: {
    enter(vnode, MustIsValue) {
      if (!MustIsValue) return;
      let nextInput = vnode;
      if (nextInput) {
        nextInput[0].focus();
        if (nextInput[0].$refs.input) {
          if (
            nextInput[0].$refs.input.$refs.input &&
            typeof nextInput[0].$refs.input.$refs.input.select === "function"
          ) {
            nextInput[0].$refs.input.$refs.input.select();
          }
        }
      }
    },
    GetData() {
      let obj = {};
      this.columns.map(item => {
        obj[item.prop] = null;
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
    //离开焦点时将原来正确值重新赋值，避免出现错误的值
    handleBlur(row) {
      this.$emit("onblur", row);
    },
    querySearch(ref, api, queryString, cb) {
      this.$refs[ref][0].highlightedIndex = 0;
      api(queryString).then(result => {
        cb(result.data);
      });
    },
    handleInputSelect(value, row, index, item) {
      this.$emit("handleInputSelect", value, row, index, item);
      if (this.tableData.length == index + 1) {
        this.GetData();
      }
    },
    // handleSelect(row) {
    //   this.$emit("handleSelect", row);
    // },
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

.el-select-dropdown__item {
  text-align: center;
}

.el-input-number>>>.el-input__inner {
  text-align: right;
}

.el-select>>>.el-input .el-input__inner {
  text-align: center;
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

.el-table--small>>>.el-table__body-wrapper td.cell-div .cell {
  padding: 5px;
  background: #f5f7fa;
  height: 32px;
}

.el-select--small>>>.el-input,
.el-input-number>>>.el-input,
.el-autocomplete>>>.el-input {
  width: auto;
}

.el-table {
  height: 100%;
  box-sizing: content-box;
}

.el-table .el-input {
  width: 100%;
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