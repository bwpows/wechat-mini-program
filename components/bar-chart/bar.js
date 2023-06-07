// components/line-chart/line.js
Component({

    options: {
        addGlobalClass: true,
    },

    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Array
        },
        height: {
            type: Number,
            value: 300
        }
    },

    pageLifetimes: {
        show: function() {
            console.log(this.data.data);
            const maxValue = this.data.data.reduce((prev, current) => prev.value > current.value ? prev : current )
            this.setData({
                maxValue: maxValue.value
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        maxValue: 200,
        minValue: 0,
        selectedIndex: -1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        selected(e){
            this.setData({
                selectedIndex: this.data.selectedIndex === e.currentTarget.dataset.index? -1 : e.currentTarget.dataset.index
            })
        }
    }
})
