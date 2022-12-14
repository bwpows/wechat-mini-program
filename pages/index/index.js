//index.js
import { get } from '../../api/http'
import { getTaskListUrl } from '../../api/task'

//获取应用实例
// const app = getApp()

Page({
    data: {
        taskList:[],
        taskTimeType: ['今日任务', '明日任务', '本周任务', '本月任务', '今年任务']
    },

    onShareAppMessage() {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    title: '精致的TODO LIST'
                })
            }, 2000)
        })
        return {
            title: '精致的TODO LIST',
            path: '/pages/index/index',
            promise
        }
    },

    onShow(){
        this.getTask()
    },

    onLoad(){
        wx.setNavigationBarTitle({
          title: '首页',
        })
    },

    async onPullDownRefresh(){
        wx.stopPullDownRefresh()
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
          url: '/pages/addTask/addTask',
        })
    }

})
