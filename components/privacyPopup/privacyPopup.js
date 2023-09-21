let privacyHandler
let privacyResolves = new Set()
let closeOtherPagePopUpHooks = new Set()


Component({
  data: {
    title: "用户隐私保护提示",
    desc1: "感谢您使用诺三小程序，您使用本小程序前应当阅井同意",
    urlTitle: "《用户隐私保护指引》",
    desc2: "当您点击同意并开始时用产品服务时，即表示你已理解并同息该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法进入本程序。",
    innerShow: false,
    height: 120,
  },

  options: {
    addGlobalClass: true,
  },

  lifetimes: {
    attached: function() {
      const closePopUp = () => {
        this.disPopUp()
      }
      this.closePopUp = closePopUp
      closeOtherPagePopUpHooks.add(this.closePopUp)
    },
    detached: function() {
      closeOtherPagePopUpHooks.delete(this.closePopUp)
    }
  },
  methods: {
    disPopUp() {
      if (this.data.innerShow === true) {
        this.setData({
          innerShow: false
        })
        this.getTabBar().setData({
            isShow: true
        })
      }
    },
    openPrivacyContract() {
      wx.openPrivacyContract({
        success: res => {
          console.log('openPrivacyContract success')
        },
        fail: res => {
          console.error('openPrivacyContract fail', res)
        }
      })
    },
    tabBarPageShow() {
      if (this.data.innerShow === false) {
        this.setData({
          innerShow: true
        })
      }
    },
    handleDisagree() {
        wx.exitMiniProgram()
    }
  }
})