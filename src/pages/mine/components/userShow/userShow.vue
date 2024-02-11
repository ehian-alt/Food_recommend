<template>
    <view class="avatar-bg">
    <image class="avatar-mine" src="" mode="scaleToFill" />
    <view class="nick-name">{{ "这是一个昵称" }}</view>
  </view>
</template>

<script lang="ts" setup>
  const props = defineProps();
</script>

<style scoped>
.avatar-bg {
  padding-top: 50rpx;
  padding-bottom: 20rpx;
  background-color: #ffb6c1;
  text-align: center;
}

.avatar-mine {
  height: 200rpx;
  width: 200rpx;
  border-radius: 50%;
  background-color: #fff;
}

.nick-name {
  margin: 20rpx;
}
</style>