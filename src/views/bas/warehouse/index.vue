<template>
  <layout>
    <warehouseTools slot="toolbar"></warehouseTools>
    <warehouseTable slot="table" ref="table"></warehouseTable>
    <warehouseForm slot="form" ref="form"></warehouseForm>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import warehouseTools from "./warehouse_tools";
import warehouseTable from "./warehouse_table";
import warehouseForm from "./warehouse_form";

export default {
  components: {
    layout,
    warehouseTools,
    warehouseForm,
    warehouseTable
  }
};
</script>