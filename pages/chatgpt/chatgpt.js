const { sendMessageUrl, getMyMessageUrl } = require("../../api/chatgpt")
const { get, post } = require("../../api/http")

const app = getApp()

// pages/chatgpt/chatgpt.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        messageList: [],
        inputDisabled: false,
        inputText: ''
    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        await this.getMessage()
        this.autoScroll()
    },

    async getMessage(){
        let res = await get(getMyMessageUrl)
        if(res.code === 200) {
            this.setData({
                messageList: res.data
            })
        }
    },

    async sendMessage(e) {
        if(!e.detail.value) return;
        this.setData({
            inputDisabled: true,
            inputText: ''
        })
        try{
            let messageList = this.data.messageList;
            messageList.push({ send_message: e.detail.value, receive_message: ''})
            this.setData({
                messageList,
            })
            this.autoScroll()
            let res = await post(sendMessageUrl, {send_message: e.detail.value})
            if(res.code == 200){
                messageList[messageList.length - 1].receive_message = res.data.text
            }
            this.setData({
                messageList
            })
        }catch(err){

        }finally{
            this.setData({
                inputDisabled: false
            })
        }
        this.autoScroll()

    },

    autoScroll(){
        let that = this;
        wx.createSelectorQuery().select('#communication').boundingClientRect(function (rect) {
          wx.pageScrollTo({
            scrollTop: rect.height,
            duration: 100 // 滑动速度
          })
          that.setData({
            scrollTop: rect.height - that.data.scrollTop
          });
        }).exec();
    }


})