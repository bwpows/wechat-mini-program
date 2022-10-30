import { baseUrl } from "../../api/http";
import { delWorkById } from "../../api/work";
import { del } from "../../api/http"

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
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        baseUrl: baseUrl,
        userId: wx.getStorageSync('userId')
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
            console.log(item)
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
                wx.hideLoading()
            }
        }
    }
})
