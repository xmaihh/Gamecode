let sharedCanvas = wx.getSharedCanvas();

function drawRankList(data) {
  console.log("************drawRankList called")
  data.forEach((item, index) => {
    console.log(item)
  })
}

wx.onMessage(data => { 
  console.log("************onMessage called") 
  console.log(data)
  let kvdata = [{
    key: "score",
    value: "12"
  }]

// })

    wx.setUserCloudStorage({  
    KVDataList: kvdata,
      success: res => {   
      console.log(res)  
    },
    fail: res => {   
      console.log(res)  
    } 
  }) 

  let keyList = ["score"] 

  wx.getUserCloudStorage({  
    keyList: keyList,
      success: res => {   
      let data = res.data   
      console.log(res)  
    },
      fail: res => {   
      console.log(res)  
    } 
  }) 

  wx.getFriendUserGameData({  
    keyList: keyList,
      success: res => {   
      let data = res.data   
      drawRankList(data)  
    },
      fail: res => {   
      console.log(res)  
    } 
  })
})