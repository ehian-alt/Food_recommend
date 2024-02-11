<script lang="ts" setup>
import { ref } from 'vue'
import type { userInfo } from '@/types/userInfo';
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const Info = ref<userInfo>({
  avatarUrl: defaultAvatarUrl,
  nickName: "这是一个昵称",
  gender: 1
})

const onChooseAvatar = (e) => {
  Info.value.avatarUrl = e.detail.avatarUrl
}
const value=0;
const range = ref([
  {value:0, text:"女"},
  {value:1, text:"男"}
])
const change = (e)=>{
  console.log(e);
}
</script>

<template>
  <view class="item-list">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <view class="tip">头像</view>
      <image class="avatar" :src=Info.avatarUrl></image>
    </button>
    <view style="padding: 10px;">
      <view class="tip">昵称</view>
      <input style="float: right; text-align: right;" type="nickname" class="weui-input" width="50%" placeholder="请输入昵称" :value="Info.nickName"/>
    </view>
    <!-- <uni-section title="本地数据" type="line">
      <uni-data-select
        v-model="value"
        :localdata="range"
        @change="change"
      ></uni-data-select> -->
  </view>
</template>

<style scoped>
.item-list {
  margin: 10px;
  width: 90%;
  position: relative;
}

.tip {
  font-size: 16px;
  float: left;
}

.avatar-wrapper {
  text-align: left;
  box-sizing: border-box;
  border-top: #f0f0f0 1px solid;
  border-bottom: #f0f0f0 1px solid;
  padding: 10px;
}

.avatar {
  position: relative;
  float: right;
  right: 20px;
  height: 100rpx;
  width: 100rpx;
}
</style>