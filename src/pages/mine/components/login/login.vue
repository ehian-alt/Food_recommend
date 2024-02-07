<script lang="ts" setup>
import { ref } from 'vue'
import { http } from '@/utils/http'
import { onLoad } from '@dcloudio/uni-app';
import { useuserStore } from '@/stores/user';
const userStore = useuserStore();
const props = defineProps();
// 获取用户基本信息


const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

let avatarUrl = ref(defaultAvatarUrl);
const onChooseAvatar = (e) => {
  console.log(e.detail.avatarUrl);
  avatarUrl.value = e.detail.avatarUrl
}
const getUserProfile = (e) => {
  console.log(e);
  console.log(e.detail.userInfo.avatarUrl);

  avatarUrl.value = e.detail.userInfo.avatarUrl
  console.log(avatarUrl.value);

}
let js_code = ''

const getJsCode = async () => {
  await wx.login({
    success(res) {
      if (res.code) {
        js_code = res.code
        console.log("js_code: " + js_code)
      }
    }
  })
}
getJsCode();
const getOpenId = () => {
  getJsCode()
  console.log("jscode:" + js_code);
  if (js_code.length > 0) {
    let URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx72305f1709136d64&secret=4729f056b514c365f09c7bc5a836a50e&js_code=' + js_code + '&grant_type=authorization_code'
    wx.request({
      url: URL,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        userStore.setUserInfo(res.data);
      }
    })
  }
}


</script>

<template>
  <div class="login">login</div>
  <view class="login-com">
    <!-- <uni-icons type="contact-filled" color="#ffb6c1" size="100" /> -->
    <button class="login-btn" size="default" open-type="getUserInfo" @getuserinfo="getUserProfile">
      授权登录
    </button>
  </view>

  <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
    <image class="avatar" :src=avatarUrl></image>
  </button>

  <input type="nickname" class="weui-input" placeholder="请输入昵称" />

  <view>
    <button size="default" @click="getOpenId">
      点击获取openid
    </button>
  </view>
</template>

<style scoped>
.login-com {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn {
  width: 90%;
  border-radius: 100px;
  background-color: #ffb6c1;
}
</style>