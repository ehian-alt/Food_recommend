<script lang="ts" setup>
import forumSwiper from './components/forumSwiper.vue'
import dishCommend from '@/pubcomp/dish/dishCommend/dishCommend.vue'
</script>

<template>
  <!-- 轮播图 -->
  <view class="forum-swiper">
    <forumSwiper/>
  </view>
  <!-- 论坛评论 -->
  <view class="form-commend">
    <dishCommend></dishCommend>
  </view>
</template>

<style scoped>
.forum-swiper{
  background-color: rgb(255, 255, 255);
}
.form-commend{
  margin-top: 10px;
  background-color: #fff;
}
</style>