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
        translateY: '',
        url: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 预览图片
        previewImage(e){
            this.triggerEvent('previewing')
            let imgUrls = e.currentTarget.dataset.url
            for (let i = 0; i < imgUrls.length; i++) {
                imgUrls[i] = this.formatImageUrl(imgUrls[i])
            }
            wx.previewImage({
                current: imgUrls[0],
                urls: imgUrls,
            })
            this.viewWorkApi(e.currentTarget.dataset.id)
        },

        // 删除作品弹窗
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

        // 删除作品API
        async deleteWorkApi(id){
            let res = await del(delWorkById(id))
            if(res.code == 200){
                this.triggerEvent('refresh')
                wx.hideLoading()
            }
        },

        // 浏览作品
        async viewWorkApi(id){
            if(this.data.userId){
                return await post(getViewWork, {user_id: this.data.userId, work_id: id})
            }else{
                if(wx.getStorageSync('userId')){
                    this.setData({
                        userId: wx.getStorageSync('userId')
                    })
                }
            }
        },

        async onClickCard(e){
            // 让整个card处于全屏，设置偏移量
            this.setData({
                selected: e.currentTarget.dataset.index == this.data.selected?0:e.currentTarget.dataset.index,
                translateY:  -(e.currentTarget.offsetTop - this.data.scrollHeight)
            })

            // 获取是不是tabbar页面，是否的话隐藏tabbar
            let pages = getCurrentPages()
            let currentPage = pages[pages.length - 1].route
            if(currentPage == 'pages/work/index/index'){
                this.getTabBar().setData({
                    isShow: e.currentTarget.dataset.index !== this.data.selected
                })
            }
            this.triggerEvent("selected", e.currentTarget.dataset.index == this.data.selected)

            // 点击设置浏览器加1
            if(e.currentTarget.dataset.index !== this.data.selected){
                await this.viewWorkApi(e.currentTarget.dataset.index)
            }
        },

        // 格式化图片 Url
        formatImageUrl(url) {
            if(url.indexOf('http') !== -1) {
                return url;
            } else {
                return baseUrl + '/' + url;
            }
        },

        // 计算高度

    }
})
