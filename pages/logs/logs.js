//logs.js
// var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    // console.log(wx.getStorageSync('logs') )
    this.setData({
      logs: (wx.getStorageSync('myLogs') || ["暂无日志"])
    })
  }
})
