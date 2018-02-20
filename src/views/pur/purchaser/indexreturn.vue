<template>
  <layout>
    <purchaserFrom slot="bill" ref="bill" :billtype="1"></purchaserFrom>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import purchaserFrom from "./purchaser_form";
export default {
  components: {
    layout,
    purchaserFrom
  }
};
</script>