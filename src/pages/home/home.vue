<script lang="ts" setup>
import homeGird from '@/pages/home/components/homeGird.vue'
import { http } from '@/utils/http';
import { onLoad } from '@dcloudio/uni-app';

onLoad(()=>{
  http({
    method:'GET',
    url:'/test'
  })
})
</script>

<template>
  <homeGird />
</template>

<style>
page{
  background-color: #f0f0f0;
  background-color: #781e1e;
}
</style>