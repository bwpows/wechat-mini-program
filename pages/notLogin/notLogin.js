// pages/notLogin/notLogin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '服务',
        })
    },

    goBack(){
        wx.navigateBack({
          delta: 1,
        })
    }

})