import { get } from "../../api/http"
import { getLikeByUser } from "../../api/work"

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
    onLoad(options) {
        this.getWork()
        wx.setNavigationBarTitle({
          title: '我的点赞',
        })
    },

    async getWork(){
        let res = await get(getLikeByUser(this.data.user._id))
        if(res.code == 200){
            for (let i = 0; i < res.data.length; i++) {
                res.data[i] = {
                    ...res.data[i].works[0],
                    likes: res.data[i].likes,
                    views: res.data[i].views
                }
            }
            this.setData({
                workList: res.data || []
            })
        }
    }

})