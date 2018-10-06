//index.js
//获取应用实例
var app = getApp();
let {
    loginwx,
    addGroup
} = require('../../api/api.js');
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        msgItem: true,
        item: [1, 2, 3],
        groupName: "",
        categoryName: "",
        introduction: ""
    },
    bindGroupName(e) {
        this.setData({
            groupName: e.detail.value
        })
    },
    bindCategoryName(e){
        this.setData({
            categoryName: e.detail.value
        })
    },
    bindIntroduction(e){
        this.setData({
            introduction: e.detail.value
        })
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
            that.setData({
                userInfo: userInfo
            })
        })

    },
    onShareAppMessage(resMessage){
        var that = this;
        wx.showShareMenu({
            withShareTicket: true
        })
        console.log(`这是通过：${resMessage.from}`)
        console.log(this);
        // 分享卡片内容
        if (resMessage.target.id === 'create') {
            return {
                title: that.data.groupName,
                imageUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLERLpErfNmo2B9ZIECmbEkwvVsX3hpCY6C0Ksfl0CJS3HnxfZYFm2hIMRvScewFQT96RgQkffXdw/132',
                desc: that.data.introduction,
                path: 'pages/index/index',
                success: (res) => {
                    // 转发成功，向后台发送openGId
                    console.log(res)
                    wx.getShareInfo({
                        shareTicket: res.shareTickets[0],
                        success: (res) => {
                            console.log('已成功获取到加密信息')
                            console.log(res);
                            addGroup({
                                sessionKey: wx.getStorageSync("skey"),
                                ...res,
                                categoryName: that.data.categoryName,
                                groupName: that.data.groupName,
                                introduction: that.data.introduction
                            }).then(res => {
                                console.log(res);
                            })
                        },
                        fail: (res) => {
                            console.log(res)
                        }
                    })
                },
                fail: (res) => {
                    // 转发失败
                    console.log(res)
                }
            }
        }
        return {
            title : "分享"
        }
    },
    onPullDownRefresh() {
        console.log('下拉刷新')
    }
})
