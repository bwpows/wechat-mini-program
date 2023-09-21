// pages/user/user.js
const { baseUrl, get } = require("../../api/http")
const { myInfoUrl } = require("../../api/my")
const { getUserInfo } = require("../../api/user")
const { agreePrivacy } = require("../../util/wechat")

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        isShow: false,
        baseUrl: baseUrl,
        userInfo: {},
        loading: true,
        isLogin: null,
        safeArea: {},
        scrollTop: 0,
        lineData: [],
        myInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
          title: '个人中心',
        })

        agreePrivacy(this)
    },

    async onShow(){
        this.getTabBar().setData({
            selected: 2,
        })
        this.checkLogin()
        this.setData({
            isShow: await wx.getStorageSync('isShow')  || false,
            userId: await wx.getStorageSync('userId'),
            isLogin: app.globalData.isLogin,
            safeArea: app.globalData.safeArea
        })
        if(app.globalData.isLogin) {
            await this.getUserInfo()
            await this.getMyInfo()
        }
    },

    async checkLogin() {
        const token = await wx.getStorageSync('token')
        if(!token) app.globalData.isLogin = false;
    },

    onPageScroll(e){
        this.setData({
            scrollTop: e.scrollTop
        })
    },

    async getMyInfo(){
        const res = await get(myInfoUrl)
        
        if(res.code === 200) {
            this.setData({
                myInfo: res.data,
            })
        }
    },

    async getUserInfo(){
        this.setData({
            loading: true
        })
        let res = await get(getUserInfo())
        
        if(res.code == 200){
            this.setData({
                userInfo: res.data,
                loading: false,
            })
            wx.setStorageSync('user', res.data)
        } else {
            app.globalData.isLogin = false
            this.setData({
                loading: false,
            })

        }
    },

    goRouter(e) {
        const {path} = e.currentTarget.dataset
        wx.navigateTo({
          url: path,
        })
    },

})