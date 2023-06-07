// pages/user/user.js
const { baseUrl, get } = require("../../api/http")
const { myInfoUrl } = require("../../api/my")
const { getUserInfo } = require("../../api/user")

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        isShow: false,
        baseUrl: baseUrl,
        userInfo: {},
        loading: true,
        isLogin: null,
        safeArea: {},
        scrollTop: 0,
        lineData: [],
        myInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
          title: '个人中心',
        })
    },

    async onShow(){
        this.getTabBar().setData({
            selected: 2,
        })
        this.setData({
            isShow: await wx.getStorageSync('isShow')  || false,
            userId: await wx.getStorageSync('userId'),
            isLogin: app.globalData.isLogin,
            safeArea: app.globalData.safeArea
        })
        if(app.globalData.isLogin) await this.getUserInfo()
        if(app.globalData.isLogin) await this.getMyInfo()
    },

    onPageScroll(e){
        this.setData({
            scrollTop: e.scrollTop
        })
    },

    async getMyInfo(){
        const res = await get(myInfoUrl)
        console.log(res);
        
        if(res.code === 200) {
            const { yearViewList } = res.data;
            // const lineData = yearViewList.map(item => {
            //     return {value: item.count, title: item._id.month > 10? item._id.month: '0' + item._id.month, year: item._id.year}
            // })
            // lineData.sort((a, b) => {
            //     if (a.year !== b.year) {
            //       return a.year - b.year;
            //     } else {
            //       // 如果年份相同，则比较月份
            //       return a.title - b.title;
            //     }
            //   });
            // console.log(lineData);
            this.setData({
                myInfo: res.data,
                // lineData: lineData
            })
        }
    },

    async getUserInfo(){
        this.setData({
            loading: true
        })
        let res = await get(getUserInfo(this.data.userId))
        // let listData = this.data.listData
        
        if(res.code == 200){
            // listData[0][0]['desc'] = res.data.phone;
            // listData[1][2]['isShow'] = await wx.getStorageSync('isShow')  || false,
            this.setData({
                userInfo: res.data,
                loading: false,
                // listData,
            })
            wx.setStorageSync('user', res.data)
        }
    },

    goRouter(e) {
        const {path} = e.currentTarget.dataset
        wx.navigateTo({
          url: path,
        })
    },

})