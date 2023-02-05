<template>
  <div class="mainBlog">
    <div class="search">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </div>

    <div class="header">
      <span
        v-for="(item, index) in headers"
        :key="index"
        @click="onsearchType(item.type)"
      >
        {{ item.name }}
      </span>
    </div>

    <div class="mainShow">
      <div class="blog-left">
        <div class="blog" v-for="item in blogs" :key="item.id">
          <span class="title" @click="toDetail(item.id)">{{ item.title }}</span>
          <div class="info">
            <div class="img">
              <img :src="item.imgSrc" alt="" />
            </div>
            <div class="infos">
              <p class="content">
                {{ item.desc }}
              </p>
              <div class="foot">
                <span>赞</span>
                <span>踩</span>
                <span>{{ item.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blog-right">
        <strong>作者推荐</strong>
        <div class="itemGood" v-for="(item, index) in 5" :key="index"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, reactive, ref } from "vue-demi";
import { useStoreBlog } from "@/store/index";
import { RestaurantItem } from "@/store/interface";
const BlogPinia = useStoreBlog();
const state = ref("");
const headers = reactive([
  { id: 1, name: "推荐", data: null, type: "推荐" },
  { id: 2, name: "关注", data: null, type: "关注" },
  { id: 3, name: "后端", data: null, type: "后端" },
  { id: 4, name: "前端", data: null, type: "前端" },
  { id: 5, name: "移动", data: null, type: "移动" },
  { id: 6, name: "java", data: null, type: "java" },
  { id: 6, name: "Python", data: null, type: "Python" },
  { id: 6, name: "人工智能", data: null, type: "人工智能" },
  { id: 6, name: "大数据", data: null, type: "大数据" },
  { id: 6, name: "运维", data: null, type: "运维" },
  { id: 6, name: "服务器", data: null, type: "服务器" },
  { id: 6, name: "操作系统", data: null, type: "操作系统" },
  { id: 6, name: "软件测试", data: null, type: "软件测试" },
  { id: 6, name: "网络", data: null, type: "网络" },
  { id: 6, name: "开发工具", data: null, type: "开发工具" },
  { id: 6, name: "云平台", data: null, type: "云平台" },
  { id: 6, name: "教学", data: null, type: "教学" },
]);
let blogs = BlogPinia.allBlogs;

const onsearchType = (type: string) => {
  blogs = BlogPinia.searchType(type);
};

onMounted(() => {
  restaurants.value = loadAll();
});
const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
const loadAll = () => {
  return [
    { value: "vue", link: "https://github.com/vuejs/vue" },
    { value: "element", link: "https://github.com/ElemeFE/element" },
    { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    { value: "vuex", link: "https://github.com/vuejs/vuex" },
    { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    { value: "babel", link: "https://github.com/babel/babel" },
  ];
};

const handleSelect = (item: RestaurantItem) => {
  console.log(item);
};

const toDetail = (id: string) => {
  router.push({
    name: "detailBlog",
    query: {
      id: id,
    },
  });
};
</script>

<style lang="less" scoped>
.mainBlog {
  background-color: #f1f3f4;

  .search {
    height: 60px;
    background-image: url("@/assets/images/infoTitle.png");
    background-size: cover;
    background-repeat: no-repeat;

    /deep/.el-autocomplete {
      width: 400px;
      height: 50px;
      margin: 15px;
    }
  }

  .header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    background-color: #ffffff;

    span {
      width: 70px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      margin: 4px 6px 4px 0;
      display: block;
      cursor: pointer;
      margin: 4px 0;
      transition: all 0.5s;

      &:hover {
        color: red;
        background-color: #ccc;
      }

      // &:nth-child(1) {
      //   color: red;
      // }
    }
  }

  .mainShow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 100vh;
    overflow: auto;
    margin: 10px;

    .blog-left {
      flex: 1;
      .blog {
        height: 200px;
        margin: 0 10px 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #ffffff;

        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }

        .info {
          height: 160px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .img {
            padding: 0px 10px 10px;
            img {
              width: 220px;
              height: 150px;
            }
          }

          .infos {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            .content {
              text-indent: 2em;
              padding: 4px 0;
              line-height: 120%;
              height: 120px;
              overflow: hidden;
              position: relative;
              text-align: justify;
              padding-right: 1em;

              &::before {
                content: "...";
                position: absolute;
                right: 0;
                bottom: 0;
              }

              &::after {
                content: "";
                position: absolute;
                width: 1em;
                height: 1em;
                background-color: #ffffff;
                right: 0;
                display: inline;
                margin-top: 0.5em;
              }
            }
            .foot {
              height: 30px;
              line-height: 30px;

              span {
                margin-right: 6px;
                cursor: pointer;

                &:nth-child(1):hover {
                  color: green;
                }
                &:nth-child(2):hover {
                  color: red;
                }
                &:nth-child(3) {
                  color: black;
                }
              }
            }
          }
        }
      }
    }

    .blog-right {
      background-color: #fff;
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: start;

      strong {
        height: 50px;
        padding-left: 10px;
        font-family: serif;
        line-height: 50px;
      }

      .itemGood {
        height: 50px;
        margin-bottom: 10px;
        margin: 5px;
        background-color: pink;
      }
    }
  }
}
</style>
