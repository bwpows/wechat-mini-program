import { cardListUrl } from "../../api/card"
import { get } from "../../api/http"

// pages/cardManage/cardManage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        cardList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
    },


    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        wx.setNavigationBarTitle({
            title: '收支明细'
        })
        this.setData({
            userId: await wx.getStorageSync('userId')
        })
        this.getCardList()
    },

    async getCardList(){
        let res = await get(cardListUrl(this.data.userId))
        if(res.code == 200){
            this.setData({
                cardList: res.data
            })
        }else{
            wx.showToast({
              title: '获取银行卡异常',
              icon: 'error'
            })
        }
    },

    goAddCard(){
        wx.navigateTo({
          url: '/pages/addCard/addCard',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
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