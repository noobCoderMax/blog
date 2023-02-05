<template>
  <el-table
    ref="multipleTableRef"
    :data="todos.unfinishedList"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />

    <el-table-column label="开始时间" width="120">
      <template #default="scope">{{ scope.row.startTime }}</template>
    </el-table-column>

    <el-table-column label="结束时间" width="120">
      <template #default="scope">{{ scope.row.endTime }}</template>
    </el-table-column>

    <el-table-column property="name" label="名称" width="120" />

    <el-table-column property="address" label="地址" show-overflow-tooltip />

    <el-table-column property="type" label="类别" />

    <el-table-column property="resource" label="类别" />

    <el-table-column property="content" label="内容" />
  </el-table>

  <div class="countShow" style="margin-top: 20px">
    未完成代办项数量:&nbsp;&nbsp;{{
      todos.unFinishLength <= 0 ? 0 : todos.unFinishLength
    }}&nbsp;&nbsp;项
  </div>

  <div style="margin-top: 20px">
    <el-button>清除选择的未完成代办</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/index";
const todos = useStore();

interface todo {
  id: number;
  name: string;
  address: string;
  startTime: string;
  endTime: string;
  type: string[];
  resource: string;
  content: string;
  isFinish: boolean;
}
</script>

<style lang="less" scoped>
.countShow {
  margin: 10px 0;
  font-size: 16px;
}
</style>
