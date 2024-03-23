<script lang="ts" setup>
import { ref } from 'vue'
import type { userInfo } from '@/types/userInfo';
import { onLoad } from '@dcloudio/uni-app';
import { updateMyInfoAPI, addUserAPI } from '@/services/mine'
import { useuserStore } from '@/stores/user';
import { loginAPI } from '@/services/login';
const userStore = useuserStore()

const defaultAvatar = 'https://jju-dish-recommend.oss-cn-hangzhou.aliyuncs.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg';

const Info = ref<userInfo>({
  openid: '',
  avatarUrl: defaultAvatar,
  nickName: '',
  gender: 1,
  state: 1
})

const sex = ref([
  { value: 0, text: "女" },
  { value: 1, text: "男" }
])

const onChooseAvatar = (e: any) => {
  console.log(e.detail.avatarUrl);
  Info.value.avatarUrl = e.detail.avatarUrl;
  console.log("new avatar", Info.value.avatarUrl);
}

const setNickName = (e: any) => {
  Info.value.nickName = e.detail.value
}
let upOrIn = 1;
const addUser = async (Info: userInfo) => {
  await addUserAPI(Info)
}
const login = async (openid: string) => {
  let res = await loginAPI(openid);
  userStore.setUserInfo(res.data)
}
onLoad((query) => {
  if (query?.newUser === '1') {
    upOrIn = 0;
    Info.value.openid = query?.openid;
    addUser(Info.value)
    setTimeout(() => {
      login(Info.value.openid)
    }, 1000)
  }
  console.log("Info", Info.value);
})

const comfire = async () => {
  console.log("发送更新请求", Info.value);
  /* TODO 发送更新请求*/
  await updateMyInfoAPI(Info.value)
  // userStore.setUserInfo(Info.value)
  uni.removeStorageSync('myInfo');
  uni.showToast({
    icon: 'success',
    title: '保存成功！'
  })
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/home/home',
    })
  }, 1500)
}

onLoad(() => {
  uni.getStorage({
    key: "myInfo",
    success: (success) => {
      let obs = success.data
      if (obs) {
        Info.value = JSON.parse(obs);
      }
    },
    fail: (_fail) => {
      upOrIn = 0;
      Info.value.openid = userStore.userInfo.openid
    },
  })
})
</script>

<template>
  <view class="item-list">
    <button class="avatar-wrapper set-item" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <view class="tip">头像</view>
      <image class="avatar" :src=Info.avatarUrl></image>
    </button>
    <view class="set-item" type="line">
      <view class="tip">昵称</view>
      <input class="setContain" type="nickname" placeholder="请输入昵称" :value="Info.nickName" @change="setNickName" />
    </view>
    <view class="set-item">
      <view class="tip">性别</view>
      <uni-data-checkbox class="setContain" v-model="Info.gender" :localdata="sex"></uni-data-checkbox>
    </view>
  </view>

  <view>
    <button class="comfire-btn" size="default" @click="comfire">
      保存
    </button>
  </view>
</template>

<style scoped>
.item-list {
  border-radius: 20px;
  margin: 10px auto;
  padding: 0 10px;
  width: 90%;
  position: relative;
  background-color: #fff;
}

.avatar-wrapper {
  border: none;
  text-align: left;
  box-sizing: border-box;
  background-color: #fff;
}

.avatar {
  position: relative;
  float: right;
  right: 20px;
  height: 100rpx;
  width: 100rpx;
}

.set-item {
  padding: 10px;
  border-top: #f0f0f0 1px solid;
  border-bottom: #f0f0f0 1px solid;
}

.tip {
  font-size: 16px;
  width: 30%;
  display: inline-block;
}

.setContain {
  float: right;
  text-align: right;
}

.comfire-btn {

  width: 90%;
  border-radius: 100px;
  background-color: #ffb6c1;
}
</style>