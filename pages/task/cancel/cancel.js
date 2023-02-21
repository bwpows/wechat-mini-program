const { cancelTaskUrl } = require("../../../api/task")
import { get } from "../../../api/http"

// pages/task/cancel/cancel.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        taskList: []
    },

    onLoad(){
        wx.setNavigationBarTitle({
          title: '已取消任务',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTask()
    },

   async getTask(){
       let res = await get(cancelTaskUrl)
       if(res.code == 200){
            this.setData({
                taskList: res.data
            })
        }
   },

})