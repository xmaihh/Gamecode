function getJson(){

  wx.request({
    url: 'https://raw.githubusercontent.com/xmaihh/PythonTrainingThings/master/cookbook/cookbook.json',
    data: '',
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      console.log(res)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}


module.exports = { 'getJson': getJson };