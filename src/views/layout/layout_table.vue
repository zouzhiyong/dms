<template>
  <div style="height:100%">
    <el-table :data="tableData" ref="table" size="small" border height="calc(100% - 40px)">
      <el-table-column type="index" width="50" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.$index + 1 + (pageSize * (currentPage - 1))}}
        </template>
      </el-table-column>
      <template v-for="item in columns">
        <el-table-column v-if="item.prop=='IsValid'" :prop="item.prop" :width="item.width" :formatter="item.formatter" :label="item.label" header-align="center" :align="item.align" :key="item.id">
          <template slot-scope="scope">
            <i v-if="scope.row.IsValid==1" class="fa fa-check" style="color:#409EFF"></i>
            <i v-else class="fa fa-times" style="color:#C0C4CC"></i>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.prop=='IsLockedout'" :prop="item.prop" :width="item.width" :formatter="item.formatter" :label="item.label" header-align="center" :align="item.align" :key="item.id">
          <template slot-scope="scope">
            <i v-if="scope.row.IsLockedout==1" class="fa fa-lock" style="color:#C0C4CC"></i>
            <i v-else class="fa fa-unlock" style="color:#409EFF"></i>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :width="item.width" :formatter="item.formatter" :label="item.label" header-align="center" :align="item.align" :key="item.id">
        </el-table-column>
      </template>
      <el-table-column label="操作" width="120" align="center" header-align="center" v-if="isOperate">
        <template slot-scope="scope">
          <span style="width:32px;display:inline-block">
            <el-button :disabled="scope.row.IsSystem==1" type="text" icon="el-icon-edit" @click="handleEditClick(scope.row)"></el-button>
          </span>
          <span style="width:32px;display:inline-block">
            <el-button :disabled="scope.row.IsSystem==1 || parseInt(scope.row.isRole)!=0" type="text" icon="el-icon-delete" @click="handleDeleteClick(scope.row)"></el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="slot,->,prev, pager, next" :total="total">
      <span class="demonstration">显示第 {{pageSize * currentPage - pageSize + (total==0?0:1)}} 到第 {{((pageSize * currentPage) > total ? total : (pageSize * currentPage))}} 条记录，总共 {{total}} 条记录</span>
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 0,
      total: 0,
      tableData: [],
      conditionData: {}
    };
  },
  props: {
    api: { type: Object },
    columns: { type: Array },
    isOperate: { default: false }
  },
  methods: {
    GetData() {
      this.pageSize = Math.floor(this.$refs.table.$el.clientHeight / 40);
      this.conditionData.currentPage = this.currentPage;
      this.conditionData.pageSize = this.pageSize;
      this.api.FindTable(this.conditionData).then(result => {
        this.tableData = result.rows;
        this.total = result.total;
      });
    },
    handleEditClick(row) {
      this.$emit("editClick", row);
      if (
        this.$parent.$parent.$parent.$parent.$parent.$refs.form &&
        typeof this.$parent.$parent.$parent.$parent.$parent.$refs.form
          .GetData === "function"
      ) {
        this.$parent.$parent.$parent.$parent.$parent.$refs.form.GetData(row);
      }
    },
    handleDeleteClick(row) {
      this.$confirm("是否确认删除?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.api.DeleteRow(row).then(result => {
            this.GetData();
          });
        })
        .catch(() => {});
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.GetData();
    }
  }
};
</script>

<style scoped lang="scss">
.el-table {
  height: calc(100% - 40px);
  box-sizing: content-box;
}
.el-pagination {
  margin-top: 8px;
}
.el-button {
  padding: 5px 15px;
}
</style>

