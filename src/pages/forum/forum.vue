<script lang="ts" setup>
import forumSwiper from './components/forumSwiper.vue'
import forumList from '@/pages/forum/forumList/forumList.vue'
import type { dishCommendInstance } from '@/types/components';
import { ref, onMounted } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';

const forumRef = ref<dishCommendInstance>();

onReachBottom(()=>{
  console.log("onReachBottom");
  forumRef.value.forumList();
})

</script>

<template>
  <!-- 轮播图 -->
  <view class="forum-swiper">
    <forumSwiper/>
  </view>
  <!-- 论坛评论 -->
  <view class="form-commend">
    <forumList ref="forumRef"></forumList>
  </view>

  <!-- 悬浮按钮 -->
  <navigator class="float-button" :url="`/pages/subpages/createComment/createComment?dishId=${undefined}&&mode=${0}`">发帖</navigator>
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
.forum-swiper{
  background-color: rgb(255, 255, 255);
}
.form-commend{
  padding-left: 20px;
  margin-top: 10px;
  background-color: #fff;
}
</style>