const { get, baseUrl } = require("../../../api/http")
const { orderByUserUrl } = require("../../../api/workOrder")

const statusType = {
    10: {
        text: '待处理',
        class: 'grey--text'
    },
    20: {
        text: '处理中',
        class: 'primary--text'
    },
    30: {
        text: '已完成',
        class: 'success--text'
    }
}

// pages/workOrder/myOrder/myOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        workOrder: [],
        statusType,
        baseUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '我的工单',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getMyWorkOrder()
    },

    async getMyWorkOrder(){
        wx.showLoading({
          title: '加载中',
        })
        let res = await get(orderByUserUrl)
        wx.hideLoading()
        if(res.code == 200){
            this.setData({
                workOrder: res.data
            })
        }
    },

    goAddWorkOrder(){
        wx.navigateTo({
          url: '/pages/workOrder/addOrder/addOrder',
        })
    },

    
    previewImage(e){
        let imgUrls = e.currentTarget.dataset.urls
        let imgUrl = e.currentTarget.dataset.url
        for (let i = 0; i < imgUrls.length; i++) {
            imgUrls[i] = baseUrl + "/" + imgUrls[i]
        }
        wx.previewImage({
            current: this.data.baseUrl + "/" + imgUrl,
            urls: imgUrls,
        })
    },

})