const { put, del } = require("../../api/http")
const { completeTaskUrl, recoveryTaskUrl, deleteTaskUrl, cancelTaskUrl } = require("../../api/task")

// components/index/card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        taskList: {
            type: Array,
            value: []
        },
        
        title: {
            type: String,
            value: '任务列表'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        startPositionX: 0,
        startPositionY: 0,
        showBtnId: "",
        userId: wx.getStorageSync('userId')
    },

    /**
     * 组件的方法列表
     */
    methods: {
        touchMove(e){
            if(
                (this.data.startPositionX - e.changedTouches[0].clientX > 50) &&
                (this.data.startPositionY - e.changedTouches[0].clientY < 50)
            ){
                this.setData({
                    showBtnId: e.currentTarget.dataset.taskid
                })
            }
        },

        touchStart(e){
            this.setData({
                startPositionX: e.changedTouches[0].clientX,
                startPositionY: e.changedTouches[0].clientY,
                showBtnId: ''
            })
        },

        async completeTask(e){
            wx.showLoading({
              title: '正在处理',
            })
            await put(completeTaskUrl, { user_id: this.data.userId, _id: e.currentTarget.dataset.taskid })
            wx.hideLoading()
            this.triggerEvent('refresh')
        },

        async recoveryTask(e){
            wx.showLoading({
                title: '正在处理',
              })
              await put(recoveryTaskUrl, { user_id: this.data.userId, _id: e.currentTarget.dataset.taskid })
              wx.hideLoading()
              this.triggerEvent('refresh')
        },

        async deleteTask(e){
            wx.showLoading({
                title: '正在处理',
              })
              await del(deleteTaskUrl, { user_id: this.data.userId, _id: e.currentTarget.dataset.taskid })
              wx.hideLoading()
              this.triggerEvent('refresh')
        },

        async cancelTask(e){
            wx.showLoading({
                title: '正在处理',
            })
            await put(cancelTaskUrl, { user_id: this.data.userId, _id: e.currentTarget.dataset.taskid })
            wx.hideLoading()
            this.triggerEvent('refresh')
        },

        openDeleteTaskDialog(e){
            wx.showModal({
                title: "确定删除任务？",
                confirmText: "删除",
                confirmColor: "error"
            })
        }
    },

    options: {
        addGlobalClass: true
    }

})
