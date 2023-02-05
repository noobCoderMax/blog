<template>
  <el-tabs
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
    style="padding: 20px 40px"
  >
    <el-tab-pane label="我的代办" name="first">
      <Mytodos></Mytodos>
    </el-tab-pane>

    <el-tab-pane label="新建代办" name="second">
      <NewTodo></NewTodo>
    </el-tab-pane>

    <el-tab-pane label="已完成" name="third">
      <Finishtodo></Finishtodo>
    </el-tab-pane>
    <el-tab-pane label="未完成" name="firth">
      <Unfinishtodo></Unfinishtodo>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import NewTodo from "@/components/others/NewTodo.vue";
import Mytodos from "@/components/others/Mytodo.vue";
import Finishtodo from "@/components/others/Finishtodo.vue";
import Unfinishtodo from "@/components/others/Unfinishtodo.vue";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
};
</script>
<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
