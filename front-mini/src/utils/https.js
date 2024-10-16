const baseUrl= {
    'test': import.meta.env.VITE_APP_BASE_URL,
    'prod': import.meta.env.VITE_APP_BASES_URL,
    'dev': 'http://36.133.164.23:30001/admin-api',
    // 'dev': 'http://192.168.10.129:30001/admin-api',//hw
    // 'dev': 'http://192.168.10.117:30001/admin-api',//wq
    // 'test': location.protocol.indexOf('https') < 0 ? import.meta.env.VITE_APP_BASE_URL : import.meta.env.VITE_APP_BASES_URL,
}[import.meta.env.MODE]

function checkData(data) {
    let obj = {}
    if (data) {
        Object.keys(data).map((key) => {
            if (data[key]) {
                obj[key] = data[key]
            }
        })

    }
    return obj
}
export const request = ({ url, data, method }) => {
    console.log(url);

    const params = checkData(data)
    const token = uni.getStorageSync('token') || ''
    if (['/system/auth/login', '/pay/channel/getWechatChannelByAppId'].includes(url) || token) {
        return new Promise((reslove, reject) => {
            uni.request({
                url: baseUrl + url,
                data: {
                    ...params,
                    
                },
                method,
                header: {
                    'Authorization': 'Bearer ' + token,
                    'tenant-id': 1
                },
                success: (req) => {
                    if (req.data.code == 0) {
                        reslove(req.data)
                    } else if (req.data.code == 401) {
                        uni.showToast({
                            title: req.data.msg,
                            icon: 'none'
                        })
                        uni.removeStorageSync('token')
                        uni.removeStorageSync('userInfo')
                        reject(req.data)
                    } else {
                        uni.showToast({
                            title: req.data.msg,
                            icon: 'none'
                        })
                        reject(req.data)
                    }
                },
                fail: (err) => {
                    reject(err)
                },
            })
        })
    } else {
        uni.showToast({
            title: '未登录或登录失效，请先登录',
            icon: 'none'
        })
        console.log('登录失效');
        // uni.navigateTo({
        //     url: '/pages/login/index'
        // })
    }

}