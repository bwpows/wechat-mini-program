//app.js

App({
  onLaunch() {
    this.checkToken()
    // wx.login({
    //     success: async res => {
    //         console.log(res.code)
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId 
    //     },
    //     fail: (error) => {
    //         console.log(error)
    //     }
    // })
  },

  checkToken(){
    //   获取本地的token
    try {
        var value = wx.getStorageSync('token')
        if (!value) {
            wx.reLaunch({
                url: 'pages/login/login'
            })
        }
    } catch (e) {
        console.log('获取不到token')
    }
  },

  globalData: {
    userInfo: null
  }
})