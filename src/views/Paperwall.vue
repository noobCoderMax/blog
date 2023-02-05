<template>
  <div class="main" ref="main">
    <div class="imgs" ref="container">
      <div class="item" ref="item">
        <img
          :data-src="item.src"
          alt=""
          v-for="item in imgs"
          :key="item.id"
          ref="img"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, Ref } from "vue";
import { reactive, ref } from "vue-demi";
const container: Ref<HTMLElement | null> = ref(null);
const main: Ref<HTMLElement | null> = ref(null);
const item: Ref<HTMLElement | null> = ref(null);
const imgs = reactive([
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 0,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 1,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 2,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 3,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 4,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 5,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 6,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 7,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 8,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 9,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 10,
  },
  {
    src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
    id: 11,
  },
]);

const img = ref<Array<HTMLElement>>([]);

// const divs = (el: HTMLElement) => {
//   // 断言为HTMLElement类型的数组
//   (img.value as Array<HTMLElement>).push(el);
// };

onMounted(() => {
  lazyLoadImg();
  waterFall();

  window.onscroll = () => {
    if (isScrollEvent()) {
      imgs.push({
        src: "https://img-baofun.zhhainiao.com/fs/cbe2d62937d0f800c26984c9ca717ea7.jpg",
        id: Math.random() * 100,
      });
      lazyLoadImg();
      waterFall();
    }
  };
});

const lazyLoadImg = () => {
  img.value.forEach((element) => {
    observe.observe(element);
  });
};

const isScrollEvent = (): boolean => {
  // scrollTop+clientHeight
  let judgeTop: number =
    document.documentElement.scrollTop + document.documentElement.clientHeight;
  let lastImgTop: number = -1;
  let index: number = img.value.length - 1;

  img.value[index].onload = () => {
    console.log("img.value[index]", img.value[index].offsetTop);
    console.log("img.value[index]--index", index);
  };
  lastImgTop = img.value[index].offsetTop;
  return lastImgTop < judgeTop ? true : false;
};

const waterFall = () => {
  let imgWidth: number = img.value[0].offsetWidth;
  let count: number = Math.floor(
    main.value!.clientWidth / img.value[0].offsetWidth
  );
  container.value!.style.width = imgWidth * count + "px";

  let heightArr = [];

  for (let i = 0; i < img.value.length; i++) {
    if (i < count) {
      //第一行
      heightArr.push(img.value[i].offsetHeight);
    } else {
      // 其余行
      img.value[i].style.position = "absolute";
      let minHeight = Math.min(...heightArr);
      let index = findImgIndex(minHeight, heightArr);
      img.value[i].style.left = index * imgWidth + "px";
      img.value[i].style.top = minHeight + "px";
      heightArr[index] += img.value[i].offsetHeight;
    }
  }
};

const callbackObserve = (entries: any[]): void => {
  entries.forEach((element) => {
    if (element.isIntersecting) {
      const image = element.target;
      const dataSrc = image.getAttribute("data-src");
      image.setAttribute("src", dataSrc);
      observe.unobserve(image);
    }
  });
};
const observe = new IntersectionObserver(callbackObserve);
const findImgIndex = (minHeight: number, arr: Array<number>): number => {
  for (let i = 0; i < arr.length; i++) {
    if (minHeight === arr[i]) {
      return i;
    }
  }
  return -1;
};
</script>

<style scoped lang="less">
.imgs {
  margin: 0 auto;
  position: relative;

  &:after {
    content: "";
    display: block;
    clear: both;
  }

  .item {
    float: left;

    img {
      width: 230px;
      height: 140px;
      padding: 10px;
      box-shadow: 0 0 5px #ccc;
      margin-bottom: 20px;
    }
  }
}
</style>
