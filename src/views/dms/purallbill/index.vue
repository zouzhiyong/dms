<template>
  <layout>
    <purallbillFrom slot="bill" ref="bill">
      <!-- <purallbillTable slot="tablebill" ref="tablebill"></purallbillTable> -->
    </purallbillFrom>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import purallbillFrom from "./purallbill_form";
import purallbillTable from "./purallbill_table";
export default {
  components: {
    layout,
    purallbillFrom
    // purallbillTable
  }
};
</script>