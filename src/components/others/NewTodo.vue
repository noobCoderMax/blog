<template>
  <el-form :model="form" ref="resetFormData" label-width="80px" class="todoNew">
    <el-form-item label="活动名称">
      <el-input v-model.trim="form.name" minlength="1" maxlength="20" />
    </el-form-item>
    <el-form-item label="活动地址">
      <el-input v-model.trim="form.address" minlength="1" maxlength="30" />
    </el-form-item>
    <el-form-item label="活动时间">
      <div class="demo-time-range">
        <el-date-picker
          style="margin-right: 40px"
          v-model="form.startTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD"
          HH:mm:ss”
          placeholder="选择开始时间"
          :default-time="defaultTime"
        />
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD"
          HH:mm:ss”
          placeholder="选择结束时间"
          :default-time="defaultTime"
        />
      </div>
    </el-form-item>

    <el-form-item label="活动类别">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="宣讲座谈" name="type" />
        <el-checkbox label="学术竞赛" name="type" />
        <el-checkbox label="趣味运动" name="type" />
        <el-checkbox label="休闲放松" name="type" />
        <el-checkbox label="联欢晚会" name="type" />
        <el-checkbox label="朋友聚会" name="type" />
        <el-checkbox label="旅行放松" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="活动资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="学校组织" />
        <el-radio label="学生组织" />
        <el-radio label="个人组织" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="活动内容">
      <el-input v-model="form.content" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button type="error" @click="onReset">重置</el-button>
      <input type="reset" value="重置" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "@/store/index";
import { ElMessage } from "element-plus";

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

const form: todo = reactive({
  id: Math.floor(Math.random() * 10),
  name: "",
  address: "",
  startTime: "",
  endTime: "",
  type: [],
  resource: "",
  content: "",
  isFinish: false
});

const defaultTime = new Date(2000, 1, 1, 12, 0, 0);
const shortcuts = [
  {
    text: "Today",
    value: new Date()
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    }
  },
  {
    text: "A week ago",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    }
  }
];

const onSubmit = () => {
  todos.addTodo(form);
  ElMessage.success({
    message: "添加成功！"
  });
};

const resetForm = () => {};
</script>

<style lang="less" scoped>
@bs:0 1px 10px 0 rgba(0, 0, 0, 0.12);
.todoNew {
  padding: 20px 10px;
  box-shadow: @bs;
}
</style>
