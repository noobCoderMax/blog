<template>
  <div class="main">
    <!-- 登录 -->
    <div class="loginform" ref="loginformRef">
      <h3>登录</h3>

      <div class="item">
        <label for="email">邮箱</label>
        <input
          type="email"
          name="email"
          placeholder="请输入邮箱"
          v-model="loginform.email"
        />
        <el-icon><Check /></el-icon>
      </div>
      <div class="item">
        <label for="password">密码</label>
        <input
          type="password"
          name="password"
          placeholder="请输入密码"
          v-model="loginform.password"
        />
      </div>
      <div class="item">
        <label for="svgCode">验证码</label>
        <input
          type="text"
          name="svgCode"
          placeholder="请输入验证码"
          v-model="loginform.svgCode"
          style="width: 150px"
        />
        <img :src="svgCode" alt="svg" @click="onResetSvgCode" />
      </div>
      <div class="btns">
        <el-button type="primary" @click="onLogin">登录</el-button>
        <el-button type="primary" @click="onToRegister">注册</el-button>
      </div>
    </div>

    <!-- 注册 -->
    <div class="registerform" ref="registerformRef">
      <h3>登录</h3>

      <div class="item">
        <label for="username">昵称:</label>
        <input
          type="text"
          name="username"
          placeholder="请输入密码"
          v-model="registerform.username"
        />
      </div>
      <div class="item">
        <label for="email">邮箱:</label>
        <input
          type="email"
          name="email"
          placeholder="请输入密码"
          v-model="registerform.email"
        />
      </div>
      <div class="item">
        <label for="password">密码:</label>
        <input
          type="password"
          name="password"
          placeholder="请输入密码"
          v-model="registerform.password"
        />
      </div>
      <div class="item">
        <label for="phone">电话:</label>
        <input
          type="text"
          name="phone"
          placeholder="请输入密码"
          v-model="registerform.phone"
        />
      </div>
      <div class="item">
        <label for="sign">签名:</label>
        <input
          type="text"
          name="sign"
          placeholder="请输入密码"
          v-model="registerform.sign"
        />
      </div>
      <div class="item" style="margin-top: 5px">
        <label for="code">邮箱验证码:</label>
        <input
          type="text"
          name="code"
          style="width: 96%"
          placeholder="请输入邮箱验证码"
          v-model="registerform.code"
        />
      </div>

      <div class="btns">
        <el-button type="primary" @click="onToLogin">前往登录</el-button>
        <el-button type="primary" @click="onRegister">确认注册</el-button>
        <el-button type="primary" @click="onEmailCode">获取验证码</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { NavigationFailure, useRouter } from "vue-router";
import { useStoreUser } from "@/store/index";
import { ElMessage } from "element-plus";
import { loginApi, getEmailCodeApi, registerApi } from "@/api/module/user";
import { resolveSoa } from "dns";
const router = useRouter();
let registerformRef = ref<HTMLElement | null>(null);
let loginformRef = ref<HTMLElement | null>(null);
const userPinia = useStoreUser();
let loginform = reactive({
  email: "",
  password: "",
  svgCode: "",
});
let registerform = reactive({
  email: "",
  username: "",
  phone: "",
  password: "",
  sign: "",
  code: "",
});

let svgCode = ref<string>("http://localhost:3333/api/codeImg");

const onResetSvgCode = () => {
  svgCode.value = svgCode.value + "?" + Math.random();
};

const onLogin = () => {
  loginApi(loginform)
    .then((res) => {
      if (res.status === 200) {
        ElMessage.success({
          message: "登录成功！",
        });
        userPinia.setUserInfoPinia(res.data.user);
        userPinia.setTokenPinia(res.data.token);
      }
    })
    .catch((err) => {});
  router.push({ name: "index" });
};
const onLoginOut = () => {
  userPinia.changeStatusPinia(false);
};
const onRegister = () => {
  console.log("注册表单", registerform);
  registerApi(registerform)
    .then((res) => {
      if (res.status === 200) {
        ElMessage.success({
          message: "注册用户成功！",
        });
      }
    })
    .catch((err) => {
      ElMessage.success({
        message: "注册用户出错了！",
      });
    });
};

// 获取邮箱验证码
const onEmailCode = () => {
  getEmailCodeApi(registerform)
    .then((res) => {
      if (res.status === 200) {
        ElMessage.success({
          message: "发送验证码成功，请及时查看！",
        });
      }
    })
    .catch((err) => {
      ElMessage.success({
        message: "发送验证码出错了！",
      });
    });
};

// 注册登录切换
const onToRegister = () => {
  registerformRef.value!.style.display = "block";
  loginformRef.value!.style.display = "none";
};
// 注册登录切换
const onToLogin = () => {
  registerformRef.value!.style.display = "none";
  loginformRef.value!.style.display = "block";
};
</script>
<style lang="less" scoped>
@box-s:0 1px 10px 0 rgba(0, 0, 0, 0.12);

.main {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url("@/assets/images/wallhaven.png");
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  .loginform {
    padding: 30px;
    width: 400px;
    box-shadow: @box-s;
    border-radius: 12px;
    color: #fff;
    border: 1px solid #fff;

    .item {
      width: 360px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      label {
        margin-right: 10px;
      }

      input {
        width: 300px;
        height: 40px;
        margin: 10px 0;
        padding-left: 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
      }

      img {
        width: 120px;
        border-radius: 5px;
        margin-left: 10px;
      }
    }

    .btns {
      margin: 10px 10px 0 10px;
      float: right;
    }
  }

  .registerform {
    display: none;
    padding: 30px;
    width: 400px;
    box-shadow: @box-s;
    border-radius: 12px;
    color: #fff;
    border: 1px solid #fff;

    .item {
      width: 360px;
      margin: 0 auto;
      label {
        margin-right: 10px;
      }

      input {
        width: 300px;
        height: 40px;
        margin: 10px 0;
        padding-left: 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
      }
    }

    .btns {
      margin: 10px 10px 0 10px;
      float: right;
    }
  }
}
</style>
