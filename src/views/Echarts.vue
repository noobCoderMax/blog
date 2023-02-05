<template>
  <div class="echarts" ref="echarts">
    <EchartsDetailVue />
  </div>
</template>
<script setup lang="ts">
import EchartsDetailVue from "@/components/common/EchartsDetail.vue";
import { reactive, ref } from "vue";
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  background-image: url("@/assets/images/bgShow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
