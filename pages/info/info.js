// pages/blogInfo/blogInfo.js
Page({

    /**
     * 页面的初始数据
    */
    data: {
        blogInfo:{},
        blogerInfo:{}
    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        
        wx.setNavigationBarTitle({
          title: '作品详情',
        })

        let userInfo = JSON.parse(options.user)
        var that = this
        that.setData({
            blogerInfo: userInfo
        })
        wx.request({
        url: 'https://www.bowei.xyz:3000/blog/getBlogById',
        method: 'POST',
        data:{
            _id: options.blogid
        },
        success (res){
                res.data.list[0].blogContent = res.data.list[0].blogContent.replace(/<.+?>/g, '\n');
                res.data.list[0].blogContent = res.data.list[0].blogContent.replace(/&nbsp;/ig, '');
                res.data.list[0].blogContent = res.data.list[0].blogContent.replace(/\n\n/g,"\n");
                that.setData({
                    blogInfo: res.data.list[0]
                })
            }
        })
    },

})