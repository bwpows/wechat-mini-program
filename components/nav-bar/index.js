// components/nav-bar/index.js

//获取应用实例
const app = getApp()

Component({
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {

        title: {
            type: String
        },

        isBack: {
            type: Boolean,
            value: true
        },

        isFillView: {
            type: Boolean,
            value: true
        },

        opacity: {
            type: Number,
            value: 1
        },

        zIndex: {
            type: Number,
            value: 0
        },

        bgColor: {
            type: String,
            value: "white"
        },

        color: {
            type: String,
            value: "black"
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        safeArea: app.globalData.safeArea,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        back(){
            wx.navigateBack()
        }

    }
})
