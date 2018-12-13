import Constants from '../common/constants'
import Util from '../common/util'

const regeneratorRuntime = require('../libs/regenerator/runtime-module')

let frame_proto = {
  image: new Image(),
  srcX: 0,
  srcY: 0,
  width: 0,
  height: 0,
  offsetX: 0, //add it to destX
  offsetY: 0
}

export default class AnimationBuilder {
  constructor() {
  }

  //初始化方式一：从图片路径数组初始化
  static initFramesFromPaths(imagePathList) {
    let frames = []
    imagePathList.forEach((imageSrc) => {
      let image = new Image()
      image.src = imageSrc
      image.onload = () => { //IMPROVE: use Promise.all()
        let frame = {
          image: image,
          srcX: 0,
          srcY: 0,
          width: image.width,
          height: image.height,
          offsetX: 0,
          offsetY: 0
        }
        frames.push(frame)
      }
    })
    return frames
  }

  //初始化方式二：从ATLAS图片及数据初始化（for行走图）
  //去除asyn和await就是同步的版本，frames会在Promise完成时被充填
  static async asyncInitFramesFromAtlas(atlasTexture, frameNames = null) {
    let frames = []
    let convertAndPush = (atlasImage, atlasFrame) => {
      if (atlasFrame) {
        frames.push({
          image: atlasImage,
          srcX: atlasFrame.x,
          srcY: atlasFrame.y,
          width: atlasFrame.width,
          height: atlasFrame.height,
          offsetX: atlasFrame.offsetX,
          offsetY: atlasFrame.offsetY
        })
      }
    }

    await Util.promiseImageLoad(atlasTexture.imagePath)
    .then( img => {
      //console.log('[TEST] Util.promiseImageLoad.then() comes first')
      if (Array.isArray(frameNames))
        frameNames.forEach(name => convertAndPush(img, atlasTexture.frames[name]))
      else {
        (Array.isArray(atlasTexture.frames) ? atlasTexture.frames : Object.values(atlasTexture.frames))
        .forEach(atlasFrame => convertAndPush(img, atlasFrame))
      }
    })
    .catch(e => console.error(`initFramesFromAtlas failed: ${e}`))
    //console.log('[TEST] before return real result (through Promise.resolve)')
    return frames  //async方法返回的是以frames为resolve参数的Promise
  }

}

