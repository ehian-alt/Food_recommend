<script lang="ts" setup>
import type { userInfo } from '@/types/userInfo';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { getInfoByOpenid } from '@/services/mine'
import { useuserStore } from '@/stores/user';

const userStore = useuserStore();

const myInfo = ref<userInfo>()
const getData = async (opid: string) => {
  let res = await getInfoByOpenid(opid);
  myInfo.value = res.data;
  let obs = JSON.stringify(myInfo.value);
  uni.setStorage({
    key:'myInfo',
    data:obs,
  })
}

onLoad(() => {
  getData(userStore.userInfo.openid);
})
</script>

<template>
  <view class="avatar-bg">
    <image class="avatar-mine" :src="myInfo?.avatarUrl" />

    <view class="nick-name">
      <image class="gender-icon"
        :src="myInfo?.gender ? '../../../../static/icons/man.png' : '../../../../static/icons/woman.png'">
      </image>
      {{ myInfo?.nickName }}
    </view>

  </view>
</template>

<style scoped>
.avatar-bg {
  padding-top: 50rpx;
  /* padding-bottom: 20rpx; */
  background-color: #dbb2b7;
  /* background-image: url(https://img.yzcdn.cn/vant/cat.jpeg); */
  text-align: center;
}

.avatar-mine {
  height: 200rpx;
  width: 200rpx;
  border-radius: 50%;
  background-color: #fff;
}

.gender-icon {
  height: 20px;
  width: 20px;
  margin-right: 20px;
}

.nick-name {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20rpx;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>