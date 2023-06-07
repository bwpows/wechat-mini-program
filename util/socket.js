
let SocketChat = wx.connectSocket({
    url: 'wss://app.bwpow.com:3000/chat',
    header:{
        'content-type': 'application/json'
    },
    success(res){
        console.log(res);
        console.log('链接成功');
    },
    fail(err){
        console.log('链接失败', err);
    }
})

SocketChat.onOpen((result) => {console.log('onOpen： true')})

SocketChat.onMessage((result) => {console.log('onMessage： true')})