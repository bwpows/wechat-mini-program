//app.js

App({
  onLaunch() {
    this.checkToken()
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