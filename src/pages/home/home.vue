<script lang="ts" setup>
import homeGird from '@/pages/home/components/homeGird.vue'
import { http } from '@/utils/http';
import { onLoad } from '@dcloudio/uni-app';
import search from '@/pubcomp/search/search.vue'

onLoad(()=>{
  http({
    method:'GET',
    url:'/test'
  })
})
</script>

<template>
  <view class="search">
    <search></search>
  </view>
  
  <homeGird />
</template>

<style>
.search{
  position: static;
  top: 0;
  z-index: 999;
}
</style>