import {request} from '@/utils/https'

//登录
export const login = (data)=>{
    return request({
        url:'/system/auth/login',
        data,
        method:'POST',
    })
}
//退出
export const logout = ()=>{
    return request({
        url:'/system/auth/logout',
        method:'POST',
    })
}
//修改密码
export const updatePwd = (data)=>{
    return request({
        url:`/system/user/profile/update-password`,
        data,
        method:'PUT',
    })
}
//获取用户信息
export const userInfo = ()=>{
    return request({
        url:'/system/auth/get-permission-info',
        method:'GET',
    })
}