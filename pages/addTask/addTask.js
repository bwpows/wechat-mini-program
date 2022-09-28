const { formatTime } = require("../../util/formatTime")
import { post } from '../../api/http'
import { postTaskUrl } from '../../api/task'
// pages/addTask/addTask.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        endTimeList: [
            { text: '今日完成', value: 1 },
            { text: '明日完成', value: 2 },
            { text: '本周完成', value: 3 },
            { text: '下周完成', value: 4 },
            { text: '本月完成', value: 5 },
            { text: '今年完成', value: 6 }
        ],
        selectDate: 0,
        taskName: ''
    },

    selectDateFun(event){
        this.setData({
            selectDate: event.currentTarget.dataset.value
        })
    },

    taskNameFun(options){
        this.setData({
            taskName: options.detail.value
        })
    }, 

    async submit(){
        if(!this.data.taskName){
            return wx.showToast({
              title: '任务名称不能为空',
              icon: 'error'
            })
        }else if(!this.data.selectDate){
            return wx.showToast({
              title: '请选择截止时间',
            })
        }

        let obj = {
            content: this.data.taskName,
            end_date: this.dealWithDate(this.data.selectDate),
            user_id: wx.getStorageSync('userId')
        }

        let res = await post(postTaskUrl, obj)
        if(res.code == 200){
            wx.showToast({
                title: '添加成功',
                icon: 'success'
            })
            wx.navigateBack({
              delta: 1,
            })
        }else{
            wx.showToast({
              title: '添加失败',
              icon: 'error'
            })
        }
    },

    dealWithDate(param){
        let week = new Date().getDay()
        let thisSunday = new Date().setDate(new Date().getDate() + 7 - week)
        let nextSunday = new Date().setDate(new Date(thisSunday).getDate() + 7)
        if(param == 1){
            return formatTime(new Date(), 'YYYY-MM-dd')
        }else if(param === 2){
            let tomorrow = new Date().setDate(new Date().getDate() + 1)
            return formatTime(tomorrow, 'YYYY-MM-dd')
        }else if(param === 3){
            return formatTime(thisSunday, 'YYYY-MM-dd')
        }else if(param === 4){
            return formatTime(nextSunday, 'YYYY-MM-dd')
        }else if(param === 5){
            let thisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
            return formatTime(thisMonth, 'YYYY-MM-dd')
        }else if(param === 6){
            let thisYear = new Date(new Date().getFullYear(), 11, 31);
            return formatTime(thisYear, 'YYYY-MM-dd')
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '添加任务'
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