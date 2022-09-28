//index.js

import { post, baseUrl, get } from '../../api/http'
import { reviewUrl } from '../../api/review'
import { postWorkListUrl } from '../../api/work'

//获取应用实例
const app = getApp()

Page({
    data: {
        workList: [],
        imgSrc: '',
        baseUrl: baseUrl,
        current_page: 1,
        page_count: 10,
        noMoreData: false
    },

    onLoad(){
        wx.setNavigationBarTitle({
            title: '作品',
        })
    },

    onShow(){
        this.getWork(true)
    },

    onShareAppMessage() {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    title: '查看圈内事情'
                })
            }, 2000)
        })
        return {
            title: '查看圈内事情',
            path: '/pages/index/index',
            promise
        }
    },

  async onPullDownRefresh(){
    let res = await this.getReviewStatus()
    wx.stopPullDownRefresh()
    if(res) return;
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },

  onReachBottom(){
      if(this.data.noMoreData) return;
      this.setData({
          current_page: this.data.current_page + 1
      })
      this.getWork()
  },

  async getReviewStatus(){
      let res = await get(reviewUrl)
      console.log(res)
      return res.data.status
  },

  async getWork(param){
    let obj = {
        keywords: "",
        current_page: this.data.current_page,
        page_count: this.data.page_count
    }

    let res = await post(postWorkListUrl, obj )
    if(res.code == 200){
        if((res.data || []).length < this.data.page_count){
            this.setData({
                noMoreData: true
            })
        }
        let arr = []
        if(param){
            arr = res.data
        }else{
            arr = this.data.workList.concat(res.data)
        }
        
        this.setData({
            workList: arr
        })
    }
  }
})
