<script lang="ts" setup>
import search from '@/pubcomp/search/search.vue'
import classify from '@/pages/recommend/components/classify/classify.vue'
import reclist from './components/reclist/reclist.vue';
</script>

<template>
  <view class="container">
    <classify class="ele1"></classify>
    <search class="ele2"></search>
  </view>

  <reclist></reclist>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.ele1 {
  flex: 10%;
}

.ele2 {
  flex: 90%
}
</style>