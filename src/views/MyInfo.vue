<template>
  <div class="mains" ref="main" style="background-color: #fff">
    <div class="title" ref="title">
      <img class="title-img" :src="userInfo.avator" alt="avator" />
      <div class="title-info">
        <div class="title-info-name">{{ userInfo.name }}</div>
        <div class="title-info-sign">
          {{ userInfo.sign }}
        </div>
      </div>
      <div class="title-btn">
        <el-button @click="changeBgImg">改变背景</el-button>
      </div>
    </div>

    <div class="info">
      <div class="info-Item">
        <span>年龄 :</span>
        <strong>{{ userInfo.age }}</strong>
      </div>
      <div class="info-Item">
        <span>联系方式 :</span>
        <strong>{{ userInfo.phone }}</strong>
      </div>
      <div class="info-Item">
        <span>邮箱地址 :</span>
        <strong>{{ userInfo.email }}</strong>
      </div>
      <div class="info-Item">
        <span>个性签名 :</span>
        <strong>{{ userInfo.sign }}</strong>
      </div>
    </div>

    <div class="total">
      <el-color-picker v-model="color" />
      <el-button @click="changeBg">改变背景色</el-button>
      <el-button @click="onLoginOut">退出登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue-demi";
import { ElMessage } from "element-plus";
import { useStoreUser } from "@/store/index";
import router from "@/router";
const userPinia = useStoreUser();
const title = ref<HTMLElement | null>(null);

let color = ref("#fff");
const main = ref<HTMLElement | null>(null);
let bgImg = ref("https://w.wallhaven.cc/full/l8/wallhaven-l8qmlp.jpg");

const userInfo = reactive({
  name: "kuuga",
  age: 22,
  avator:
    "http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg",
  phone: 12345678901,
  email: "xpu_qp@163.com",
  sign: "失败总是贯穿人生的始终 这就是人生",
  habit: ["音乐", "电影", "旅游", "美食"],
});

const onLoginOut = (): void => {
  userPinia.changeStatusPinia(false);
  router.push({
    name: "login",
  });
};

// 修改背景
const changeBg = (): void => {
  main.value!.style.backgroundColor = color.value;
  // main.value.style.baclgroundImage = `url("${bgImg.value}")`;
};

const changeBgImg = (): void => {
  title.value!.style.backgroundImage = `url("${bgImg.value}")`;
};
</script>

<style scoped lang="less">
@box-s:0 1px 10px 0 rgba(0, 0, 0, 0.12);
@minheight:calc (100vh - 36px);
.mains {
  position: relative;

  .title {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    position: relative;
    height: 120px;
    background-image: url("@/assets/images/infoTitle.png");
    background-size: cover;
    background-repeat: no-repeat;

    &-btn {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &-img {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 100px;
      border-radius: 50px;
    }

    &-info {
      position: absolute;
      left: 120px;
      height: 100px;
      top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: start;

      &-name {
        font-size: 20px;
        height: 30px;
        line-height: 30px;
        margin: 4px 0;
        font-weight: bolder;
      }

      &-sign {
        font-size: 18px;
        height: 60px;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        overflow: hidden;
      }
    }
  }

  .info {
    margin: 10px 30px;
    display: flex;
    justify-content: start;
    flex-direction: column;
    &_item {
      span {
        width: 120px;
      }
      strong {
        display: block;
        width: calc(100%-120px);
      }
    }
  }

  span {
    display: block;
  }

  .total {
    margin: 10px 50px;
    position: absolute;
    bottom: 20px;
    right: 20px;

    .el-button {
      height: 26px;
      margin-left: 10px;
    }
  }
}
</style>
info-Item
