const { addCardUrl } = require("../../api/card");
const { post } = require("../../api/http");
const { formatTime } = require("../../util/formatTime");

// pages/addCard/addCard.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bankCardNum: [],
        step: 0,
        userId: wx.getStorageSync('userId'),
        cardName: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
            title: '添加银行卡'
        })
    },

    inputChangeCardName(e){
        this.setData({
            cardName: e.detail.value
        })
    },

    inputChangeCardNum(e){
        if(e.detail.value.length > 0){
            if(this.data.step > 3){
                return this.setData({
                    step: null
                })
            }
            setTimeout(() => {     
                this.setData({
                    step: parseInt(e.currentTarget.dataset.index) + 1
                })
            }, 100);
        }
        let aaa = 'bankCardNum['+e.currentTarget.dataset.index+']'
        this.setData({
            [aaa]: e.detail.value
        })
    },

    async submit(){
        let number_prefix = formatTime(new Date(), 'YYYYMMdd')
        let cardNum = this.data.bankCardNum.join('')
        let obj = {
            user_id: this.data.userId,
            name: this.data.cardName,
            number: number_prefix + this.randomNumber(4) + cardNum
        }
        if(obj.number.length !== 16){
            return wx.showToast({
              title: '银行卡号异常',
              icon: 'error'
            })
        }
        if(obj.name.length === 0){
            return wx.showToast({
              title: '名称不能为空',
              icon: 'error'
            })
        }
        if(obj.name.length > 8){
            return wx.showToast({
              title: '名称过长',
              icon: 'error'
            })
        }
        wx.showLoading()
        let res = await post(addCardUrl, obj)
        wx.hideLoading()
        if(res.code == 200){
            wx.showToast({
              title: '添加成功',
              icon: 'success'
            })
            setTimeout(() => {
                wx.navigateBack()
            }, 1000);
        }
        console.log(res);
    },

    randomNumber(len) {
        let chars = '0123456789';
        let maxPos = chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})