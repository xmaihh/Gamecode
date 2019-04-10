# 微信小程序
```
├─arts                      //效果图
├─pages
|  ├─base64                 //将图片转换为base64编码
│  ├─face                   //调用百度AI人脸检测与属性分析
│  │  └─assets              //百度api返回的json示例
│  ├─index
│  └─logs
|─utils
|   ├─src
|   |  └─upng-js           //png编码开源库https://github.com/photopea/UPNG.js/
|   ├── api.js             //接口host
│   └── util.js            //工具类
├── app.js                 //全局js配置文件
├── app.json               //全局配置json文件
├── app.wxss               //全局wxss文件
└── project.config.json    //工具配置(个性化配置)
```

## 百度AI开放平台之人脸检测与属性分析
[接口文档](https://ai.baidu.com/docs#/Face-Detect-V3/top)

<figure class="half">
	<img src="https://github.com/xmaihh/weixinxiaochengxu/raw/master/arts/baiduai_face.png" width="270" height="480" alt="演示效果"/>
	<img src="https://github.com/xmaihh/weixinxiaochengxu/raw/master/arts/qr_baiduface.png" width="270"  alt="扫码体验"/>
</figure>