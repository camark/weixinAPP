//logs.js
// var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },

  makeAPhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '4008200220' //仅为示例，并非真实的电话号码
    })
  },
  onShow: function () {
    // console.log(wx.getStorageSync('logs') )
    this.setData({
      logs: (wx.getStorageSync('myLogs') || ["暂无日志"])
    })
  }
})
