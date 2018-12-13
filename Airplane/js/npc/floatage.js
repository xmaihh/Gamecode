import Sprite from '../base/sprite'
import Animation from '../base/animation'
import AnimationBuilder from '../base/animbuilder'
import MotionTrack from '../base/motiontrack'
import DataBus from '../databus'
import Constants from '../common/constants'
const Config = require('../common/config.js').Config

const FLOATAGE_ATLAS_TEXTURE = {
  imagePath: "images/floatage_atlas.png",
  maxFrameWidth: 80,
  maxFrameHeight: 58,
  directions: [
    Constants.Directions.Down, 
    Constants.Directions.Left,
    Constants.Directions.Right, 
    Constants.Directions.Up
  ],
  frames: {
    move01: {
      x: 0,
      y: 0,
      width: 80,
      height: 58,
      offsetX: 0,
      offsetY: 0
    },
    move02: {
      x: 80,
      y: 0,
      width: 80,
      height: 58,
      offsetX: 0,
      offsetY: 0
    },
    move03: {
      x: 160,
      y: 0,
      width: 80,
      height: 58,
      offsetX: 0,
      offsetY: 0
    },
    move04: {
      x: 240,
      y: 0,
      width: 73,
      height: 58,
      offsetX: 0,
      offsetY: 0
    }
  }
}
const FLOATAGE_IMG_SRC = 'images/object.png'
const FLOATAGE_WIDTH = 60  //不影响动画大小，但影响碰撞检测！
const FLOATAGE_HEIGHT = 60

const __ = {
  speed: Symbol('speed'),
  animation: Symbol('animation')
}

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

let atlasHeightIndex = (direction, directions) => {
  if (!Array.isArray(directions))
    return 0
  let index = 0
  if (directions.length == 4) {
    index = directions.indexOf(direction.in4)
  }
  else if (directions.length == 8) {
    index = directions.indexOf(direction.in8)
  }
  return index
}

export default class Floatage extends Sprite {

  constructor() {
    super(FLOATAGE_IMG_SRC, FLOATAGE_WIDTH, FLOATAGE_HEIGHT)
    this[__.animation] = new Animation(Floatage.frames, Constants.Floatage.AnimUpdateRate, 0.75, 
        true, undefined, FLOATAGE_ATLAS_TEXTURE.maxFrameHeight)

    this.motiontrack = new MotionTrack(MotionTrack.Types.Linear)
  }

  init(speed, x, y) {
    if (x === undefined || y === undefined){
      this.x = rnd(0, window.innerWidth - FLOATAGE_WIDTH)
      this.y = -this.height
    }
    else {
      [this.x, this.y] = [x, y]
    }
    this.direction = { in4: 0, in8: 0 }

    //this[__.speed] = speed
    this.motiontrack.options.speed = speed
    //this.motiontrack.plan({ x: this.x, y: this.y }, 
    //    { x: this.x, y: window.innerHeight + this.height})  //简单垂直降落
    this.motiontrack.options.boundary = {
      startX: 0, startY: 0,
      endX: window.innerWidth - this.width, 
      endY: window.innerHeight + this.height
    }
    this.motiontrack.plan({ x: this.x, y: this.y }, this.motiontrack.rndPosition())

    this.visible = true
    this[__.animation].start()
  }

  dispose() {
    this.visible = false
    databus.removeFloatage(this)
  }

  isActive() {
    return this.visible
  }

  update(timeElapsed) {
    if (this.isActive()) {
      //this.y += this[__.speed]
      if (this.motiontrack.completed()){
        this.motiontrack.plan(undefined, this.motiontrack.rndPosition())
      }
      let {x, y, direction} = this.motiontrack.nextStep()
      ;[this.x, this.y, this.direction] = [x, y, direction]
      if (this.y >= window.innerHeight + this.height)
        this.dispose()  //对象回收
      this[__.animation].update(timeElapsed)
    }
  }

  render(ctx) {
    if (this.isActive()){
      //super.render(ctx)
      this[__.animation].render(ctx, this.x, this.y,
        0, 0, 'topleft', 
        atlasHeightIndex(this.direction, FLOATAGE_ATLAS_TEXTURE.directions))
    }
  }

}

// 预定义漂浮物的帧动画
//Floatage.frames = AnimationBuilder.initFramesFromAtlas(FLOATAGE_ATLAS_TEXTURE)
AnimationBuilder.asyncInitFramesFromAtlas(FLOATAGE_ATLAS_TEXTURE).then((frames) => Floatage.frames = frames)
