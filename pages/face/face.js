// pages/face/face.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '百度AI',
    images: {},
    info: "",
    age: "",
    beauty: "",
    expression: "",
    glasses: "",
    userInfo: {},
    backUserInfo: {}, //后台得到的微信用户信息
    hasUserInfo: false,
    openId: "",
    nickName: "",
    host: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=【百度云应用的AK】&client_secret=【【百度云应用的SK】】",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    remark: ""
  },

  /**
   * 事件处理函数
   */
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 上传本地图片或者拍照获取检测图片
   */
  uploads: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
            img: res.tempFilePaths[0],
            age: "",
            beauty: "",
            expression: "",
            glasses: "",
          }),
          wx.showLoading({
            title: "分析中...",
            mask: true
          })
      }
    })
  },

  /**
   * 请求开发者token
   */
  getToken: function(host) {
    wx.request({
      url: this.data.host,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var getAppWXUserInfo = app.globalData.userInfo;
    this.setData({
      userInfo: getAppWXUserInfo,
      hasUserInfo: true,
      openId: getAppWXUserInfo.openId,
      nickName: getAppWXUserInfo.nickName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("页面初次渲染完成")
    // app.getToken(this.data.host)
    wx.request({
      url: host,
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      success(res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    
  }
})