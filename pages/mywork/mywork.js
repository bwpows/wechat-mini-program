import { get } from "../../api/http"
import { getWorkByUser } from "../../api/work"

// pages/mywork/mywork.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: wx.getStorageSync('user'),
        workList: [],
        loading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getWork()
        wx.setNavigationBarTitle({
          title: '我的作品',
        })
    },

    async getWork(){
        wx.showLoading({
          title: '数据加载中',
        })
        let res = await get(getWorkByUser(this.data.user._id))
        wx.hideLoading()
        if(res.code == 200){
            this.setData({
                workList: res.data || [],
                loading: false
            })
        }
    },

    async onPullDownRefresh(){
        await this.getWork()
        wx.stopPullDownRefresh()
    }

})