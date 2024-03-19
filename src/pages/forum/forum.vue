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