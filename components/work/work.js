import { baseUrl, post } from "../../api/http";
import { delWorkById, getViewWork } from "../../api/work";
import { del } from "../../api/http"

//获取应用实例
const app = getApp()

// components/work/work.js
Component({
    options: {
        addGlobalClass: true
    },

    /**
     * 组件的属性列表
     */
    properties: {
        work: {
            type: Object
        },
        isEdit: {
            type: Boolean,
            value: false
        },
        scrollHeight: {
            type: Number,
            value: 22
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        baseUrl: baseUrl,
        userId: wx.getStorageSync('userId'),
        safeArea: app.globalData.safeArea,
        selected: 0,
        translateY: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        previewImage(e){
            let imgUrls = e.currentTarget.dataset.url
            for (let i = 0; i < imgUrls.length; i++) {
                imgUrls[i] = baseUrl + "/" + imgUrls[i]
            }
            wx.previewImage({
                current: imgUrls[0],
                urls: imgUrls,
            })
        },

        async deleteWork(e){
            let item = e.currentTarget.dataset.item
            let that = this
            wx.showModal({
                title: `确定要删除 (${item.title})?`,
                confirmColor: "red",
                confirmText: "删除",
                success: async function(res){
                    if(res.cancel){}else{
                        wx.showLoading({
                          title: `正在删除......`,
                        })
                        that.deleteWorkApi(item._id)
                    }
                },
            })
        },

        async deleteWorkApi(id){
            let res = await del(delWorkById(id))
            if(res.code == 200){
                this.triggerEvent('refresh')
                wx.hideLoading()
            }
        },

        onClickCard(e){
            this.setData({
                selected: e.currentTarget.dataset.index == this.data.selected?0:e.currentTarget.dataset.index,
                translateY:  -(e.currentTarget.offsetTop - this.data.scrollHeight)
            })

            this.getTabBar().setData({
                isShow: e.currentTarget.dataset.index !== this.data.selected
            })
            this.triggerEvent("selected", e.currentTarget.dataset.index == this.data.selected)

            if(e.currentTarget.dataset.index !== this.data.selected){
                post(getViewWork, {user_id: this.data.userId, work_id: e.currentTarget.dataset.index})
            }


        },



    }
})
