//index.js
//获取应用实例
const app = getApp()

/**
 * 字符串判空
 */
var isNULL = function(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

Page({
  data: {
    msg: '',
    img: ''
  },

  onLoad: function() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 上传图片
   */
  chooseImage: function() {
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
      },
    })
  },

  /**
   * 上传文字
   */
  textareaCtrl: function(e) {
    this.setData({
      msg: e.detail.value
    })
  },

  /**
   * 点击提交
   */
  uploads: function() {


    var _this = this;

    if (isNULL(_this.data.msg)) {
      wx.showToast({
        title: "还没有填写文字内容",
      })
    } else if (isNULL(_this.data.img)) {
      wx.showToast({
        title: '还没有选择图片呢',
      })
    } else {
      //  调用ContentCheck云函数检查文字是否违规
      wx.cloud.callFunction({
        name: 'ContentCheck',
        data: {
          msg: _this.data.msg
        },
        success(res) {
          console.log(res.result)
          if (res.result.msggeR.errCode == 87014) {
            wx.showToast({
              title: '文字违规',
            })
          }else{
            wx.showToast({
              title: "文字安全"
            })
          }
        }
      })
      //  调用ContentCheck云函数检查图片是否违规
      wx.cloud.callFunction({
        name: 'ContentCheck',
        data: {
          img: _this.data.img
        },
        success(res) {
          console.log(res.result)
          if(res.result.imageR.errCode == 87014){
            wx.showToast({
              title: '图片违规',
            })
          }else{
            wx.showToast({
              title:"图片安全"
            })
          }
        }
      })
    }
  },

})