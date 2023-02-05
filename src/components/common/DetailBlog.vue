<template>
  <div class="detailBlog">
    <div class="my-blog">
      <div class="my-blog-author">{{ blogContent.author }}</div>

      <div class="my-blog-desc">
        {{ blogContent.desc }}
      </div>
      <div class="my-blog-content" v-html="blogContent.content"></div>

      <div class="my-blog-comment">
        <Comment />
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </div>
    </div>

    <div class="author">
      <div class="author-info">
        <div class="author-info-item">
          <img :src="userInfo.avator" alt="" />
          <div class="author-info-item-username">{{ userInfo.name }}</div>
        </div>
        <div class="author-info-item">邮箱:&nbsp;{{ userInfo.phone }}</div>
        <div class="author-info-item">{{ userInfo.sign }}</div>
        <div class="author-info-item">
          <div class="author-info-item-btns">
            <el-button type="primary" plain @click="onFocus">关注</el-button>
            <el-button type="primary" plain @click="onChat">私信</el-button>
          </div>
        </div>
      </div>
      <div class="author-search">
        <el-input
          v-model="input"
          :prefix-icon="Search"
          placeholder="搜索博主文章"
          @keydown.enter="onSearchOwn"
          clearable
        />
      </div>

      <div class="author-more">
        <div class="author-more-article">
          <div class="author-more-article-title">热门文章</div>
          <div class="author-more-article-item">什么是跨域？跨域解决方法</div>
          <div class="author-more-article-item">微信小程序操作dom元素节点</div>
          <div class="author-more-article-item">
            Vue中ref和$refs的介绍及使用
          </div>
          <div class="author-more-article-item">
            JavaScript事件代理（事件委托）
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, reactive, ref } from "vue";
import { useStoreBlog } from "@/store/index";
import { myBlog } from "@/store/interface";
import { Search } from "@element-plus/icons-vue";
import Comment from "@/components/common/Comment.vue";
const BlogPinia = useStoreBlog();
const id: string = router.currentRoute.value.query.id as string;
let blogContent = ref<myBlog>({
  id: "",
  title: "",
  type: "",
  content: "",
  imgSrc: "",
  author: "",
  desc: "",
});
let input = ref("");

interface Tree {
  label: string;
  children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};

const tempAuthor = ref("kuuga");
const tempDesc = ref("君王行出将，书记远从征。");
const tempContent = ref(
  '<p><u><em>君王行出将，书记远从征。</em></u><u><br></u></p><p><u><strong>祖帐连河阙，军麾动洛城。</strong></u><u><br></u><span style="color: rgb(225, 60, 57);"><u>旌旃朝朔气，笳吹夜边声。</u></span><u><br>坐觉烟尘扫，秋风古北平。</u></p>'
);
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

const onFocus = () => {
  alert("关注");
};

const onChat = () => {
  alert("私信");
};
const onSearchOwn = () => {
  alert("搜索博主文章");
};

onMounted(() => {
  blogContent.value = BlogPinia.getBolg(id);
  let content = BlogPinia.getBolg(id);
  console.log("value", blogContent.value);
});
</script>

<style scoped lang="less">
.detailBlog {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .my-blog {
    margin: 5px;
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: #f1f3f4;

    &-contents {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }

    &-author {
      border: #cf3;
      width: 200px;
    }
  }

  .author {
    margin: 5px;
    width: 260px;

    &-info {
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: start;

      &-item {
        height: 80px;
        position: relative;
        display: flex;
        padding: 15px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        &-username {
          font-size: 18px;
          line-height: 50px;
          width: 100%;
          margin-left: 10px;
          text-align: left;
        }

        &-btns {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;

          .el-button {
            width: 135px;
            margin: 9px 8px;
          }
        }
      }
    }

    &-search {
      margin: 10px 0;
    }

    &-more {
      height: 400px;

      &-article {
        display: flex;
        flex-direction: column;
        border: 1px solid black;

        &-title {
          padding-left: 10px;
          height: 36px;
          line-height: 36px;
          font-weight: bolder;
          font-family: Verdana, Geneva, Tahoma, sans-serif;

          border-bottom: 1px solid #000;
        }

        &-item {
          text-indent: 1em;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #000;
          cursor: pointer;
          transition: all 0.5s;
          &:hover {
            background-color: #ccc;
          }
        }
      }
    }
  }
}
</style>
