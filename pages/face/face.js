// pages/face/face.js
var host = require('../../utils/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    access_token: '',
    img: '',
    base64: '',

    gender: "",
    age: "",
    race: "",
    face_shape: "",
    glasses: "",
    expression: "",
    beauty: "",
    face_probability: "",
    face_type: "",
  },
  /*********
   * 上传图片
   */
  uploads: function() {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选中照片的本地文件路径列表,tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          img: tempFilePaths[0],
        });
        wx.showLoading({ // Loading动画
            title: "分析中...",
            mask: true
          }),
          // 请求图片的base64编码 start
          wx.request({
            url: _this.data.img,
            method: 'GET',
            responseType: 'arraybuffer',
            success: function(res) {
              var base64 = wx.arrayBufferToBase64(res.data);
              _this.setData({
                base64: base64,
              })
              // 请求图片的base64编码 end
              console.log(_this.data.img + "\n");
              console.log(_this.data.base64 + "\n");
              console.log(_this.data.access_token + "\n");
              console.log(host.getBaiduAIHost() + '?access_token=' + _this.data.access_token + "\n");
              // 请求baidu人脸识别接口 start
              wx.request({
                url: host.getBaiduAIHost() + '?access_token=' + _this.data.access_token,
                data: {
                  // image: _this.data.img,
                  image: _this.data.base64,
                  image_type: 'BASE64',
                  // image_type:'URL',
                  face_field: 'age,beauty,expression,face_shape,gender,glasses,landmark,race,quality,face_type',
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "POST",
                success(res) {
                  wx.hideLoading();
                  console.log(res.data);
                  var data = res.data;
                  // var str = JSON.parse(data);
                  // 请求baidu人脸识别接口 end
                  wx.hideLoading();
                  if (data.error_code == 0) {
                    var result = data.result;
                    if (result.face_num != 0) {
                      var face_list = result.face_list;
                      var face = face_list[0];

                      var gender = face.gender; //性别
                      var age = face.age; //年龄
                      var race = face.race; //人种
                      var face_shape = face.face_shape; //脸型
                      var glasses = face.glasses; //眼镜
                      var expression = face.expression; //表情
                      var beauty = face.beauty; //颜值
                      var face_probability = face.face_probability; //人脸置信度
                      var face_type = face.face_type; //真实人脸/卡通人脸

                      if (beauty > 45) {
                        var title = gender.type == 'male' ? "宇宙无敌大帅比" : "宇宙无敌大美女";
                        wx.showToast({
                          title: title,
                          duration: 2000,
                        })
                      }

                      _this.setData({
                        gender: gender.type,
                        age: age,
                        race: race.type,
                        face_shape: face_shape.type,
                        glasses: glasses.type,
                        expression: expression.type,
                        beauty: beauty,
                        face_probability: face_probability,
                        face_type: face_type.type,
                      })
                    }
                  } else {
                    wx.hideLoading();
                    wx.showToast({
                      title: data.error_msg,
                      icon: 'succes',
                      duration: 1000,
                      mask: true
                    })
                    console.log(data.error_msg);
                  }
                }
              })
            }
          })
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this;
    // 请求token  start
    wx.request({
      url: host.getAccessToken(),
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      success(res) {
        console.log(res.data);
        // var data = res.data;   // 返回数据已经是json
        // var str = JSON.parse(data);
        _this.setData({
          access_token: res.data.access_token,
        })
        console.log(res.data.access_token)
      }
    })
    // 请求token end
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