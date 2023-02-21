import { get } from "../../../api/http"
import { completedTaskUrl } from "../../../api/task"

// pages/task/completed/completed.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        taskList: []
    },

    onLoad(){
        wx.setNavigationBarTitle({
          title: '已完成任务',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTask()
    },

   async getTask(){
       let res = await get(completedTaskUrl)
       if(res.code == 200){
        this.setData({
            taskList: res.data
        })
    }
   },

})