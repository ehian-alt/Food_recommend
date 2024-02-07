<script lang="ts" setup>
import { useuserStore } from '@/stores/user'
const userStore = useuserStore();
import { http } from '@/utils/http'

const loginTest = async ()=>{
  let res = await http({
    method:'POST',
    url:'/user/login',
    data:{
      openid: userStore.userInfo.openid,
    }
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
      " size="mini">
      保存</button>
    <button style="border: 1px solid red;" size='mini' hover-class="button-hover" @tap="userStore.clearUserInfo">
      清除
    </button>

    <button size="mini"
      @click="loginTest"
    >
      后端登录接口测试
    </button>
  </view>
</template>
<style scoped></style>