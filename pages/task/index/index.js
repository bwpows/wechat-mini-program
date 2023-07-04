//index.js
import { get } from '../../../api/http'
import { todoTaskUrl, completedTaskUrl, cancelTaskUrl } from '../../../api/task'
const app = getApp()

let dealTaskList = []
Page({
    data: {
        taskList:[],
        taskTimeType: ['今日任务', '明日任务', '本周任务', '本月任务', '今年任务'],
        initLoading: true,
        isLogin: null,
        loading: true,
        selectTab: 1,
        isOnShow: true
    },

    async onShow(){
        this.setData({
            isLogin: app.globalData.isLogin,
            isOnShow: true,
            safeArea: app.globalData.safeArea
        })
        this.getTabBar().setData({
            selected: 0
        })
        await this.getTask()
        this.setData({
            initLoading: false,
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
        wx.vibrateShort();
        this.goAddTask()
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
    },


    async changeTab(e) {
        const {index} = e.currentTarget.dataset
        this.setData({
            selectTab: index
        })
        this.getTask()
    },

    async getTask(){
        if(!this.data.isLogin) return;
        if(!this.data.isOnShow) {
            wx.showLoading({
                title: '加载中',
            })
        }
        let res;
        if(this.data.selectTab == 1){
            res = await get(todoTaskUrl)
        } else if(this.data.selectTab == 2) {
            res = await get(completedTaskUrl)
        } else if(this.data.selectTab == 3) {
            res = await get(cancelTaskUrl)
        }
        wx.hideLoading()
        if(res.code == 200){
            this.setData({
                taskList: res.data,
                loading: false,
                isOnShow: false
            })
        }
    }

})
