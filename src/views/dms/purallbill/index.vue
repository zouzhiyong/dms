<template>
  <layout>
   <purallbillFrom slot="bill" ref="bill"></purallbillFrom>
   <purallbillTable slot="table" ref="table"></purallbillTable>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import purallbillFrom from "./purallbill_form";
import purallbillTable from "./purallbill_table";
export default {
  components: {
    layout,
    purallbillFrom,
    purallbillTable
  }
};
</script>