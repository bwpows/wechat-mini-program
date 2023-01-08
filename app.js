//app.js

import { get } from "./api/http"
import { getProfileUrl } from "./api/user"
import { getTokenByCodeUrl } from "./api/wechat"
import { loginWX } from "./util/wechat"

App({
    async onLaunch() {
        await this.getTokenByCode()
        this.checkToken()
    },


    async getTokenByCode(){
        try{
            let code = await loginWX()
            let data = await get(getTokenByCodeUrl(code))
            if(data.code == 200){
                await wx.setStorageSync('token', data.data.token)
                await this.getUserInfo()
            }
        } catch (err) {
            console.log(err);
            wx.showToast({
              title: '获取code失败',
              icon: 'error'
            })
        }
    },

    // 检查本地的token
    checkToken(){
        //   获取本地的token
        try {
            var value = wx.getStorageSync('token')
            if (!value) {
                wx.reLaunch({
                    url: 'pages/login/login'
                })
            }
        } catch (e) {
            console.log('获取不到token')
        }
    },

    // 获取用户信息
    async getUserInfo(){
        let res = await get(getProfileUrl)
        if(res.code == 200){
            await wx.setStorageSync('userId', res.data.userId)
        }
    },

    globalData: {
        userInfo: null
    }
})