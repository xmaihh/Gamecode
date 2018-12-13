//对外提供接口  需要暴露在外面才能调用
module.exports = {
  getBaiduAIHost: getBaiduAIHost, //host接口
  getAccessToken: getAccessTokenUrl, // token接口
}

//接口URL==============
function getBaiduAIHost() { //获取百度AI 请求接口
  return "https://aip.baidubce.com/rest/2.0/face/v3/detect";
}

function getAccessTokenUrl() { // 获取百度AI access_token

  return "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=【百度云应用的AK】&client_secret=【百度云应用的SK】";
}