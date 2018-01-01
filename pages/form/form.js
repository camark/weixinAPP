// form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventID:'',
    eventDate:'',
    serialNumber:'',
    model:'',
    rackPostion:'',
    detail:'',
    imageList: [],
    //目前只上传一张照片，二期这里要改成三
    count:1,
    Device:'',
    description:'',
    reportUserInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //接受传入的参数
  onLoad: function (options) {
    this.setData({
      serialNumber: options.serialNumber,
      model: options.model,
      rackPostion: options.rackPostion,
      reportUserInfo: options.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //数据同步获取输入框的内容，设备类型，机架位置，故障详情
  modelChange: function (e) {
    this.setData({
      model: e.detail.value
    })
  },
  rackPostionChange: function (e) {
    this.setData({
      rackPostion: e.detail.value
    })
  },
  detailChange: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
// 选择图片
  chooseImage: function () {
    var that = this
    //现在只选择一个照片
    wx.chooseImage({
      sourceType: ['camera', 'album'] ,
      sizeType: ['compressed'],
      count: this.data.count,
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
   previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  //点击提交，先创建事件然后上传图片
  createEvent: function (e) {
    //处理事件的URL，不跟ID默认就是创建
    var eventURL = 'http://127.0.0.1:8000/inspection/Event/'
    var that = this
    //处理成功后的返回操作,会在本地存储中记录这一事件的提交情况
    function reSInfo() {
      var logs = wx.getStorageSync('myLogs') || []
      logs.unshift(that.data.eventDate + '\n'
       + ' 编号：' + that.data.eventID + '   '  + that.data.rackPostion + '  ' + that.data.model)
      wx.setStorageSync('myLogs', logs)
      wx.showModal({
        title: '事件提交成功',
        content: '事件编号：' +that.data.eventID + '，问题我们已经邮件通知管理员了',
        showCancel: false,
        success: function (res) {
          //这里还要改
          wx.switchTab({
            url: "../../pages/logs/logs"
          })
        }
      })
    }

    // 第一步上传信息 创建并得到eventID
    wx.request({
      url: eventURL,
      method: 'POST',
      //创建了很多冗余的信息，为了灵活上报
      data: {
        model: that.data.model,
        rackPostion: that.data.rackPostion,
        description: that.data.detail,
        Device: that.data.serialNumber,
        reportUserInfo: that.data.reportUserInfo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        // console.log(res.data.id)
        //把返回的EventID写到变量中
        that.setData({
          eventID: res.data.id,
          eventDate: res.data.EventDate
        })
        //Event创建完成后上传图片
        if (that.data.imageList.length > 0 ){
          // console.log(that.data.imageList.length > 0 )
          // console.log(that.data.imageList !== [])
          wx.uploadFile({
            url: eventURL + that.data.eventID + '/',
            filePath: that.data.imageList[0],
            name: 'imageOne',
            complete: function (res) {
              reSInfo()
            },
            fail: function (res) {
              wx.showModal({
                title: '服务器出现问题了',
                content: '事件编号：' + that.data.eventID + '。图片上传出错，兄弟打电话给管理员试试。',
                showCancel: false,
                success: function (res) {
                }
              })
            }
          })
        }else{
          reSInfo()
        }
      },
      fail:function(res){
        wx.showModal({
          title: '服务器出现问题了',
          content: '创建事件就出错了。谁知道那头又出现什么状况了，兄弟打电话给管理员试试。',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    })
   
  },
  backIndex:function(e){
    // console.log("backIndex")
    wx.switchTab({
      url: "../../pages/index/index"
    })
  },

})