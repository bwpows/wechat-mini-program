import { uploadHeaderImg } from "../../api/file"
import { baseUrl, get } from "../../api/http"
import { getUserInfo } from "../../api/user"

// pages/myProfile/myProfile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: wx.getStorageSync('user'),
        baseUrl: baseUrl,
        userId: wx.getStorageSync('userId')
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
        await this.getUserInfo()
        this.setData({
            user: wx.getStorageSync('user')
        })
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
              console.log(res)
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
        let res = await get(getUserInfo(this.data.userId))
        if(res.code == 200){
            this.setData({
                userInfo: res.data,
                loading: false
            })
            await wx.setStorageSync('user', res.data)
            this.setData({
                user: res.data
            })
        }
    },

    editUserName(){
        wx.navigateTo({
          url: '/pages/editUsername/editUsername',
        })
    },
    
})