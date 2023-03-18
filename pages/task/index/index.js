//index.js
import { get } from '../../../api/http'
import { getTaskListUrl } from '../../../api/task'
const app = getApp()

let dealTaskList = []
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
            /*
            * test arrary
            */
           this.dealArr(res.data)
            for (let i = 0; i < dealTaskList.length; i++) {
                if(!arr[dealTaskList[i].taskDateType - 1]) arr[dealTaskList[i].taskDateType - 1] = []
                arr[dealTaskList[i].taskDateType - 1].push(dealTaskList[i])
            }

            this.setData({
                taskList: arr
            })
        }
    },

    dealArr(arr) {
        dealTaskList = []
        let testArrOne = JSON.parse(JSON.stringify(arr))
        for (let i = 0; i < testArrOne.length; i++) {
            if(!testArrOne[i].is_completed && !testArrOne[i].is_cancel){
                dealTaskList.push(testArrOne[i])
            }
        }
        dealTaskList.push(...testArrOne)
        dealTaskList = Array.from(new Set(dealTaskList))
    },

    goAddTask(){
        wx.navigateTo({
          url: '/pages/task/add/add',
        })
    }

})
