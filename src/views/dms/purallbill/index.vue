<template>
  <layout>
    <purallbillFrom slot="bill" ref="bill"></purallbillFrom>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import purallbillFrom from "./purallbill_form";
export default {
  components: {
    layout,
    purallbillFrom
  }
};
</script>