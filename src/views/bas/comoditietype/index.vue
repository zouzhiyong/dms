<template>
  <layout>
    <custTools slot="toolbar"></custTools>
    <custTree slot="tree"></custTree>
    <custTable slot="table" ref="table"></custTable>
    <custForm slot="form" ref="form"></custForm>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import custTools from "./comoditietype_tools";
import custTable from "./comoditietype_table";
import custForm from "./comoditietype_form";
import custTree from "./comoditietype_tree";

export default {
  components: {
    layout,
    custTools,
    custForm,
    custTable,
    custTree
  }
};
</script>