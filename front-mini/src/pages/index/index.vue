<template>
  <view>
    <div class="user-form" v-if="userInfo.nickname">
      欢迎您，{{ userInfo.nickname }}
    </div>
    <div class="user-form" v-else>
      请先登录
    </div>

    <up-cell-group style="background-color: #fff;">
      <up-cell title="登录" isLink url="/pages/login/index" v-if="!isLogin"></up-cell>
      <template v-else>
        <up-cell title="项目列表" isLink url="/pages/login/editPassWord"></up-cell>
        <up-cell title="修改密码" isLink url="/pages/login/editPassWord"></up-cell>
        <up-cell title="退出登录" @click="logout"></up-cell>
      </template>
    </up-cell-group>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const show = ref(false);
const mode = ref('range');
let selectDate = ref()

//computed
const isLogin = computed(() => {
  return !!uni.getStorageSync('token') || false
})
const userInfo = computed(() => {
  return uni.getStorageSync('userInfo') || {}
})

const confirm = (e) => {
  console.log(e);
  selectDate.value = e
  show.value = false
};

function handelShow() {
  show.value = true
}

function logout() {
  uni.showModal({
    title: '确认退出登录吗？',
    success({ confirm }) {
      if (confirm) {
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        uni.showToast({
          title: '退出成功',
          icon: 'none'
        })
        setTimeout(() => { uni.navigateTo({ url: '/pages/login/index' }) }, 500)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.user-form {
  padding: 40rpx 18rpx;
  font-size: 36rpx;
}
</style>