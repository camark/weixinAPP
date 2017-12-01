// form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serialNumber:'',
    model:'',
    rackPostion:'',
    detail:'',
    imageList: [],
    count:3
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
    // console.log(model)
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
    wx.chooseImage({
      sourceType: ['camera', 'album'] ,
      sizeType: ['compressed'],
      count: this.data.count,
      success: function (res) {
        console.log(res)
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
  }
})