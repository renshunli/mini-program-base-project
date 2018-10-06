let wxRequest = require('./wxRequest.js').wxRequest;

let apis = {
    // 微信小程序登录
    loginwx: params => wxRequest('login/loginwx',params,'POST'),
    // 检查登录
    checkLogin: params => wxRequest('login/checkLogin',params,"GET"),
    //群主添加群
    addGroup: params => wxRequest('groupwechat/addGroup',params,"POST"),
    //加入群
    joinGroup: params => wxRequest('groupwechat/joinGroup',params,"POST"),
}


module.exports = apis;

