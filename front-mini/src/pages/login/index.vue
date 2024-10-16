<template>
    <view class="wrap">
        <view class="top"></view>
        <view class="content">
            <view class="title">欢迎登录</view>
            <u-form-item>
                <u-input v-model="username" placeholder="请输入用户名" />
            </u-form-item>
            <u-form-item>
                <u-input type="password" v-model="password" placeholder="请输入密码" />
            </u-form-item>
            <u-gap height="20"></u-gap>
            <up-button type="primary" text="登 录" style="width: 60vw;" @click="submit"></up-button>
            <!-- <view class="alternative">
                <view class="password" @click="passwordLogin()">忘记密码</view>
                <view class="issue" @click="loginBy()">遇到问题</view>
            </view> -->
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { login, userInfo } from '@/apis/system'
let username = ref('')//admin   
let password = ref('')//admin123
async function submit() {
    if (!username.value || !password.value) {
        return uni.showToast({
            title: '账号密码不能为空。',
            icon: 'none'
        })
    }
    const res = await login({
        tenantName: "管理系统",
        username: username.value,
        password: password.value,
    })
    console.log(res);
    if (res) {
        uni.setStorageSync('token', res.data.accessToken)
        const info = await userInfo()
        console.log(info);
        uni.setStorageSync('userInfo', info.data.user)
        uni.showToast({
            title: '登录成功！',
            icon: 'success',
            success: () => {
                setTimeout(() => { uni.navigateTo({ url: '/pages/index/index' }) }, 1500)
            }
        })
    }
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
