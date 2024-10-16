<template>
    <view class="wrap">
        <view class="top"></view>
        <view class="content">
            <!-- <view class="title">欢迎登录</view> -->
            <u-form-item>
                <u-input type="password" v-model="oldPassword" placeholder="请输入旧密码" />
            </u-form-item>
            <u-form-item>
                <u-input type="password" v-model="newPassword" placeholder="请输入新密码" />
            </u-form-item>
            <u-gap height="20"></u-gap>
            <!-- <button @click="submit" class="getSmsCode">修 改</button> -->
            <up-button type="primary" text="修 改" style="width: 60vw;" @click="submit"></up-button>
            <!-- <view class="alternative">
                <view class="password" @click="passwordLogin()">忘记密码</view>
                <view class="issue" @click="loginBy()">遇到问题</view>
            </view> -->
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { updatePwd } from '@/apis/system'
// let userName = ref('')
let oldPassword = ref('')
let newPassword = ref('')

async function submit() {
    await updatePwd({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
    })
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
    uni.showToast({
        title: '修改成功,即将跳转...',
        icon: 'success',
        success: () => {
            setTimeout(() => { uni.navigateTo({ url: '/pages/login/index' }) }, 1500)
        }
    })
}
function loginBy(type) {
    uni.showToast({
        title: '开发中，请期待!',
        icon: 'none'
    })
}
</script>

<style lang="scss" scoped>
.wrap {
    font-size: 28rpx;

    .content {
        width: 600rpx;
        margin: 0 auto;
        padding-top: 80rpx;

        .title {
            text-align: center;
            font-size: 60rpx;
            font-weight: 500;
            margin-bottom: 100rpx;
        }

        input {
            text-align: left;
            margin-bottom: 10rpx;
            padding-bottom: 6rpx;
        }

        .tips {
            color: yellow;
            font-size: 20rpx;
            margin-bottom: 60rpx;
            margin-top: 30rpx;
        }

        .getSmsCode {
            background-color: #3c9cff;
            color: #fff;
            border: none;
            font-size: 30rpx;
            padding: 12rpx 0;

            &::after {
                border: none;
            }
        }

        .alternative {
            color: #ccc;
            display: flex;
            justify-content: space-between;
            margin-top: 30rpx;
        }
    }

    .bottom {
        .loginType {
            display: flex;
            padding: 260rpx 150rpx 150rpx 150rpx;
            justify-content: space-between;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: $u-content-color;
                font-size: 28rpx;
            }
        }

        .hint {
            padding: 20rpx 40rpx;
            font-size: 20rpx;
            color: #ccc;

            .link {
                color: orange;
            }
        }
    }
}
</style>
