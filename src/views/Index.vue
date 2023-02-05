<template>
  <div class="index">
    <Header class="header"></Header>
    <router-view class="mains" #default="{ route, Component }">
      <transition
        :enter-active-class="`animate__animated ${route.meta.transition}`"
        :leave-active-class="`animate__animated ${route.meta.transitionOut}`"
      >
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/common/Header.vue";
</script>

<style lang="less" scoped>
.index {
  position: relative;
  .mains {
  }
}
</style>
