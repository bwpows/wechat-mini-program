// pages/about/about.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            {
                title: '去评价',
                path: '/pages/score/score'
            },
            {
                title: '我的工单',
                path: '/pages/workOrder/myOrder/myOrder'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '关于我们',
        })
    },

    goRouter(e){
        const {path} = e.currentTarget.dataset
        if(!path) return;
        wx.navigateTo({
          url: path,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})