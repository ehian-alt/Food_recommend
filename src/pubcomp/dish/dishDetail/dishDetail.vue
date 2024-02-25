<script lang="ts" setup>
  const props = defineProps();
</script>

<template>
  <view class="detail">
    <view>
      <span>中辣&emsp;</span>
      <span>偏咸&emsp;</span>
    </view>
    <view>平均评分:{{ 4.5 }}</view>
    <view>xx人已收藏</view>
  </view>
</template>

<style scoped>
.detail{
  border-top:1px solid #f0f0f0;
  margin-top:5px;
  padding-top: 5px;
}
</style>