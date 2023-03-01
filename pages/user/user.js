// pages/user/user.js

const { baseUrl, get } = require("../../api/http")
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
                    title: 'ChatGPT',
                    icon: '../../images/icon/chat.svg',
                    path: '/pages/chatgpt/chatgpt'
                }
            ],
            [
                {
                    title: '我的作品',
                    icon: '../../images/icon/works.svg',
                    path: '/pages/work/my/my'
                },
                {
                    title: '我的点赞',
                    icon: '../../images/icon/like.svg',
                    path: '/pages/work/like/like'
                },
                {
                    title: '隐私作品',
                    icon: '../../images/icon/privacy.svg',
                    path: '/pages/work/hide/hide',
                    isShow: false
                }
            ],
            [
                {
                    title: '我的待办',
                    icon: '../../images/icon/task_todo.svg',
                    path: '/pages/task/todo/todo',
                },
                {
                    title: '已完成任务',
                    icon: '../../images/icon/task_complete.svg',
                    path: '/pages/task/completed/completed',
                },
                {
                    title: '已取消任务',
                    icon: '../../images/icon/task_cancel.svg',
                    path: '/pages/task/cancel/cancel',
                },
            ],
            [
                {
                    title: '关于我们',
                    icon: '../../images/icon/about.svg',
                    path: '/pages/about/about'
                }
            ]
        ],
        isLogin: null,
        safeArea: {},
        scrollTop: 0,
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
    },

    onPageScroll(e){
        this.setData({
            scrollTop: e.scrollTop
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
            listData[2][2]['isShow'] = await wx.getStorageSync('isShow')  || false,
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