var httpUrl = 'http://localhost:8089/';

function wxRequest(url,params,method = "GET"){
    return new Promise((resolve,reject) => {
        wx.request({
            url: httpUrl + url, //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'skey': wx.getStorageSync("skey") || 1
            },
            data: params,
            method,
            success(res) {
                if(res.data.code === 0){
                    resolve(res);
                    return;
                }
                console.log(res,"发生错误");
                reject(res);
            },
            fail(err){
                reject(err,"发生错误");
            }
        })
    })
}

module.exports.wxRequest = wxRequest;
