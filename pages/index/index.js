//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Copyleft 上海电信版权所有',
    userInfo: {},
    //设备序列号在这个页面不用记录的，后面要删除
    serialNumber: ''
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  scanCode: function () {
    var that = this
    // 后台URL：url(r'^Device/(?P<pk>[0-9]+)/$', views.getDevice, name = 'getDevice')
    var urlDevice = 'http://192.168.123.119:8000/inspection/Device/'
    var urlData = ''
    wx.scanCode({
      success: function (res) {
        that.setData({
          serialNumber: res.result
        })
        //向服务器发起一个request，上传serialNumber，返回model和rackPostion
        wx.request({
          url: urlDevice+that.data.serialNumber+'/',
          header: {
            'content-type': 'application/json' // 默认值
          },
          //这里应该将返回的数据写到变量中
          success: function (res) {
            urlData = '/pages/form/form?serialNumber=' + that.data.serialNumber + 
            '&model=' + res.data.model + '&rackPostion=' + res.data.IDCPostionName + res.data.rackPostion
            wx.navigateTo({
              url: urlData
            })
          }
        })

      },
      fail: function (res) {
      }
    })
  }
})
