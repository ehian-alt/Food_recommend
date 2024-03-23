<script lang="ts" setup>
import { useuserStore } from '@/stores/user';
import { onLoad } from '@dcloudio/uni-app';
import { loginAPI } from '@/services/login';
const userStore = useuserStore();

let openid = ''
onLoad(() => {
  wx.login({
    success(res) {
      if (res.code) {
        // 构造url并获得openid，通过openid进行登录判断
        let URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx72305f1709136d64&secret=4729f056b514c365f09c7bc5a836a50e&js_code=' + res.code + '&grant_type=authorization_code'
        wx.request({
          url: URL,
          method: 'GET',
          success: function (result: any) {
            // 发送登录请求获得token和openid并持久化存储
            openid = result.data.openid
          }
        })
      }
    }
  })
})

const getOpenId = async () => {
  let res = await loginAPI(openid);
  if (res.code === 0) {
    // 失败了，即没有登陆注册过
    console.log("未进行注册");
    uni.showToast({ icon: 'none', title: "账号信息未完善" })

    uni.navigateTo({ url: "/pages/subpages/upInfo/upInfo?newUser="+"1"+"&&openid="+openid })
  } else {
    console.log("登陆成功");
    userStore.setUserInfo(res.data);
    // 跳转到首页
    uni.showToast({
      icon: 'none',
      title: "登录成功",
      position: 'center',
    })
    uni.reLaunch({
      url: '/pages/home/home',
    })
  }

}

</script>

<template>
  <view class="login-page">
    <button class="login-btn" size="default" @click="getOpenId">一键登录</button>
  </view>
</template>

<style scoped>
.login-page {
  height: 800rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
}

.login-btn {
  width: 90%;
  border-radius: 100px;
  background-color: #ffb6c1;
}
</style>