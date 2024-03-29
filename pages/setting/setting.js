// pages/setting/setting.js

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
          title: '通用设置',
        })
        this.setData({
            isShow: await wx.getStorageSync('isShow')
        })
    },

    async switch1Change(){
        this.setData({
            isShow: !this.data.isShow
        })
        await wx.setStorageSync('isShow', this.data.isShow)
    },

})