// pages/task/todo/todo.js

import { get } from '../../../api/http'
import { todoTaskUrl } from '../../../api/task'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        taskListL: []
    },
    onLoad(){
        wx.setNavigationBarTitle({
          title: '待办任务',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTask()
    },

   async getTask(){
       let res = await get(todoTaskUrl)
       if(res.code == 200){
        this.setData({
            taskList: res.data
        })
    }
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