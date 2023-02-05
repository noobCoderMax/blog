import { defineStore } from "pinia";
import { getApiList, getApiListByTx } from "@/api/echarts";
import { todo, myBlog, User } from "./interface";
import type { RootObject, City } from "./type";
import type {
  ChinaAdd,
  ChinaTotal,
  AreaTree,
  Children,
  StatisGradeCityDetail,
} from "./typeTx";

export const useStore = defineStore("todos", {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    let todoLists: todo[] = [];

    return {
      todoLists: todoLists,
    };
  },
  getters: {
    todoLists_length(state): number {
      return state.todoLists.length;
    },
    isFinishLength(state): number {
      return state.todoLists.filter((item: todo) => {
        return item.isFinish === true ? true : false;
      }).length;
    },
    unFinishLength(state): number {
      return state.todoLists.filter((item: todo) => {
        return item.isFinish === false ? true : false;
      }).length;
    },
    finishedList(state): Array<todo> {
      return state.todoLists.filter((item) => {
        return item.isFinish === true;
      });
    },
    unfinishedList(state): Array<todo> {
      return state.todoLists.filter((item) => {
        return item.isFinish === false;
      });
    },
  },
  actions: {
    addTodo(todo: todo) {
      this.todoLists.push(todo);
    },
    finishTodo(index: number) {
      this.todoLists[index].isFinish = true;
    },
    deleteTodo(id: number) {
      let index: number = -1;
      for (let i = 0; i < this.todoLists.length; i++) {
        if (this.todoLists[i].id === id) {
          index = i;
        }
      }
      this.todoLists.splice(index, 1);
    },
  },

  persist: {
    enabled: true, // 开启存储
    // **strategies: 指定存储位置以及存储的变量都有哪些,不写默认存储到sessionStorage，默认存储state所有数据
    strategies: [{ storage: localStorage, paths: ["todoLists"] }],
  },
});

export const useStoreBlog = defineStore("blogs", {
  // 推荐使用 完整类型推断的箭头函数
  state: () => ({
    blogs: <myBlog[]>[],
  }),
  getters: {
    myBlogs(state) {
      return state.blogs;
    },
    allBlogs(state) {
      return state.blogs;
    },
  },
  actions: {
    addBlog(data: myBlog) {
      this.blogs.push(data);
    },
    searchType(type: string) {
      return this.blogs.filter((item) => {
        return item.type === type;
      });
    },
    getBolg(id: string) {
      return this.blogs.filter((item) => {
        return item.id === id;
      })[0];
    },
  },
  persist: {
    enabled: true, // 开启存储
    //**strategies: 指定存储位置以及存储的变量都有哪些,不写默认存储到sessionStorage，默认存储state所有数据
    strategies: [{ storage: localStorage, paths: ["blogs"] }],
  },
});

export const useStoreUser = defineStore("user", {
  state: () => {
    let userInfo: User = {
      name: "",
      sign: "",
      avator: "",
      email: "",
      phone: "",
      habit: [],
    };

    return {
      userInfo: userInfo,
      isLogin: false,
      token: <string>"",
    };
  },
  getters: {},
  actions: {
    changeStatusPinia(isLogin: boolean) {
      this.isLogin = isLogin;
    },
    setUserInfoPinia(data: User) {
      this.userInfo = data;
    },
    setTokenPinia(token: string) {
      this.token = token;
    },
  },
  persist: {
    enabled: true, // 开启存储
    // **strategies: 指定存储位置以及存储的变量都有哪些,不写默认存储到sessionStorage，默认存储state所有数据
    strategies: [{ storage: localStorage, paths: ["userInfo", "token"] }],
  },
});

export const useStoreEchart = defineStore("echarts", {
  state: () => ({
    list: <RootObject>{},
    children: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    lastUpdateTime: <string>"",
    areaTree: <AreaTree[]>[],
    cityDetail: <StatisGradeCityDetail[]>[],
  }),
  actions: {
    async getList() {
      this.list = await getApiList();
    },
    async getChinaData() {
      let chinaData = await getApiListByTx();
      this.areaTree = chinaData.diseaseh5Shelf.areaTree;
      this.chinaAdd = chinaData.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = chinaData.diseaseh5Shelf.chinaTotal;
      this.lastUpdateTime = chinaData.diseaseh5Shelf.lastUpdateTime;
      this.cityDetail = chinaData.statisGradeCityDetail.slice(0, 10);
    },
  },
});
