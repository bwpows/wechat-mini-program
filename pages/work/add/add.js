const { uploadSingleFileUrl } = require("../../../api/file")
const { baseUrl, post, get } = require("../../../api/http")
const { reviewUrl } = require("../../../api/review")
const { publishWechatWorkUrl } = require("../../../api/work")

// pages/publish/publish.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedImages: [],
        title: '',
        description: '',
        url: [],
        is_public: true,
        token: wx.getStorageSync('token'),
        uploadProgress: [],
        loading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '加载中',
        })
    },

    async onShow(){
        let res = await this.getReviewStatus()
        if(res) {
            wx.reLaunch({
              url: '/pages/work/index/index',
            })
        }else{
            this.setData({
                loading: false
            })
            wx.setNavigationBarTitle({
              title: '发布作品',
            })
        };
    },

    async getReviewStatus(){
        let res = await get(reviewUrl)
        return res.data
    },

    inputChangeTitle(e){
        let text = e.detail.value.trimStart()
        this.setData({
            title: text
        })
    },

    inputChangeContent(e){
        let text = e.detail.value.trimStart()
        this.setData({
            description: text
        })
    },

    chooseImage(){
        let that = this;
        wx.chooseMedia({
            mediaType: ['image'],
            sourceType: ['album'],
            success: function(res){
                that.setData({
                    selectedImages: res.tempFiles
                })
                that.uploadFile()
            },
            fail: function(err){
            }
        })
    },

    async publish(){
        if(this.data.title.length == 0){
            return wx.showToast({
              title: '请输入标题',
              icon: 'error'
            })
        }else if(this.data.description.length == 0){
            return wx.showToast({
              title: '请输入内容',
              icon: 'error'
            })
        }

        let obj = {
            user_id: wx.getStorageSync('userId'),
            title: this.data.title,
            description: this.data.description,
            url: this.data.url,
            is_public: this.data.is_public
        }
        wx.showLoading({
            title: '正在发表',
            mask: true
        })
        let res = await post(publishWechatWorkUrl, obj)
        wx.hideLoading()
        if(res.code == 200){
            wx.showToast({
              title: '发表成功',
              icon: 'success'
            })
            wx.navigateBack({
              delta: 1,
            })
        }else{
            wx.showToast({
              title: '发表失败',
              icon: 'error'
            })
        }
    },

    async uploadFile(){
        if(this.data.selectedImages.length == 0) return;
        let that = this;
        let url = []

        for (let i = 0; i < that.data.selectedImages.length; i++) {
            const upload_task = wx.uploadFile({
              filePath: that.data.selectedImages[i].tempFilePath,
              name: 'file',
              url: baseUrl + uploadSingleFileUrl,
              header: {
                 Authorization: 'Bearer ' + that.data.token,
                 'Content-Disposition': 'inline'
              },
              success: function(res){
                  res.data = JSON.parse(res.data)
                  url.push(res.data.data.url)
                  that.setData({
                      url: url
                  })
              }
            })
            upload_task.onProgressUpdate((res) => {
                let editData = 'uploadProgress['+ i +']'
                this.setData({
                    [editData]: res.progress
                })
            })
        }
        
        // for (let i = 0; i < that.data.selectedImages.length; i++) {
        //     const upload_task = wx.uploadFile({
        //       filePath: that.data.selectedImages[i].tempFilePath,
        //       name: 'file',
        //       url: baseUrl + uploadSingleFileUrl,
        //       header: {
        //          Authorization: 'Bearer ' + that.data.token
        //       },
        //       success: function(res){
        //           res.data = JSON.parse(res.data)
        //           url.push(res.data.data)
        //           that.setData({
        //               url: url
        //           })
        //       }
        //     })
        //     upload_task.onProgressUpdate((res) => {
        //         let editData = 'uploadProgress['+ i +']'
        //         this.setData({
        //             [editData]: res.progress
        //         })
        //     })
        // }
    },

    switchChange(e) {
        this.setData({
            is_public: !e.detail.value
        })
    }

})