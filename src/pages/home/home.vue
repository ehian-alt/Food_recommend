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
  <search></search>
  <homeGird />
</template>

<style>
</style>