import { get } from "../../api/http"
import { getPrivacyWorkByUserId } from "../../api/work"

// pages/like/like.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: wx.getStorageSync('user'),
        workList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
          title: '私密作品'
        })
        this.setData({
            user: await wx.getStorageSync('user')
        })
        this.getWork()
    },

    async getWork(){
        wx.showLoading({
            title: '数据加载中',
        })
        let res = await get(getPrivacyWorkByUserId(this.data.user._id))
        wx.hideLoading()
        if(res.code == 200){
            this.setData({
                workList: res.data
            })
        }
    }

})