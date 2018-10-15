// pages/request/request.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("页面加载...")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("页面初次渲染完成")

    // wx.request({
    //   url: "https://aip.baidubce.com/oauth/2.0/token?grant_type",
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: "POST",
    //   success(res) {
    //     console.log(res.data)
    //     var data = res.data;
    //     // var str = JSON.parse(data);
    //     console.log(data.access_token)
    //     return data.access_token;
    //   }
    // })

    wx.chooseImage({
      count: 1, // 数量
      sizeType: ['compressed'], // 压缩格式 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res.tempFilePaths[0]);

        getBase64Image('myCanvas', this.data.imgUrl, function (base64Data) {
          //  在此处处理得到的base64数据
        });


        //转换处理函数
        var getBase64Image = function (canvasId, imgUrl, callback, imgWidth, imgHeight) {
          const ctx = wx.createCanvasContext(canvasId);
          ctx.drawImage(imgUrl, 0, 0, imgWidth || 300, imgHeight || 200);
          ctx.draw(false, () => {
            // API 1.9.0 获取图像数据
            wx.canvasGetImageData({
              canvasId: canvasId,
              x: 0,
              y: 0,
              width: imgWidth || 300,
              height: imgHeight || 200,
              success(res) {
                var result = res;
                // png编码
                var pngData = upng.encode([result.data.buffer], result.width, result.height);
                // base64编码
                var base64 = wx.arrayBufferToBase64(pngData);
                var base64Data = 'data:image/png;base64,' + base64;
                callback(base64Data);
              }
            })
          })
        };


      },
    })



  },

  /** 
   * 图片压缩，默认同比例压缩 
   * @param {Object} path     
   *         pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径 
   * @param {Object} obj 
   *         obj 对象 有 width， height， quality(0-1) 
   * @param {Object} callback 
   *         回调函数有一个参数，base64的字符串数据 
   */
  dealImage: function(path, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function() {
      //默认按比例压缩  
      var w = this.width,
        h = this.height;
      var quality = 0.95; // 默认图片质量为0.7  

      //生成canvas  
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // 创建属性节点  
      canvas.setAttribute("width", w);
      canvas.setAttribute("height", h);

      ctx.drawImage(this, 0, 0, w, h);
      // quality值越小，所绘制出的图像越模糊  
      var base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值  
      callback(base64);
    };
  },








  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("用户下拉动作")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉触底事件")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("用户分享")
  }
})