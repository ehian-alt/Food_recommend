<script lang="ts" setup>
import { ref } from 'vue'
const rateValue = ref(3)
const swiperList = ref([])
</script>

<template>
  <!-- 楼主 -->
  <view class="avatar-nickname">
    <image class="avatar-item" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <span class="nickname">{{ "昵称昵称" }}</span>
    <uni-rate :value="rateValue" :readonly="true" />
  </view>
  <view class="contant"><text>评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字</text></view>
  <!-- 图片 -->
  <swiper v-if="swiperList.length>0" indicator-dots autoplay circular indicator-active-color="#efefef" :interval="3000" :duration="1000">
    <swiper-item class="swiper-item" v-for="(item, key) in swiperList" :key="key">
      <view class="swiper-img">
        <image src="https://img.yzcdn.cn/vant/cat.jpeg" mode="aspectFill"></image>
      </view>
    </swiper-item>
  </swiper>
  <!-- 回复 -->
  <view class="tit">评论/提问回复</view>
  <view class="reply-items" v-for="item in 10">
    <view class="avatar-nickname">
      <image class="avatar-item" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span class="nickname">{{ "昵称昵称" }}</span>
    </view>
    <view class="contant"><text>评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字</text></view>
  </view>
</template>

<style scoped>
.avatar-nickname {
  margin-left: 10px;
  position: relative;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  top: 10px;
  left: 0;
}

.avatar-item {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}

.nickname {
  margin: 0 10px;
  font-size: 14px;
  color: #808080;
}

.contant {
  margin: 5px 10px 5px 52px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tit {
  padding-bottom: 5px;
  padding-left: 20px;
  width: 100%;
  border-bottom: 1px solid #808080;
  color: #707070;
  font-size: 14px;
}

.reply-items {
  margin-top: 5px;
  margin-left: 20px;
}
</style>