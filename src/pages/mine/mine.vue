<script lang="ts" setup>
import { useuserStore } from '@/stores/user'
import type { useSSRContext } from 'vue';
const userStore = useuserStore();
</script>

<template>
  <view class="mine">
    <view>
      info:{{ userStore.userInfo }}
    </view>
    <button style="border: 1px solid #000000;" @tap="
      userStore.setUserInfo({
        token: '2323232',
        name: 'namename'
      })
      " size="mini" type="primary">
      保存</button>
    <button style="border: 1px solid red;" hover-class="button-hover" @tap="userStore.clearUserInfo">
      清除
    </button>
  </view>
</template>
<style scoped></style>