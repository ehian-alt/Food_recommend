<script lang="ts" setup>
import { ref } from 'vue'
import search from '@/pubcomp/search/search.vue'
import classify from '@/pages/recommend/components/classify/classify.vue'
import reclist from './components/reclist/reclist.vue';
import { onReachBottom } from '@dcloudio/uni-app';
import type { recoListInstance } from '@/types/components' 
const fabClick = () => {
  uni.pageScrollTo({
    scrollTop: 0, // 滚动到顶部的位置
    duration: 300 // 滚动动画的持续时间，单位ms
  });
}

const recoRef = ref<recoListInstance>()
const scrollTop = ref(0)

onReachBottom(()=>{
  console.log("onReachBottom");
  recoRef.value?.getRecoItems()
})
</script>

<template>
  <!-- 搜索区 -->
  <view class="container">
    <classify class="ele1"></classify>
    <search class="ele2"></search>
  </view>
  <!-- 推荐列表 -->
  <scroll-view :scroll-top="scrollTop" scroll-y class="scroll-Y">
    <reclist ref="recoRef"></reclist>
  </scroll-view>

  <!-- 悬浮按钮 -->
  <view class="float-button" @click="fabClick"><uni-icons type="arrow-up" size="30" color="white"></uni-icons></view>
</template>

<style scoped>
.float-button {
  position: fixed; /* 固定位置 */
  bottom: 30px; /* 距离底部50px */
  right: 15px; /* 距离右侧30px */
  width: 55px; /* 宽度 */
  height: 55px; /* 高度 */
  background-color: #ffb6c1; /* 背景颜色 */
  color: white; /* 字体颜色 */
  text-align: center; /* 文字居中 */
  line-height: 50px; /* 行高与容器高度相同 */
  border-radius: 50%; /* 圆角 */
  z-index: 999; /* 确保按钮在最上层 */
  box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.3);
}
.container {
  position: static;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
}

.ele1 {
  flex: 10%;
}

.ele2 {
  flex: 90%
}

.scroll-Y {
  height: 100%;
}

</style>