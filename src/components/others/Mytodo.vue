<template>
  <el-table
    ref="multipleTableRef"
    :data="todos.todoLists"
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

    <el-table-column label="操作" width="210">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="success"
          @click="handleFinish(scope.$index, scope.row)"
          >完成</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <div class="countShow">
    已完成&nbsp;&nbsp;{{ todos.isFinishLength }} &nbsp;&nbsp;项===>
    全部&nbsp;&nbsp;{{ todos.todoLists_length }}&nbsp;&nbsp;项
  </div>

  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">清除已选择</el-button>
    <el-button @click="toggleSelection()">添加到已完成</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
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

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<todo[]>([]);
const toggleSelection = (rows?: todo[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: todo[]) => {
  multipleSelection.value = val;
};

const handleEdit = (index: number, row: todo) => {
  console.log(index, row);
};
const handleFinish = (index: number, row: todo) => {
  ElMessageBox.confirm("是否确认该代办已完成?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "info"
  })
    .then(() => {
      if (row.isFinish === true) {
        ElMessage.info({
          message: "该代办已完成，不能重复添加！"
        });
      } else {
        todos.finishTodo(index);
        ElMessage.success({
          message: "成功添加到已完成!"
        });
      }
    })
    .catch((err) => {
      ElMessage.info({
        message: "操作取消！"
      });
    });
};

const handleDelete = (index: number, row: todo) => {
  ElMessageBox.confirm("是否确认删除该代办?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      todos.deleteTodo(index);
      ElMessage.success({
        message: "成功删除!"
      });
    })
    .catch((err) => {
      ElMessage.info({
        message: "操作取消！"
      });
    });
};
</script>

<style lang="less" scoped>
.countShow {
  margin: 10px 0;
  font-size: 16px;
}
</style>
