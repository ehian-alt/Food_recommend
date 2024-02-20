<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps();
const searchValue = ref('')
// 回车搜索
const search = (res: any) => {
  uni.showToast({
    title: '搜索: ' + res.value,
    icon: 'none'
  })
}
// cancel取消
const cancel = () => {

}

</script>

<template>
  <view class="search-cont">
      <uni-search-bar class="search-btn"
       @confirm="search"
       v-model="searchValue"
       @cancel="cancel"
       bgColor="#f0f0f0"
       placeholder="请输入搜索内容"
       radius="50">
      </uni-search-bar>
  </view>
</template>

<style scoped lang="scss">
.search-cont {
  transform: translateY(-10px);
  background-color: #ffb6c1;
  padding:0 10px;
}
</style>