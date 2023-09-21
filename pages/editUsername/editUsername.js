import { get, put } from "../../api/http"
import { editNameUrl, getUserInfo } from "../../api/user"

// pages/editUsername/editUsername.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: wx.getStorageSync('user'),
        username: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '修改昵称',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            userInfo: wx.getStorageSync('user')
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    async onUnload() {
        await this.editUsername()
    },
    
    changeUsername(e){
        this.setData({
            username: e.detail.value
        })
    },

    async editUsername(){
        if(this.data.username.length < 1) return;
        let res = await put(editNameUrl(this.data.userInfo._id), {username: this.data.username})
        if(res.code == 200){
            await this.getUserInfo()
        }
    },

    async getUserInfo(){
        let res = await get(getUserInfo())
        if(res.code == 200){
            await wx.setStorageSync('user', res.data)
        }
    },

})