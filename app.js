//app.js
import { get } from "./api/http"
import { getProfileUrl } from "./api/user"
import { getTokenByCodeUrl } from "./api/wechat"
import { loginWX } from "./util/wechat"

App({
    async onLaunch() {
        this.getSystemInfo()
    },

    async onShow(sence){
        if(sence.path !== 'pages/autoLogin/autoLogin') this.globalData.preRouteUrl = sence.path
        await this.getTokenByCode()
        await this.checkToken()
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
                this.globalData.isLogin = false
            }else{
                this.globalData.isLogin = true
                wx.reLaunch({
                  url:  this.globalData.preRouteUrl || '/pages/work/work',
                })
                this.globalData.preRouteUrl = ''
            }
        } catch (e) {
        }
    },

    // 获取用户信息
    async getUserInfo(){
        let res = await get(getProfileUrl)
        if(res.code == 200){
            await wx.setStorageSync('userId', res.data.userId)
        }
    },

    async getSystemInfo(){
        let that = this
        wx.getSystemInfo({
            success(res){
                that.globalData.isBangs = res.safeArea.top > 20
                that.globalData.safeArea = res.safeArea
            }
        })
    },

    globalData: {
        userInfo: null,
        preRouteUrl: '',
        isLogin: null,
        isBangs: true,
        safeArea: {}
    }
})