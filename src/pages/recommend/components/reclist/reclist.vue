<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps();
let ms = ref('')
const pattern = ref({
  buttonColor	:'#ffb6c1',
  icon:"arrow-up",
})
const scrollTop = ref(0)
uni.$on('saveTaste', (data) => {
  ms.value = data.filterData
  console.log("口味偏好", ms.value);
  // 发送请求

})
const fabClick = () => {
  uni.pageScrollTo({
    scrollTop: 0, // 滚动到顶部的位置
    duration: 300 // 滚动动画的持续时间，单位ms
  });
}


</script>

<template>
  <view>
    <scroll-view :scroll-top="scrollTop" scroll-y class="scroll-Y">
      <view class="scroll-view-item" v-for="(item, key) in 100">
        <image class="recommend-img"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          mode="aspectFill"
        />

      </view>
    </scroll-view>
    <uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" />
  </view>
  <div class="reclist">msg:{{ ms }}</div>
</template>

<style scoped>
.recommend-img{
  border-radius: 20px;
  overflow: hidden;
  height: 120px;
  width: 120px;
}
.scroll-Y {
  height: 100%;
}

.scroll-view-item {
  border-radius: 20px;
  padding: 8px;
  background-color: #fff;
  margin: 10px;
}
</style>