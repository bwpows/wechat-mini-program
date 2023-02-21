import { get } from "../../../api/http"
import { getLikeByUser } from "../../../api/work"

// pages/like/like.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: null,
        workList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        wx.setNavigationBarTitle({
          title: '我的点赞',
        })
        this.setData({
            userId: await wx.getStorageSync('userId'),
        })
        this.getWork()
    },

    async getWork(){
        
        wx.showLoading({
          title: '数据加载中',
        })
        let res = await get(getLikeByUser(this.data.userId))
        wx.hideLoading()
        if(res.code == 200){
            for (let i = 0; i < res.data.length; i++) {
                res.data[i] = {
                    ...res.data[i].works[0],
                    likes: res.data[i].likes,
                    views: res.data[i].views
                }
            }
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