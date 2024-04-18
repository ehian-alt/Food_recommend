<script lang="ts" setup>
const props = defineProps();

const settings = [
  {text:'信息设置', path:"/pages/subpages/upInfo/upInfo"},
  {text:'我的收藏', path:"/pages/subpages/likes/likes"},
  {text:'我的评论', path:"/pages/subpages/myComment/myComment"},
  {text:'我的求助', path:"/pages/subpages/myQuestion/myQuestion"},
  {text:'我发起的投票', path:"/pages/subpages/myVote/myVote"},
]

</script>

<template>
  <view class="setting">
    <navigator v-for="(item, k) in settings" :key="k" class="setting-item" :url="item.path" open-type="navigate">
      {{ item.text }}
    </navigator>
  </view>
</template>

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