import Sprite    from '../base/sprite'
import Animation from '../base/animation'
import AnimationBuilder from '../base/animbuilder'
import DataBus   from '../databus'
const Config = require('../common/config.js').Config

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60

const __ = {
  speed: Symbol('speed'),
  explosionAnim: Symbol('explosionAnim')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Sprite {

  constructor(img_src, width, height) {
    if (img_src=== undefined || width === undefined || height === undefined)
      super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    else
      super(img_src, width, height)
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - this.width)
    this.y = -this.height
    //this.birth = new Date().getTime()

    this[__.speed] = speed

    this.visible = true
  }

  destroy(){
    this.visible = false
    let explosionAnim = databus.pool.getItemByClass('animation', Animation, Enemy.frames)
    //NOTE: 回调函数必须被重新设置，否则会有玄妙的后果..(回调到其他敌机实例去)
    explosionAnim.onFinished = () => {  //对象回收
      databus.removeAnimation(explosionAnim)
      databus.removeEnemey(this)
    }
    explosionAnim.start()
    this[__.explosionAnim] = explosionAnim
  }

  isAlive(){
    return this.visible
  }

  update(timeElapsed) {
    if (this.isAlive()) {
      this.y += this[__.speed]
      if (this.y > window.innerHeight + this.height){
        databus.removeEnemey(this)  //对象回收
        //console.log('Enemy life: ' + (new Date().getTime() - this.birth))
      }
    }
    else {  //destroyed
      this.y += this[__.speed]  //即便炸毁了还有惯性
      this[__.explosionAnim].update(timeElapsed)
    }
  }

  render(ctx){
    if (this.isAlive())
      super.render(ctx)
    else
      this[__.explosionAnim].render(ctx, this.x, this.y)
  }
}

// 预定义爆炸的帧动画
Enemy.explosionImageList = function() {
  let imageList = []
  const EXPLO_IMG_PREFIX = 'images/explosion'
  const EXPLO_FRAME_COUNT = 19
  for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
    imageList.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
  }
  return imageList
}
Enemy.frames = AnimationBuilder.initFramesFromPaths(Enemy.explosionImageList())
