<template>
  <div class="main">
    <div class="container" id="container"></div>

    <!-- 城市表格 -->
    <div class="san1" @click="showCityInfo"></div>
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div class="table" style="color: wheat" v-if="isShowCity">
        <h5 style="margin: 0 0 12px 0; color: red">
          更新时间:&nbsp;&nbsp;{{ echartsPinia.lastUpdateTime }}
        </h5>

        <table cellspacing="0" border="1">
          <thead>
            <tr>
              <th>地区</th>
              <th>新增确诊</th>
              <th>累计确诊</th>
              <th>治愈</th>
              <th>死亡</th>
            </tr>
          </thead>
          <transition-group
            tag="tbody"
            enter-active-class="animate__animated animate__flipInY"
          >
            <tr v-for="item in echartsPinia.children" :key="item.id">
              <td align="center">{{ item.name }}</td>
              <td align="center">{{ item.today.confirm }}</td>
              <td align="center">{{ item.total.confirm }}</td>
              <td align="center">{{ item.total.heal }}</td>
              <td align="center">{{ item.total.dead }}</td>
            </tr>
          </transition-group>
        </table>
      </div>
    </transition>

    <div class="show"></div>
    <div class="title">国内数据统计:</div>

    <!-- 数据总结 -->
    <div class="san" @click="showTotalInfo"></div>
    <transition-group
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div class="data" v-if="isShow">
        <div class="item">
          <div>较上日+ {{ echartsPinia.chinaAdd.localConfirmH5 }}</div>
          <div>{{ echartsPinia.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </div>
        <div class="item">
          <div>较上日+ {{ echartsPinia.chinaAdd.nowConfirm }}</div>
          <div>{{ echartsPinia.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </div>
        <div class="item">
          <div>较上日+ {{ echartsPinia.chinaAdd.confirm }}</div>
          <div>{{ echartsPinia.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </div>
        <div class="item">
          <div>较上日+ {{ echartsPinia.chinaAdd.noInfect }}</div>
          <div>{{ echartsPinia.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </div>
        <div class="item">
          <div>较上日+ {{ echartsPinia.chinaAdd.importedCase }}</div>
          <div>{{ echartsPinia.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </div>
        <div class="item">
          <div>较上日+ {{ echartsPinia.chinaAdd.dead }}</div>
          <div>{{ echartsPinia.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </div>
      </div>
    </transition-group>

    <!-- 饼图 -->
    <div class="san3" @click="showDetail"></div>
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div class="pie" id="pie" v-show="isShowDetail"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import * as echarts from "echarts";
import { useStoreEchart } from "@/store";
import { geoCoorMap } from "@/assets/geomap";
import "@/assets/china.js";
import "animate.css";
import { nanoid } from "nanoid";

let isShow = ref<boolean>(false);
let isShowCity = ref<boolean>(false);
let isShowDetail = ref<boolean>(false);
const echartsPinia = useStoreEchart();

const showTotalInfo = (): void => {
  isShow.value = !isShow.value;
};

const showDetail = (): void => {
  isShowDetail.value = !isShowDetail.value;
};

const showCityInfo = (): void => {
  isShowCity.value = !isShowCity.value;
};

const initChart = (): void => {
  echartsPinia.children = echartsPinia.areaTree[0].children[20].children;

  let data = echartsPinia.areaTree[0].children.map((v) => {
    let value = [...geoCoorMap[v.name], v.total.nowConfirm];
    return {
      name: v.name,
      value,
      children: v.children,
      id: nanoid(),
    };
  });

  const charts = echarts.init(
    document.querySelector("#container") as HTMLElement
  );
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 13,
        opacity: 0.4,
        borderType: "dashed",
      },
      select: {
        itemStyle: {
          areaColor: "red",
          borderColor: "#f18355",
          borderWidth: "3",
        },
      },
      emphasis: {
        show: false,
        areaColor: "#3066ba", //鼠标滑过区域颜色
        label: {
          show: true,
          textStyle: {
            color: "#fff", //鼠标经过字体颜色
          },
        },
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"],
        layoutSize: "100%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: false,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin",
        symbolSize: [30, 30],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        itemStyle: {
          color: "#1E90FF", //标志颜色
        },
        data: data,
      },
    ],
  });

  charts.on("click", (ev: any) => {
    echartsPinia.children = ev.data.children;
  });
};

const initPie = (): void => {
  const chartsPie = echarts.init(document.querySelector("#pie") as HTMLElement);

  let option = {
    backgroundColor: "#223651",
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "15",
          },
        },
        data: echartsPinia.cityDetail.map((v) => {
          return {
            name: v.city,
            value: v.nowConfirm,
          };
        }),
      },
    ],
  };
  chartsPie.setOption(option);
};

onMounted(async () => {
  await echartsPinia.getList();
  await echartsPinia.getChinaData();

  initPie();
  initChart();
});
</script>

<style scoped lang="less">
@box-s:0 1px 10px 0 rgba(0, 0, 0, 0.12);
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;
.main {
  position: relative;

  #container {
    width: 100%;
    height: 1000px;
  }

  .table {
    position: absolute;
    top: 26px;
    right: 40px;
    tr {
      color: red;

      border: 1px solid #fff;

      th {
        padding: 5px;
        white-space: nowrap;
        border: 1px solid #fff;
      }
      td {
        padding: 5px 10px;
        border: 1px solid #fff;

        width: 30px;
        white-space: nowrap;
      }
    }
  }

  .san {
    position: absolute;
    top: 36px;
    left: 10px;
    width: 0;
    height: 0;
    border-top: 12px solid orange;
    border-bottom: 12px solid transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    cursor: pointer;
    transition: all 0.4s;
    &:active {
      border-bottom: 12px solid #fff;
      transform: rotateZ(360deg);
      transform-origin: center center;
    }
  }

  .san1 {
    position: absolute;
    top: 26px;
    right: 20px;
    width: 0;
    height: 0;
    border-top: 12px solid orange;
    border-bottom: 12px solid transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    cursor: pointer;
    transition: all 0.4s;
    &:active {
      border-bottom: 12px solid #fff;
      transform: rotateZ(360deg);
      transform-origin: center center;
    }
  }

  .san3 {
    position: absolute;
    top: 276px;
    left: 10px;
    width: 0;
    height: 0;
    border-top: 12px solid orange;
    border-bottom: 12px solid transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    cursor: pointer;
    transition: all 0.4s;
    &:active {
      border-bottom: 12px solid #fff;
      transform: rotateZ(360deg);
      transform-origin: center center;
    }
  }

  .title {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
  }

  .data {
    position: absolute;
    top: 36px;
    left: 40px;
    width: 400px;
    height: 160px;
    background-color: #fff;
    transform: 0.5s all;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;

    .item {
      background: @itemBg;
      border: 1px solid @itemBorder;
      color: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div:nth-child(2) {
        color: @itemColor;
        padding: 10px 0;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .pie {
    position: absolute;
    top: 276px;
    left: 40px;
    width: 400px;
    height: 260px;
    background: @itemBg;
  }
}
</style>
