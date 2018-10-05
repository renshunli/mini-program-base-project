Page({
    onShareAppMessage: function () {
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
