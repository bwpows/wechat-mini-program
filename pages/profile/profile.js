import { uploadHeaderImg } from "../../api/file"
import { baseUrl, get } from "../../api/http"
import { getUserInfo } from "../../api/user"

const app = getApp()

// pages/myProfile/myProfile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {},
        baseUrl: baseUrl,
        userId: null,
        listData: [
            [
                {
                    title: '昵称',
                    value: 'nickname',
                    desc: 'xxx',
                    icon: '../../images/icon/nickname.svg',
                    path: '/pages/editUsername/editUsername'
                },
                {
                    title: '手机号',
                    value: 'phone',
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '我的资料',
        })
    },

    async onShow(){
        this.setData({
            user: await wx.getStorageSync('user'),
            userId: await wx.getStorageSync('userId')
        })
        await this.getUserInfo()
    },

    openImageDialog(){
        let that = this
        wx.chooseMedia({
            mediaType: ['image'],
            sourceType: ['album'],
            count: 1,
            success(res){
                that.uploadImg(res.tempFiles[0].tempFilePath)
            }
        })
    },

    uploadImg(url){
        let that = this
        wx.showLoading({
            title: '上传头像中',
        })
        wx.uploadFile({
          filePath: url,
          name: 'headImg',
          url: baseUrl + uploadHeaderImg,
          formData: {
              _id: wx.getStorageSync('userId')
          },
          header: {
            'Authorization': 'Bearer ' + wx.getStorageSync('token')
          },
          success: res => {
              that.getUserInfo()
              wx.showToast({
                title: '更换成功',
                icon: 'success'
              })
          },
          fail: err => {
              wx.showToast({
                title: '修改失败',
                icon: 'error'
              })
          },
          complete: () => {
              wx.hideLoading()
          }
        })
    },

    async getUserInfo(){
        let res = await get(getUserInfo())
        if(res.code == 200){
            this.setData({
                userInfo: res.data,
                loading: false
            })
            await wx.setStorageSync('user', res.data)
            let listDataOne = this.data.listData;
            const index = listDataOne[0].findIndex(obj => obj.value === 'nickname');
            if(index !== -1) listDataOne[0][index].desc = res.data.username
            const index2 = listDataOne[0].findIndex(obj => obj.value === 'phone');
            if(index2 !== -1) listDataOne[0][index2].desc = res.data.phone
            this.setData({
                user: res.data,
                listData: listDataOne
            })
        }
    },

    editUserName(){
        wx.navigateTo({
          url: '/pages/editUsername/editUsername',
        })
    },

    goRouter(e) {
        const {path} = e.currentTarget.dataset
        wx.navigateTo({
          url: path,
        })
    },


    async exit(){
        wx.showModal({
            title: "确定要退出登录？",
            confirmColor: "red",
            confirmText: "退出",
            success: async function(res){
                if(res.cancel){}else{
                    await wx.clearStorage()
                    app.globalData.isLogin = false
                    wx.reLaunch({
                        url: '/pages/work/index/index',
                    })
                }
            },
        })
    },
    
})