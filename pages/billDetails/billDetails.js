const { consumptionByCardUrl } = require("../../api/consumption")
const { post, get } = require("../../api/http")

// pages/billDetails/billDetails.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardId: '',
        userId: '',
        detailList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '收支明细',
        })
        if(options.card_id){
            this.setData({
                cardId: options.card_id
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        this.setData({
            userId: await wx.getStorageSync('userId')
        })
        this.getCardDetails()
    },

    async getCardDetails(){
        let res = await get(consumptionByCardUrl(this.data.cardId))
        console.log(res);
        if(res.code == 200){
            this.setData({
                detailList: res.data
            })
        }
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