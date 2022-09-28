import { baseUrl } from "../../api/http";

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
        baseUrl: baseUrl
    },

    /**
     * 组件的方法列表
     */
    methods: {
        previewImage(e){
            console.log(e.currentTarget.dataset)
            let imgUrls = e.currentTarget.dataset.url
            for (let i = 0; i < imgUrls.length; i++) {
                imgUrls[i] = baseUrl + "/" + imgUrls[i]
            }
            wx.previewImage({
                current: imgUrls[0],
                urls: imgUrls,
            })
        }
    }
})
