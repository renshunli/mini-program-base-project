//app.js
var util = require('./utils/util.js');
var { checkLogin,loginwx,joinGroup } = require('./api/api.js');
App({
    onLaunch(ops) {
        //从分享进入项目
        if(ops.scene == 1044){
            console.log(ops.shareTicket)
            console.log("从分享进入的用户")
            wx.getShareInfo({
                shareTicket: ops.shareTicket,
                complete(res){
                    joinGroup({
                        sessionKey: wx.getStorageSync("skey"),
                        ...res,
                    }).then(res => {
                        console.log(res);
                    })
                    console.log(res)
                }
            })
        }
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    onShow(options) {
        console.log('onShow' + JSON.stringify(options))
    },
    onHide(options) {
        console.log('onHide' + JSON.stringify(options))
    },
    onError(msg) {
        console.log('onError : ' + msg)
    },
    wxLogin(cb){
        var that = this;
        wx.login({
            success(loginRes) {
                wx.getUserInfo({
                    timeout:3000,
                    success: (res) => {
                        loginwx({
                            code: loginRes.code,
                            ...res.userInfo
                        }).then(res => {
                            that.globalData.userInfo = res.data.body.userInfo;
                            wx.setStorageSync("skey", res.data.body.sessionKey);
                            cb(res.data.body.userInfo);
                        },err => {
                            console.log(err);
                        })
                    },
                    fail: (err)=>{
                        console.log(err);
                    },
                })
            }
        })
    },
    getUserInfo(cb = () => {}) {
        let skey = wx.getStorageSync("skey");
        if(skey == ""){
            if (this.globalData.userInfo) {
                console.log('globalData');
                cb(this.globalData.userInfo)
            } else {
                this.wxLogin(cb);
            }
        }else{
            checkLogin().then(res => {
                this.globalData.userInfo = res.data.body;
                cb(res.data.body);
            }).catch(err => {
                this.wxLogin(cb);
            })
        }

    },
    globalData: {
        userInfo: null
    }
})
