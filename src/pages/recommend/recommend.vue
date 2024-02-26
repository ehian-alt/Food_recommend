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
const pattern = ref({
  buttonColor: '#ffb6c1',
  icon: "arrow-up",
})
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
  <uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" />
</template>

<style scoped>
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