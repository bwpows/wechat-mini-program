const { uploadSingleFileUrl } = require("../../../api/file")
const { baseUrl, post, get } = require("../../../api/http")
const { publishWechatWorkUrl } = require("../../../api/work")
const { baseOrderUrl } = require("../../../api/workOrder")

// pages/publish/publish.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedImages: [],
        title: '',
        url: [],
        uploadProgress: [],
        token: wx.getStorageSync('token'),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '发布工单',
            token: wx.getStorageSync('token'),
        })
    },

    inputChangeTitle(e){
        let text = e.detail.value.trimStart()
        this.setData({
            title: text
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
              title: '请输入工单内容',
              icon: 'error'
            })
        }

        let obj = {
            content: this.data.title,
            images: this.data.url
        }
        wx.showLoading({
            title: '正在处理中...',
            mask: true
        })
        let res = await post(baseOrderUrl, obj)
        wx.hideLoading()
        if(res.code == 200){
            wx.showToast({
              title: '提交成功',
              icon: 'success'
            })
            wx.navigateBack({
              delta: 1,
            })
        }else{
            wx.showToast({
              title: '提交失败',
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
                 Authorization: 'Bearer ' + that.data.token
              },
              success: function(res){
                  res.data = JSON.parse(res.data)
                  console.log(res.data);
                  url.push(res.data.data.url)
                  that.setData({
                      url,
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
    }

})