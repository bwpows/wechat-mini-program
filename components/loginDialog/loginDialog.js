const { get } = require("../../api/http");
const { getProfileUrl } = require("../../api/user");
const { getTokenByCodeUrl } = require("../../api/wechat");
const { loginWX } = require("../../util/wechat")

let app = getApp()

// components/loginDialog/loginDialog.js
Component({

    /**
     * 组件的初始数据
     */
    data: {
    },

    options: {
        addGlobalClass: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async goLogin () {
            try{
                wx.showLoading({
                  title: '加载中....',
                })
                let code = await loginWX()
                let data = await get(getTokenByCodeUrl(code))
                if(data.code == 200){
                    await wx.setStorageSync('token', data.data.token)
                    await this.getUserInfo()
                    app.globalData.isLogin = true
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
    },

})