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
    var urlDevice = ''
    var urlData = ''
    wx.scanCode({
      success: function (res) {
        that.setData({
          serialNumber: res.result
        })
        //向服务器发起一个request，上传serialNumber，返回model和rackPostion
        wx.request({
          url: 'http://192.168.123.119:8000/inspection/'+that.data.serialNumber+'/Device/',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
          }
        })
        urlData = '/pages/form/form?serialNumber='+that.data.serialNumber+'&model=DL380&rackPostion=周家渡K6'
        wx.navigateTo({
          url: urlData
        })
      },
      fail: function (res) {
      }
    })
  }
})
