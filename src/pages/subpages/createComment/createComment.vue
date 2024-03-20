<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

interface param {
  dishId: string,
  // 是否comment
  mode: string
}
const state = ref([
  { value: 0, text: "否" },
  { value: 1, text: "是" }
])

const pageParam = ref<param>()
const content = ref<string>()
const imageValue = ref<string[]>([])
const comData = ref({
  content: '',
  imageValue: [''],
  rate: 3,
  state: 1
})
const success = (e: any) => {
  console.log("上传成功success", e);
}
const progress = (e: any) => {
  console.log("progress", e);

}
const fail = (e: any) => {
  console.log("fail", e);

}
const select = (e: any) => {
  console.log("select", e);

}
const comfireComment = () => {
  comData.value.content = content.value as string;
  comData.value.imageValue = imageValue.value as string[];
  console.log(comData.value);
  console.log(imageValue.value);
}

onLoad((query) => {
  // 通过 query 可以获取传递的参数
  pageParam.value = query as param
});
</script>

<template>
  <view class="view-com pdlr">
    <textarea class="input-cont" v-model="content" placeholder="说点什么......" />
  </view>

  <view v-if="pageParam?.mode==='1'">
    <view class="view-com">
      <uni-file-picker limit="3" v-model="imageValue" @progress="progress" @fail="fail" @select="select"
        @success="success" title="最多上传3张图片"></uni-file-picker>
    </view>

    <view class="view-com pdlr">
      <view class="rate">评分</view>
      <uni-rate v-model="comData.rate" allow-half :is-fill="false" margin="20" />
    </view>

    <view class="view-com pdlr">
      <span>是否推荐到首页</span>
      <uni-data-checkbox class="setContain" v-model="comData.state" :localdata="state"></uni-data-checkbox>
    </view>
  </view>

  <view class="fixed-footer">
    <button class="comfire-btn" hover-class="button-hover" @click="comfireComment">
      确定发布
    </button>
  </view>
</template>

<style scoped>
.view-com {
  width: 100%;
  margin: 10px 0;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
}

.rate {
  padding-bottom: 10px;
}

.pdlr {
  padding-left: 10px;
  padding-right: 10px;
}

.mgr {
  margin-left: 20px;
}

.input-cont {
  height: 160px;
  width: 720rpx;
}

.comfire-btn {
  border-radius: 10px;
  width: 90%;
  background-color: #ffb6c1;
  color: #ffffff;
}

.setContain {
  float: right;
  text-align: right;
}

.fixed-footer {
  position: fixed;
  left: 0;
  bottom: 10px;
  width: 100%;
  height: 36px;
  /* 底部栏的高度 */
  color: #808080;
  padding-bottom: 5px;
}
</style>