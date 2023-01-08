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