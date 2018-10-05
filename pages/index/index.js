//index.js
//获取应用实例
var app = getApp();
let { loginwx } = require('../../api/api.js');
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        msgItem: true,
        item: [1,2,3]
    },
    //事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo((userInfo) => {
            //更新数据
            console.log(userInfo);
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onPullDownRefresh() {
        console.log('下拉刷新')
    }
})
