const { get, post, pat, put, baseUrl } = require("../../api/http");
const { scoreUrl, getScoreByUserUrl } = require("../../api/score");
const { formatTime } = require("../../util/formatTime");

// pages/score/score.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: baseUrl,
        score: 0,
        allScore: [],
        scoreDetail: {
            score: 0,
            content: ''
        },
        avgScore: 0,
        isScore: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
          title: '软件评分',
        })
        wx.showLoading({
          title: '加载中',
        })
        this.getUserScore()
        this.getAllScore()
    },

    async getAllScore(){
        
        let res = await get(scoreUrl())
        if(res.code == 200){
            let total = 0;
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].created_time = formatTime(res.data[i].created_time, 'YYYY-MM-dd HH:mm:ss')
                total += res.data[i].score
            }
            this.setData({
                allScore: res.data || [],
                avgScore: parseFloat(total/(res.data.length || 1)).toFixed(1)
            })
        }
        wx.hideLoading()
    },

    async getUserScore(){
        let res = await get(getScoreByUserUrl)
        if(res.code === 200){
            this.setData({
                scoreDetail: res.data,
                isScore: !!res.data
            })
        }
    },

    changeScore(e){
        this.setData({
            "scoreDetail.score": e.currentTarget.dataset.item + 1
        })
        this.modifyScore()
    },

    confirmContent(e){
        this.setData({
            "scoreDetail.content": e.detail.value
        })
        this.modifyScore()
    },

    async modifyScore(){
        let obj = {}
        if(this.data.scoreDetail.content) obj.content = this.data.scoreDetail.content;
        if(this.data.scoreDetail.score) obj.score = this.data.scoreDetail.score;
        if(obj == {}) return;
        let res = {}
        if(!this.data.isScore){
            res = await post(scoreUrl(), obj)
        }else{
            res = await put(scoreUrl(this.data.scoreDetail._id), obj)
        }
        if(res.code == 200){
            wx.showToast({
              title: !this.data.isScore?'添加成功': '修改成功',
              icon: 'success'
            })
            this.getUserScore()
            this.getAllScore()
        }else{
            wx.showToast({
                title: !this.data.isScore?'添加失败': '修改失败',
                icon: 'error'
            })
        }
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