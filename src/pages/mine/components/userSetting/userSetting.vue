<template>
  <view class="setting">
    <navigator class="setting-item" url="/pages/subpages/upInfo/upInfo" open-type="navigate">
      信息设置
    </navigator>
    <navigator class="setting-item" url="/pages/subpages/likes/likes" open-type="navigate">
      我的收藏
    </navigator>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps();
</script>

<style scoped>
.setting {
  padding: 0 10px;
  border-radius: 10px;
  width: 90%;
  margin: 20px auto;
  background: #fff;
}
.setting-item{
  box-sizing: border-box;
  padding: 10px;
  border-top: #f0f0f0 1px solid;
  border-bottom: #f0f0f0 1px solid;
}
</style>