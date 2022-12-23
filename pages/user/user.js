// pages/user/user.js

const { baseUrl, get } = require("../../api/http")
const { getUserInfo } = require("../../api/user")

// import { baseUrl } from

// import http from '../../util/http'
// import { formatPhoneNumber } from '../../util/phone.wxs'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: wx.getStorageSync('userId'),
        isShow: false,
        baseUrl: baseUrl,
        userInfo: {},
        loading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
          title: '个人中心',
        })
        this.getUserInfo()
    },

    async onShow(){
        await this.getUserInfo()
        this.setData({
            userInfo: await wx.getStorageSync('user'),
            isShow: await wx.getStorageSync('isShow')  || false,
        })
    },

    async getUserInfo(){
        this.setData({
            loading: true
        })
        let res = await get(getUserInfo(this.data.userId))
        if(res.code == 200){
            this.setData({
                userInfo: res.data,
                loading: false
            })
            wx.setStorageSync('user', res.data)
        }
    },

    async exit(){
        wx.showModal({
            title: "确定要退出登录？",
            confirmColor: "red",
            confirmText: "退出",
            success: async function(res){
                if(res.cancel){}else{
                    await wx.clearStorage()
                    wx.reLaunch({
                        url: '/pages/login/login',
                    })
                }
            },
        })
    },

    goProfile(){
        wx.navigateTo({
          url: '/pages/profile/profile',
        })
    },

    goPhone(){
        wx.navigateTo({
          url: '/pages/phone/phone',
        })
    },

    goSetting(){
        wx.navigateTo({
          url: '/pages/setting/setting',
        })
    },

    goMywork(){
        wx.navigateTo({
          url: '/pages/mywork/mywork',
        })
    },

    goMyLike(){
        wx.navigateTo({
          url: '/pages/like/like',
        })
    },

    goHideWork(){
        wx.navigateTo({
          url: '/pages/hideWork/hideWork',
        })
    },

    goCardManage(){
        wx.navigateTo({
          url: '/pages/cardManage/cardManage',
        })
    }

})