export function loginWX(){
    return new Promise(function(reslove, reject) {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId 
                reslove(res.code);
            },
            fail: (error) => {
                reject(error)
            }
        })
    })
}

export function agreePrivacy(that) {
    console.log(that);
    wx.getPrivacySetting({
        success: res => {
            if (res.needAuthorization) {
                // 需要弹出隐私协议
                that.selectComponent('#privacy-popup-index').tabBarPageShow()
                that.getTabBar().setData({
                    isShow: false
                })
            }
        },
        fail: () => {},
        complete: () => {}
    })
}