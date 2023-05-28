//index.js

import { post, baseUrl, get } from '../../../api/http'
import { reviewUrl } from '../../../api/review'
import { postWorkListUrl } from '../../../api/work'

//获取应用实例
const app = getApp()

Page({
    data: {
        workList: [],
        imgSrc: '',
        baseUrl: baseUrl,
        current_page: 1,
        page_count: 10,
        noMoreData: false,
        initLoading: true,
        safeArea: app.globalData.safeArea,
        scrollHeight: 22,
        selectedWork: false,
        loading: true
    },

    async onLoad(){
        wx.setNavigationBarTitle({
            title: '作品',
        })
        this.getTabBar().setData({
            selected: 1
        })
    },

    async onShow(){
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0
            })
        }
        await this.getWork(true)
        this.setData({
            initLoading: false
        })
    },

    onPageScroll(e){
        this.setData({
            scrollHeight: e.scrollTop + 22
        })
    },

    onShareAppMessage() {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    title: '查看圈内事情'
                })
            }, 500)
        })
        return {
            title: '查看圈内事情',
            path: '/pages/index/index',
            promise
        }
    },

  async onPullDownRefresh(){
    if(this.data.selectedWork){
        wx.stopPullDownRefresh()
        return;
    };
    this.setData({
        current_page: 1,
        noMoreData: false
    })
    this.getWork(true)
    let res = await this.getReviewStatus()
    wx.stopPullDownRefresh()
    if(res) return;
    wx.navigateTo({
        url: '/pages/work/add/add',
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
      return res.data
  },

  async getWork(param){
    if(param) {
        this.setData({
            current_page:  1
        })
    }
    let obj = {
        keywords: "",
        current_page: this.data.current_page,
        page_count: this.data.page_count
    }
    this.setData({loading: true})
    let res = await post(postWorkListUrl, obj)
    this.setData({loading: false})
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
  },

  async isSelectedWork(e){
      this.setData({
        selectedWork: e.detail
      })
  }

})
