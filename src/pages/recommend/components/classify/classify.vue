<script>
import { ref } from 'vue';
export default {
  data() {
    return {
      showLeft: false,
      filterData: {
        canteen: null,
        spicy: null,
        salinity: null
      },
      // 食堂
      canteens: [{
        text: '一食堂',
        value: 1
      }, {
        text: '二食堂',
        value: 2
      }, {
        text: '三食堂',
        value: 3
      }, {
        text: '四食堂',
        value: 4
      }, {
        text: '五食堂',
        value: 5
      }, {
        text: '全部',
        value: null
      },],
      // 辣度
      spicys: [{
        text: '不辣',
        value: 1
      }, {
        text: '微辣',
        value: 2
      }, {
        text: '中辣',
        value: 3
      }, {
        text: '爆辣',
        value: 4
      }, {
        text: '全部',
        value: null
      },],
      // 咸度
      salinitys: [{
        text: '清淡',
        value: 1
      }, {
        text: '一般',
        value: 2
      }, {
        text: '偏咸',
        value: 3
      }, {
        text: '全部',
        value: null
      },]
    }
  },
  methods: {
    confirm() { },
    // 打开窗口
    showDrawer(e) {
      this.$refs[e].open()
    },
    // 取消，关闭窗口
    closeDrawer(e) {
      this.$refs[e].close()
    },
    // 确定，筛选
    confirmeFilter(e) {
      this.$refs[e].close()
      // TODO 保存口味偏好，发送请求
      uni.$emit('saveTaste', { filterData: this.filterData })
    }
  },
  onNavigationBarButtonTap(e) {
    if (this.showLeft) {
      this.$refs.showLeft.close()
    } else {
      this.$refs.showLeft.open()
    }
  },
}
</script>

<template>
  <view class="example-body">
    <uni-icons type="tune" size="30" color="#efefef" @click="showDrawer('showLeft')"></uni-icons>
    <uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event, 'showLeft')">
      <view style="padding-left: 10px;">
        <uni-section title="食堂" type="line">
          <uni-data-checkbox v-model="filterData.canteen" :localdata="canteens" />
        </uni-section>
        <uni-section title="辣度" type="line">
          <uni-data-checkbox v-model="filterData.spicy" :localdata="spicys" />
        </uni-section>
        <uni-section title="咸度" type="line">
          <uni-data-checkbox v-model="filterData.salinity" :localdata="salinitys" />
        </uni-section>
      </view>
      <view class="close" type="inline">
        <button class="tap-btn-false" type="default" @click="closeDrawer('showLeft')">取消</button>
        <button class="tap-btn-true" @click="confirmeFilter('showLeft')">确定</button>
      </view>
    </uni-drawer>
  </view>
</template>

<style scoped>
.example-body {
  background-color: #ffb6c1;
  display: flex;
  justify-content: center;
  /* 水平居中 */
  width: 50px;
  height: 46px;
}

.close {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
}

.tap-btn-false {
  flex: 50%;
  margin-left: 10%;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: #fff;
  width: 40%;
}

.tap-btn-true {
  flex: 50%;
  margin-right: 10%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 40%;
  border-left: none;
  background-color: #ffb6c1;
}
</style>