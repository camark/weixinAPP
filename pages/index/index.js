//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Copyleft 上海电信版权所有',
    userInfo: {},
    //设备序列号
    serialNumber: ''
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据，获取用户信息
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  // 扫码
  scanCode: function () {
    var that = this
    // 后台URL：url(r'^Device/(?P<pk>[0-9]+)/$', views.getDevice, name = 'getDevice')
    // get设备数据，是url加一个序列号
    var urlDevice = 'http://127.0.0.1:8000/inspection/Device/'
    // 跳转报账页面的URL（forms页面）
    var urlData = ''

    // 扫码获取序列号
    wx.scanCode({
      success: function (res) {
        that.setData({
          serialNumber: res.result
        })
        //向服务器发起一个request，上传serialNumber，返回model和rackPostion
        wx.request({
          // 组成真正的URL
          url: urlDevice+that.data.serialNumber+'/',
          header: {
            'content-type': 'application/json' // 默认值
          },
          //这里应该将返回的数据写到变量中
          success: function (res) {
            // 对于状态码200的OK返回，组装url进行跳转，对于非200，用showModa报错
            if (res.statusCode == '200'){        
              // 序列号  型号 机房 机架 报账微信的昵称
              urlData = '/pages/form/form?serialNumber=' + that.data.serialNumber + 
              '&model=' + res.data.model + '&rackPostion=' + res.data.IDCPostionName + res.data.rackPostion+
                '&userInfo=' + that.data.userInfo.nickName
              wx.navigateTo({
                url: urlData
              })
            }else{
              //  wx.showModal
              wx.showModal({
                title: '这个编号系统里没有',
                content: '兄弟，也许你应该问问管理员这是怎么回事？状态码：' 
                + res.statusCode,
                showCancel:false,
                success: function (res) {
                }
              })
            }
          },
          // 非200，用showModa报错
          fail: function (res) {
            wx.showModal({
              title: '服务器没了',
              content: '兄弟，也许你的服务器被外星人劫持了',
              showCancel: false,
              success: function (res) {
              }
            })
          }
         })
      }
     })
    }
})
