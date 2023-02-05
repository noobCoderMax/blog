<template lang="">
  <div class="comment">
    <div class="comment-avator">
      <img :src="avatorUrl" alt="头像" title="头像" />
    </div>
    <div class="comment-info">
      <div class="comment-info-username">柠檬颜色的柠檬</div>
      <div class="comment-info-content">
        江皋闻曙钟，轻枻理还舼。 海潮夜约约，川露晨溶溶。
        始见沙上鸟，犹埋云外峰。 故乡杳无际，明发怀朋从。
      </div>
      <div class="comment-info-ope">
        <img
          class="comment-info-ope-zan"
          src="@/assets/images/icons/dianzan.svg"
          alt="dianzan"
        />
        <img
          class="comment-info-ope-cai"
          src="@/assets/images/icons/diancai.svg"
          alt="diancai"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

let avatorUrl = ref<string>(
  "http://pic.3h3.com/up/2021-9/202109181358360933.jpg"
);
</script>
<style lang="less" scoped>
.comment {
  display: flex;

  &-avator {
    width: 80px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
  }

  &-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;

    &-ope {
      display: flex;
      justify-content: start;

      &-zan {
        &:hover {
          -webkit-filter: drop-shadow(0px 0px 0px #2b76b3);
        }
      }

      &-cai:hover {
        -webkit-filter: drop-shadow(0px 0px 0px #2b76b3);
      }
    }
  }
}
</style>
