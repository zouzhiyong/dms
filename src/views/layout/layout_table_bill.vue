<template>
  <div style="height:100%">
    <el-table :data="tableData" ref="table" size="small" border height="100%">
      <el-table-column type="index" width="50" header-align="center">
      </el-table-column>
      <el-table-column :prop="item.prop" :width="item.width" :formatter="item.formatter" :label="item.label" header-align="center" :align="item.align" v-if="item.visible!=false" v-for="item in columns" :key="item.id">
        <template slot-scope="scope">
          <el-autocomplete @blur="handleBlur(scope.row)" v-if="item.types && item.types.toLowerCase()=='autocomplete'" clearable popper-class="popperpurallbillautocomplete" v-model="scope.row[item.prop]" :fetch-suggestions="(x,y)=>{querySearch(item.prop+scope.$index,item.api,x,y)}" :placeholder="item.placeholder" :trigger-on-focus="false" @select="x=>{handleSelect(x,scope.row,scope.$index,item)}" v-enter="item.next+scope.$index" :ref="item.prop+scope.$index" style="width:100%">
            <template slot-scope="props">
              <div>{{ props.item.CodeTemplate }}</div>
            </template>
          </el-autocomplete>
          <el-select v-else-if="item.types && item.types.toLowerCase()=='select'" v-model="scope.row[item.prop]" popper-class="popper" :placeholder="item.placeholder" :ref="item.prop+scope.$index" v-enter="item.next+(item.lastNext?scope.$index+1:scope.$index)">
            <el-option v-for="item in scope.row[item.prop+'List']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input v-else-if="item.types && item.types.toLowerCase()=='input'" v-model="scope.row[item.prop]" :placeholder="item.placeholder" :ref="item.prop+scope.$index" v-enter="item.next+(item.lastNext?scope.$index+1:scope.$index)"></el-input>
          <div v-else>{{scope.row[item.prop]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center" header-align="center" v-if="isOperate">
        <template slot-scope="scope">
          <span style="width:32px;display:inline-block">
            <el-button v-if="scope.row[keys] && scope.row[keys]!=''" type="text" icon="el-icon-delete" @click="handleDeleteClick(scope.$index,scope.row)"></el-button>
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
  directives: {
    enter: {
      bind: function(el, { value }, vnode) {
        el.addEventListener("keyup", ev => {
          if (ev.keyCode === 13) {
            let nextInput = vnode.context.$refs[value];
            if (
              nextInput &&
              nextInput[0] &&
              typeof nextInput[0].focus === "function"
            ) {
              nextInput[0].focus();
            }
          }
        });
      }
    }
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
    }
  }
};
</script>

<style scoped>
.el-autocomplete>>>.el-input__inner,
.el-input>>>.el-input__inner,
.el-select>>>.el-input .el-input__inner {
  border: none;
  padding: 0 10px;
}

/* .el-autocomplete>>>.el-input__inner:focus,
.el-input>>>.el-input__inner:focus,
.el-select>>>.el-input .el-input__inner:focus {
  background: rgb(245, 239, 230);
} */

.el-table--enable-row-hover>>>.el-table__body-wrapper
  .el-table__body
  tr:hover
  > td {
  background-color: #fff;
}

.el-table--small>>>.el-table__body-wrapper td,
.el-table--small>>>.el-table__body-wrapper td .cell {
  padding: 0 5px;
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

.el-popper[x-placement^="bottom"].popper .popper__arrow {
  display: none;
}

.el-popper[x-placement^="bottom"].popper {
  margin-top: 0;
}
</style>