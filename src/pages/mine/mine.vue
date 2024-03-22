<script lang="ts" setup>
import userShow from '@/pages/mine/components/userShow/userShow.vue'
import userSetting from '@/pages/mine/components/userSetting/userSetting.vue'
import { useuserStore } from '@/stores/user';

const userStore = useuserStore();

const quitBtn = ()=>{
    userStore.clearUserInfo();
    uni.showToast({
        icon:'none',
        title:'退出登录成功'
    })
    setTimeout(()=>{
        uni.navigateTo({
        url:'/pages/login/login',
    })
    },1000)
}

</script>

<template>
    <userShow></userShow>
    <userSetting></userSetting>

    <view class="fixed-footer">
        <uni-row class="demo-uni-row" :width="730">
            <uni-col :span="2">
                <view class="fill-block"></view>
            </uni-col>

            <uni-col :span="20">
                <button class="quit-but" @tap="quitBtn">
                    退出登录
                </button>
            </uni-col>

            <uni-col :span="2">
                <view class="fill-block"></view>
            </uni-col>
        </uni-row>

    </view>

</template>
<style scoped>
.demo-uni-row {
  display: block;
}
.fill-block {
  height: 40px;
  background-color: #efefef;
}
.fixed-footer {
    position: fixed;
    left: 0;
    bottom: 30px;
    width: 100%;
    height: 40px;
    /* 底部栏的高度 */
}

.quit-but {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    color: #ffffff;
    background: #ffb6c1;
}
</style>