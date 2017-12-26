// form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventID:'',
    serialNumber:'',
    model:'',
    rackPostion:'',
    detail:'',
    imageList: [],
    count:1,
    Device:'',
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      serialNumber: options.serialNumber,
      model: options.model,
      rackPostion: options.rackPostion
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
        console.log(that.data.imageList[0])
        console.log(that.data.imageList)
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
  createEvent: function (e) {
    var eventURL = 'http://192.168.123.119:8000/inspection/Event/'
    var that = this
// 第一步上传信息 创建并得到eventID
    wx.request({
      url: eventURL,
      method: 'POST',
      data: {
        // serialNumber: that.data.serialNumber,
        // model: that.data.model,
        // rackPostion: that.data.rackPostion,
        // detail: that.data.detail
        description: 'abc',
        Device: '456'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        //把返回的EventID写到变量中
        that.setData({
          eventID: 'test001'
        })
        //Event创建完成后上传图片
        // wx.uploadFile({
        //   url: eventURL + this.data.eventID + '/', 
        //   filePath: that.data.imageList[0],
        //   name: 'imageOne',
        //   formData: {
        //     'EventID': 'test001'
        //   },
        //   success: function (res) {
        //     console.log(res.data)
        //     //do something
        //   }
        // })
      }
    })
   
  },
})