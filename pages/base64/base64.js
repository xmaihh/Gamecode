// pages/base64/base64.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    areaWith: 750,
    areaHeight: 750,
    imgUrl: ' ',
    imageWidth: ' ',
    imageHeight: ' ',
    base64: ' '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 首次进入,利用隐藏的judgeCanvas判断当前导出图像是否颠倒
    util.checkOrientation('judgeCanvas');
  },

  /***
   *  获得上传图片的本地路径
   */
  uploadImage: function(e) {
    var _this = this;
    wx.chooseImage({
      count: 1, //可选择数量1，默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是缩略图
      sourceType: ['album', 'camera'], // 指定来源是相册还是camera
      success: function(res) {
        console.log('res ' + res);
        // 返回选中照片的本地文件路径列表,tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          imgUrl: tempFilePaths[0]
        })
      },
    })
  },
  /***
   * 图片大小裁剪
   */
  imageReponseToBox: function(e) {
    var imageSize = { };
    var originalWidth = e.detail.width; // 图片原始宽
    var originalHeight = e.detail.height; // 图片原始高
    var originalScale = originalHeight / originalWidth; //   图片高宽比
    console.log('originalWidth: ' + originalWidth);
    console.log('originalHeight: ' + originalHeight);
    // 获取屏幕的宽高
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowScale = windowHeight / windowWidth; // 屏幕高宽比
        console.log('windowWidth: ' + windowWidth);
        console.log('windowHeight: ' + windowHeight);
        if (originalScale < windowScale) { // 图片宽高比小于屏幕宽高比 
          // 图片缩放后的宽为屏幕宽
          imageSize.imageWidth = windowHeight;
          imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
        } else { // 图片高宽比大于屏幕高宽比
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      },
    })
    console.log('缩放后的宽: ' + imageSize.imageWidth)
    console.log('缩放后的高: ' + imageSize.imageHeight)
    return imageSize;
  },
  imageLoad:function(e){
    var imageSize = this.imageReponseToBox(e);
    console.log('imageWidth'+imageSize.imageWidth)
    this.setData({
      imageWidth:imageSize.imageWidth,
      imageHeight:imageSize.imageHeight
    })
  },
  processImage:function(){
    var _this = this;
    util.getBase64Image('myCanvas',this.data.imgUrl,function(data){
        _this.setData({
          base64:data
        }),
        console.log("base64编码: "+data)
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