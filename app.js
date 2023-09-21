//app.js
import { get, post } from "./api/http"
import { getProfileUrl } from "./api/user"
import { postWechatLogin } from "./api/wechat"
import { loginWX } from "./util/wechat"

App({
    async onLaunch() {
        this.getSystemInfo()
    },

    async onShow(sence){
        if(sence.path !== 'pages/autoLogin/autoLogin') this.globalData.preRouteUrl = sence.path
        await this.checkToken()
    },

    // async getTokenByCode(){
    //     try{
    //         let code = await loginWX()
    //         let data = await post(postWechatLogin, { code })
    //         if(data.code == 200){
    //             await wx.setStorageSync('token', data.data.token)
    //             await this.getUserInfo()
    //         }
    //     } catch (err) {
    //         wx.showToast({
    //           title: '获取code失败',
    //           icon: 'error'
    //         })
    //     }
    // },

    // 检查本地的token
    async checkToken(){
        //   获取本地的token
        try {
            let value = wx.getStorageSync('token')
            if (!value) {
                this.autoLogin()
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
 
    async autoLogin () {
        try{
            wx.showLoading({
              title: '加载中....',
            })
            let code = await loginWX()
            let data = await post(postWechatLogin, { code })
            if(data.code == 200){
                await wx.setStorageSync('token', data.data.token)
                await this.getUserInfo()
                this.globalData.isLogin = true
                let pages = getCurrentPages();
                let currPage = ''
                if (pages.length) {
                    // 获取当前页面的对象（上边所获得的数组中最后一项就是当前页面的对象）
                    currPage = pages[pages.length - 1];
                }
                wx.reLaunch({
                    url: '/'+currPage.route,
                })
            }else{
                wx.reLaunch({
                  url: '/pages/login/login',
                })
            }
        }catch(err){
            wx.reLaunch({
                url: '/pages/login/login',
              })
        }finally{
            wx.hideLoading()
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