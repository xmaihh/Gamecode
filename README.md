# 微信小程序
```
// Baiduface 小程序

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
# 微信小游戏
```
// Airplane

./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   └── enemy.js                           // 敌机类
├── player
│   ├── bullet.js                          // 子弹类
│   └── index.js                           // 玩家类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```

## 百度AI开放平台之人脸检测与属性分析
[接口文档](https://ai.baidu.com/docs#/Face-Detect-V3/top)

<img src="https://github.com/xmaihh/weixinxiaochengxu/raw/master/arts/baiduai_face.png" width="270" height="480" alt="演示效果"/>

## 经典飞机打战
<img src="https://github.com/xmaihh/weixinxiaochengxu/raw/master/arts/airplane.jpg" width="270" height="480" alt="演示效果"/>