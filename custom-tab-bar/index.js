Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
        {
            "selectedIconPath": "/images/bottomBar/homeSelected.png",
            "iconPath": "/images/bottomBar/home.png",
            "pagePath": "/pages/index/index"
        },
        {
            "selectedIconPath": "/images/bottomBar/workSelected.png",
            "iconPath": "/images/bottomBar/work.png",
            "pagePath": "/pages/work/work"
        },
        {
            "selectedIconPath": "/images/bottomBar/userSelected.png",
            "iconPath": "/images/bottomBar/user.png",
            "pagePath": "/pages/user/user"
        }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})