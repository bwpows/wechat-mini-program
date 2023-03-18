import { get } from "../../../api/http"
import { getWorkByUser } from "../../../api/work"

// pages/mywork/mywork.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: null,
        workList: [],
        loading: true,
        selectedWork: '',
        scrollHeight: 22,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        this.setData({
            userId: await wx.getStorageSync('userId'),
        })
        this.getWork()
        wx.setNavigationBarTitle({
          title: '我的作品',
        })
    },

    async getWork(){
        wx.showLoading({
          title: '数据加载中',
        })
        let res = await get(getWorkByUser(this.data.userId))
        wx.hideLoading()
        if(res.code == 200){
            this.setData({
                workList: res.data || [],
                loading: false
            })
        }
    },

    async onPullDownRefresh(){
        if(this.data.selectedWork){
            wx.stopPullDownRefresh()
            return;
        };
        await this.getWork()
        wx.stopPullDownRefresh()
    },

    async isSelectedWork(e){
        this.setData({
          selectedWork: e.detail
        })
    },

    onPageScroll(e){
        this.setData({
            scrollHeight: e.scrollTop + 22
        })
    },

})