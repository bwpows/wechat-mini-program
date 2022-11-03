// pages/login/login.js

import { post, get } from '../../api/http'
import { getProfileUrl, postCodeLoginUrl, postSmsLoginUrl } from '../../api/user'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        check: false,
        checkValue: 1,
        vcodeValue: false,

        phone: null,
        verificationCode: '',

        verificationCodeTime: 0,

        // 定时器
        calcVerCodeTimer: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.hideHomeButton()
        wx.setNavigationBarTitle({
          title: '注册 & 登录',
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        this.endCalcVerCodeTime()
    },

    // 输入手机号事件
    bindPhoneInput(e) {
        this.setData({
            phone: e.detail.value
        })
        this.checkBtnStatus()
    },

    // 输入验证码事件
    bindVcodeInput(e) {
        this.setData({
            verificationCode: e.detail.value
        });
        this.checkBtnStatus()
    },

    // 校验按钮是否禁用
    checkBtnStatus(){
        this.setData({
            vcodeValue: Boolean(this.data.verificationCode) && Boolean(this.data.phone)
        })
    },

    // 登录事件
    async checkStatus() {
        if(!this.checkphoneReg(this.data.phone)){
            return wx.showToast({
              title: '手机号不对',
              icon: 'error'
            })
        }
        if(!Boolean(this.data.verificationCode)){
            return wx.showToast({
              title: '验证码为空',
              icon: 'error'
            })
        }

        if(!this.data.check) {
            return wx.showToast({
              title: '请勾选同意协议',
              icon: 'error'
            })
        };
        
        let res = await post(postCodeLoginUrl, { phone: this.data.phone, code: this.data.verificationCode })
        if(res.code == 200){
            await wx.setStorageSync('token', res.data.data.token)
            await this.getUserInfo()
            wx.switchTab({
                url: '/pages/index/index'
            })
        }

    },

    // 获取验证码
    getVcode(){

        let that = this;

        // 判断手机号
        if(!this.checkphoneReg(this.data.phone)) return;

        // 获取验证码节流
        if(this.data.verificationCodeTime > 0) return;

        this.setData({
            verificationCodeTime: 60
        })

        post(postSmsLoginUrl, { phone: this.data.phone }).then(res => {
            if(res.code == 200){
                wx.showToast({
                    title: '发送验证码成功',
                    icon: 'success'
                })
                that.startCalcVerCodeTime()
            }else{
                wx.showToast({
                  title: '获取验证码失败',
                  icon: 'error'
                })
                that.endCalcVerCodeTime()
            }
        }).catch(err => {
            that.endCalcVerCodeTime()
        })
    },

    async getUserInfo(){
        let res = await get(getProfileUrl)
        if(res.code == 200){
            await wx.setStorageSync('userId', res.data.userId)
        }
    },

    // 同意框的改变事件
    checkboxChange(e) {
        if (e.detail.value.includes('1')) {
            this.setData({
                check: true,
            });
        } else {
            this.setData({
                check: false,
            });
        }
    },

    // 获取验证码倒计时
    startCalcVerCodeTime(){
        let that = this;
        that.data.calcVerCodeTimer = setInterval(() => {
            let time = that.data.verificationCodeTime - 1;
            that.setData({
                verificationCodeTime: time
            });
            if(time <= 0){
                that.endCalcVerCodeTime()
            }
        }, 1000);
    },

    endCalcVerCodeTime(){
        this.setData({
            verificationCodeTime: 0
        })
        clearInterval(this.data.calcVerCodeTimer)
    },

    
    checkphoneReg(phone){
        if(!(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(phone))){
            wx.showToast({
                icon: 'error',
                title: '手机号不正确',
            })
            return false;
        }else{
            return true
        }
    },

    goNotSignIn(){
        wx.navigateTo({
          url: '/pages/notLogin/notLogin',
        })
    }
    

})