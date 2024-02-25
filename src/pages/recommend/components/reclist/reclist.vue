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
  <!-- <div class="reclist">msg:{{ ms }}</div> -->
    <scroll-view :scroll-top="scrollTop" scroll-y class="scroll-Y">
      <navigator class="scroll-view-item" v-for="(item, key) in 100" :key="3" :url="`/pages/subpages/dishInfo/dishInfo?dishId=${ key }`">
        <!-- 菜品图片区域 -->
        <image class="recommend-img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="aspectFill" />
        <!-- 文字区域 -->
        <view class="recommend-itemtext">
          <!-- 菜品名称 -->
          <text class="dish-name">这是个菜名这是个菜名这是个菜名这是个菜名</text>
          <!-- 食堂 价格 -->
          <view class="dish-info">{{ "一食堂" }}&emsp;￥{{ 6.66 }}</view>
          <!-- 评分 -->
          <span class="pf">评分：{{ 4.5 }}</span>
          <!-- 收藏 -->
          <span class="sc">收藏
              <image v-if="true" class="icons" src="@/static/icons/star.png" />
              <image v-else class="icons" src="@/static/icons/star-fill.png" />
          </span>
        </view>
      </navigator>
    </scroll-view>
    <!-- 悬浮按钮 -->
    <uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" />
  </view>
</template>

<style scoped>
.recommend-itemtext{
  flex:60%;
  padding: 5px 8px 5px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border: #000 1px solid; */
  position: relative;
}
.recommend-img{
  border-radius: 20px;
  overflow: hidden;
  height: 110px;
  width: 110px;
}
.dish-name{
  font-family: "宋体", "SimSun", sans-serif;
  font-weight: bold;
  font-size: 23px;
}
.dish-info{
  margin: 10px 0;
  font-size: 15px;
  color: #808080;
}
.pfsc{
  position: absolute;
  margin: 5px 0;
  bottom: 0;
  color:#000;
}
.pf{
  position: absolute;
  left: 20px;
  bottom: 5px;
}
.sc{
  position: absolute;
  right: 8px;
  bottom: 5px;
}
.scroll-Y {
  height: 100%;
}

.scroll-view-item {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  padding: 8px;
  background-color: #fff;
  margin: 10px;
}

.icons {
    height: 1.2rem;
    width: 1.2rem;
    transform: translateY(20%);
}
</style>