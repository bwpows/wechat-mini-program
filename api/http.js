const baseUrl = 'https://app.bwpow.com:3000';  //后续可以改为你自己的域名接口地址


const request = (url, options) => {
    let token = null;
    if(wx.getStorageSync('token')){
        token = 'Bearer ' + wx.getStorageSync('token')
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}${url}`, //域名接口地址
            method: options.method, //配置method方法
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data), //如果是GET,GET自动让数据成为query String,其他方法需要让options.data转化为字符串
            header: {
                'Content-Type': 'application/json',
                'Authorization': token
            }, //header中可以添加token值等
            async success(request) { //监听成功后的操作
                if (request.statusCode === 200 || request.statusCode === 201) {
                    resolve(request.data)
                } else {
                    if (request.statusCode === 401) {
                        wx.showToast({
                          title: '先登录',
                          icon: 'error'
                        })
                        await wx.removeStorageSync('token')//如果返回401，可以做一些操作
                        wx.navigateBack({
                          delta: 0,
                        })
                    }else if(request.data.code === 403){
                        wx.showToast({
                          title: '权限不足',
                          icon: 'error'
                        })
                    }else{
                        wx.showToast({
                          title: request.data.msg || '系统故障',
                          icon: 'error'
                        })
                    }
                    reject(request.data)
                }
            },
            fail(error) { //返回失败也同样传入reject()方法
                reject(error.data)
            }
        })
    })
}

//封装get方法
const get = (url, options = {}) => {
    return request(url, {
        method: 'GET',
        data: options
    })
}
//封装post方法
const post = (url, options) => {
    return request(url, {
        method: 'POST',
        data: options
    })
}
//封装put方法
const put = (url, options) => {
    return request(url, {
        method: 'PUT',
        data: options
    })
}
//封装del方法
const del = (url, options) => {
    return request(url, {
        method: 'DELETE',
        data: options
    })
}

const pat = (url, data) => {
    return request(url, {
        method: 'PATCH',
        data: data
    })
}

module.exports = {
    get,
    post,
    put,
    del,
    pat,
    baseUrl
}