<script lang="ts" setup>
import { useuserStore } from '@/stores/user'
import type { useSSRContext } from 'vue';
const userStore = useuserStore();
import { http } from '@/utils/http'
const getData = async () => {
  let res = await http({
    method: 'GET',
    url: '/drugAll',
  })
  console.log(res)
}

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
    <button style="border: 1px solid red;" size='mini' hover-class="button-hover" @tap="userStore.clearUserInfo">
      清除
    </button>
    <button size="mini" type="primary" @tap="getData">
      测试网络请求
    </button>
  </view>
</template>
<style scoped></style>