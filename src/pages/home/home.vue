<script lang="ts" setup>
import homeGird from '@/pages/home/components/homeGird.vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import search from '@/pubcomp/search/search.vue'
import type { girdInstance } from '@/types/components';
import { ref } from 'vue';

const girdRef = ref<girdInstance>();

onReachBottom(()=>{
  console.log("onReachBottom");
  girdRef.value?.getRecoItems()
})
</script>

<template>
  <view class="search">
    <search></search>
  </view>
  
  <homeGird ref="girdRef"/>
</template>

<style>
.search{
  position: static;
  top: 0;
  z-index: 999;
}
</style>