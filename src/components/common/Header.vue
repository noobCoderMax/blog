<template>
  <div class="topMenu">
    <div class="header">
      <div class="title" @click="showOpe">操作选项</div>
      <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <div class="menus" v-show="condition">
          <div
            class="menu"
            v-for="(item, index) in menuItem"
            :key="index"
            @click="toMyChoose(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </transition>
    </div>
    <div class="header">
      <div class="title" @click="showOpe1">测试选项</div>
      <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <div class="menus" v-show="condition1">
          <div
            class="menu"
            v-for="(item, index) in menuItem"
            :key="index"
            @click="toMyChoose(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
let condition = ref<boolean>(false);
let condition1 = ref<boolean>(false);

const router = useRouter();
const menuItem = reactive([
  {
    id: 1,
    name: "我的信息",
    path: "myInfo",
  },
  {
    id: 2,
    name: "代办事项",
    path: "todos",
  },
  {
    id: 3,
    name: "博客浏览",
    path: "blogs",
  },
  {
    id: 4,
    name: "壁纸收藏",
    path: "paperwall",
  },
  {
    id: 5,
    name: "编辑博客",
    path: "newblog",
  },
  {
    id: 6,
    name: "数据统计",
    path: "echarts",
  },
]);
const toMyChoose = (item: { path: string }) => {
  router.push({
    name: item.path,
  });
  condition.value = false;
};

const showOpe = () => {
  condition.value = !condition.value;
};
const showOpe1 = () => {
  condition1.value = !condition1.value;
};
</script>

<style lang="less" scoped>
.topMenu {
  display: flex;
  flex-direction: row;
  justify-content: start;
  height: 36px;
  line-height: 36px;
  background-color: pink;
  padding-left: 10px;

  .header {
    position: relative;
    margin-right: 30px;
    z-index: 667;
    cursor: pointer;

    .menus {
      position: absolute;
      top: 36px;
      left: 0px;
      display: flex;
      flex-direction: column;
      margin: 0;
      height: 36px;
      color: white;
      width: 100px;

      .menu {
        margin: 0;
        background-color: black;
        width: 100px;
        text-align: center;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        transition: 0.6s;
        font-size: 14px;
        &:hover {
          background-color: rgb(206, 205, 205);
        }
      }
    }
  }

  .other {
    display: flex;
    flex-direction: column;
    height: 36px;
    display: block;
    .menu {
      text-align: center;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      transition: 0.6s;
      font-size: 14px;
      &:hover {
        background-color: rgb(206, 205, 205);
      }
    }
  }
}
</style>
