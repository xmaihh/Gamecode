const Config = require('../common/config.js').Config

const __ = {
  age: Symbol('age'),
}

/**
 * 简易的帧动画类实现
 */
export default class Animation {
  constructor(frames, frameRate = Config.UpdateRate, sizeRate = 1,
    loop = false, onFinished = undefined, atlasFrameHeight = 0) {
    this.frames = frames
    this.frameRate = frameRate
    this.sizeRate = sizeRate
    this[__.age] = undefined
    this.currIndex = undefined
    this.onFinished = onFinished
    this.loop = loop
    this.atlasFrameHeight = atlasFrameHeight //for 8-direction atlas
  }

  //computed values
  get MAX_AGE() {
    if (!Array.isArray(this.frames) || Number.isNaN(this.frameRate))
      return 0
    return this.frames.length * 1000 / this.frameRate
  }
  get frameIntervalRecipcal(){
    if (Number.isNaN(this.frameRate))
      return 0
    return this.frameRate / 1000
  }

  isLoaded() {
    let res = Array.isArray(this.frames) && this.frames.length > 0
    if (!res) console.log(`Animation is not loaded`)
    return res
  }

  isStarted() {
    return this[__.age] !== undefined
  }

  isFinished() {
    return this[__.age] >= this.MAX_AGE
  }

  start() {
    this[__.age] = 0
    this.currIndex = 0
  }

  stop() {
    this.loop = false
    this[__.age] = this.MAX_AGE
  }

  update(timeElapsed) {
    this[__.age] += timeElapsed
    if (this.isFinished()) {
      if (this.loop)
        this.start()
      else {
        this.currIndex = this.frames.length - 1
        this.onFinished && this.onFinished(this)
      }
    }
    else {
      this.currIndex = Math.floor(this[__.age] * this.frameIntervalRecipcal)
    }
  }

  // 渲染当前帧
  render(ctx, x, y, width = 0, height = 0, alignMode = 'topleft', atlasHeightIndex = 0) {
    if (!this.isLoaded() || !this.isStarted() || this.isFinished())
      return

    let currFrame = this.frames[this.currIndex]
    //根据渲染对齐方式，修正渲染位置
    width = width == 0 ? currFrame.width * this.sizeRate : width,
    height = height == 0 ? currFrame.height * this.sizeRate : height
    if (alignMode === 'center'){
      x -= width / 2
      y -= height / 2
    }
    
    //asssert(currFrame.image)
    ctx.drawImage(
      currFrame.image,
      currFrame.srcX,
      currFrame.srcY + atlasHeightIndex * this.atlasFrameHeight,
      currFrame.width,
      currFrame.height,
      x + currFrame.offsetX,
      y + currFrame.offsetY,
      width,
      height
    )
  }

}
