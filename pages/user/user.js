// pages/user/user.js

const { baseUrl, get } = require("../../api/http")
const { getUserInfo } = require("../../api/user")

// import { baseUrl } from

// import http from '../../util/http'
// import { formatPhoneNumber } from '../../util/phone.wxs'



Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: wx.getStorageSync('userId'),
        isShow: false,
        baseUrl: baseUrl,
        userInfo: {},
        loading: true,

        listData: [
            [
                {
                    title: '手机号',
                    desc: 'xxx',
                    icon: '../../images/icon/phone.svg',
                    path: '/pages/phone/phone'
                },
                {
                    title: '通用设置',
                    icon: '../../images/icon/setting.svg',
                    path: '/pages/setting/setting'
                }
            ],
            [
                {
                    title: '我的作品',
                    icon: '../../images/icon/works.svg',
                    path: '/pages/mywork/mywork'
                },
                {
                    title: '我的点赞',
                    icon: '../../images/icon/like.svg',
                    path: '/pages/like/like'
                },
                {
                    title: '隐私作品',
                    icon: '../../images/icon/privacy.svg',
                    path: '/pages/hideWork/hideWork',
                    isShow: false
                },
                {
                    title: '卡片管理',
                    icon: '../../images/icon/card.svg',
                    path: '/pages/cardManage/cardManage'
                }
            ],
            [
                {
                    title: '关于我们',
                    icon: '../../images/icon/about.svg',
                    path: '/pages/about/about'
                }
            ]
        ]


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
          title: '个人中心',
        })
        this.getUserInfo()
    },

    async onShow(){
        await this.getUserInfo()
        this.setData({
            userInfo: await wx.getStorageSync('user'),
            isShow: await wx.getStorageSync('isShow')  || false,
        })
    },

    async getUserInfo(){
        this.setData({
            loading: true
        })
        let res = await get(getUserInfo(this.data.userId))
        let listData = this.data.listData
        
        if(res.code == 200){
            listData[0][0]['desc'] = res.data.phone;
            listData[1][2]['isShow'] = await wx.getStorageSync('isShow')  || false,
            this.setData({
                userInfo: res.data,
                loading: false,
                listData,
            })
            wx.setStorageSync('user', res.data)
        }
    },

    async exit(){
        wx.showModal({
            title: "确定要退出登录？",
            confirmColor: "red",
            confirmText: "退出",
            success: async function(res){
                if(res.cancel){}else{
                    await wx.clearStorage()
                    wx.reLaunch({
                        url: '/pages/login/login',
                    })
                }
            },
        })
    },

    goRouter(e) {
        const {path} = e.currentTarget.dataset
        wx.navigateTo({
          url: path,
        })
    },

})