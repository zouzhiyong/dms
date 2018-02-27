<template>
  <el-tabs v-model="activeName" type="card" style="height:100%">
    <el-tab-pane label="单据浏览" name="first" style="height:100%">
      <layout>
        <purchaserCondition slot="condition" ref="condition"></purchaserCondition>
        <purchaserTools slot="toolbar"></purchaserTools>
        <purchaserTable slot="table" ref="table" :billtype="billtype"></purchaserTable>
      </layout>
    </el-tab-pane>
    <el-tab-pane label="单据管理" name="second" style="height:100%">
      <layout>
        <purchaserFrom slot="bill" ref="bill" :billtype="billtype"></purchaserFrom>
      </layout>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import purchaserFrom from "./purchaser_form";
import purchaserCondition from "./purchaser_condition";
import purchaserTools from "./purchaser_tools";
import purchaserTable from "./purchaser_table";
export default {
  components: {
    layout,
    purchaserFrom,
    purchaserCondition,
    purchaserTools,
    purchaserTable
  },
  props: {
    billtype: { type: Number }
  },
  data() {
    return {
      activeName: "first"
    };
  },
  mounted() {
    this.iniData();
  },
  methods: {
    iniData() {
      this.$nextTick(item => {
        this.$refs.table.$refs.table.conditionData = this.$refs.condition.formInline;
        this.$refs.table.$refs.table.GetData();
      });
    }
  },
  watch: {
    activeName(newVal, oldVal) {
      if (newVal == "first") {
        this.iniData();
      }
    }
  }
};
</script>
<style scoped>
.el-tabs>>>.el-tabs__content {
  height: calc(100% - 40px);
}

.el-tabs>>>.el-tabs__header {
  margin-bottom: -1px;
}

.el-tabs>>>.el-tabs__nav-wrap::after {
  background-color: transparent;
}
</style>
