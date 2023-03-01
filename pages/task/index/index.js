//index.js
import { get } from '../../../api/http'
import { getTaskListUrl } from '../../../api/task'
const app = getApp()
Page({
    data: {
        taskList:[],
        taskTimeType: ['今日任务', '明日任务', '本周任务', '本月任务', '今年任务'],
        loading: true,
        isLogin: null
    },

    async onShow(){
        
        this.getTabBar().setData({
            selected: 0
        })
        this.setData({
            loading: true,
            isLogin: app.globalData.isLogin
        })
        if(this.data.isLogin) await this.getTask()
        this.setData({
            loading: false
        })
    },

    async onLoad(){
        wx.setNavigationBarTitle({
          title: '首页',
        })
    },

    async onPullDownRefresh(){
        wx.stopPullDownRefresh()
        if(!this.data.isLogin) return;
        this.goAddTask()
    },

    async getTask(){
        let userId = await wx.getStorageSync('userId')
        if(!userId) { return };
        let res = await get(getTaskListUrl(userId))
        if(res.code == 200){
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
                if(!arr[res.data[i].taskDateType - 1]) arr[res.data[i].taskDateType - 1] = []
                arr[res.data[i].taskDateType - 1].push(res.data[i])
            }
            this.setData({
                taskList: arr
            })
        }
    },

    goAddTask(){
        wx.navigateTo({
          url: '/pages/task/add/add',
        })
    }

})
