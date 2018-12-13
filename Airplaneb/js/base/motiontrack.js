import Constants from '../common/constants'
import Util from '../common/util'
const Config = require('../common/config.js').Config

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

function within(test, mid, bias) { //left align
  return (test >= mid - bias && test < mid + bias) 
}

function getDegree(deltaX, deltaY) {
  return Math.atan2(deltaY, deltaX) * 180 / Math.PI
}
function getDirection(degree) {
  let directionIn4 = 0
  let directionIn8 = 0

  //倒置坐标系，x轴向右不变，y轴却是向下的
  if (within(degree, 90, 45)) {
    directionIn4 = Constants.Directions.Down
  } else if (within(degree, 0, 45)) {
    directionIn4 = Constants.Directions.Right
  } else if ((degree >= 135 && degree <= 180) || (degree >= -180 && degree < -135)) {
    directionIn4 = Constants.Directions.Left
  } else if (within(degree, -90, 45)) {
    directionIn4 = Constants.Directions.Up
  }
  const PI_8 = 22.5  //PI/8 in degree
  if (within(degree, -90, PI_8)) {
    directionIn8 = Constants.Directions.North
  } else if (within(degree, -45, PI_8)) {
    directionIn8 = Constants.Directions.NE
  } else if (within(degree, 0, PI_8)) {
    directionIn8 = Constants.Directions.East
  } else if (within(degree, 45, PI_8)) {
    directionIn8 = Constants.Directions.SE
  } else if (within(degree, 90, PI_8)) {
    directionIn8 = Constants.Directions.South
  } else if (within(degree, 135, PI_8)) {
    directionIn8 = Constants.Directions.SW
  } else if ((degree >= -180 && degree < -180 + PI_8) || (degree >= 180 - PI_8 && degree <= 180)) {
    directionIn8 = Constants.Directions.West
  } else if (within(degree, -135, PI_8)) {
    directionIn8 = Constants.Directions.NW
  }
 
  return { in4: directionIn4, in8: directionIn8}
}

export default class MotionTrack {
  constructor(type, options = {}){
    this.type = type
    this.options = options
    this.data = {}
  }

  plan(src, dest, degree = undefined) {
    if (src === undefined) {
      src = this.data.curr
    }
    if (this.type === MotionTrack.Types.Bounce) {
      //...根据角度和边界计算终点
    }

    let delta = {
      x: dest.x - src.x,
      y: dest.y - src.y,
      degree: getDegree(dest.x - src.x, dest.y - src.y),
      value: Math.hypot(dest.x - src.x, dest.y - src.y)
    }
    //console.log(`${delta.x},${delta.y} => ${delta.degree}`)
    //需重新计算相对速度
    this.data.speed = Math.hypot(this.options.speed * Math.cos(delta.degree * Math.PI / 180),
          this.options.speed * Math.sin(delta.degree * Math.PI / 180) + Constants.Background.Speed * Config.UpdateRate) 
    let updateRequired = Math.ceil(Config.UpdateRate * delta.value / this.data.speed)  //aka.stepRequired
    this.data.step = {
      x: delta.x / updateRequired,
      y: delta.y / updateRequired,
      index: 0,
      count: updateRequired
    }
    //console.log(`motion step: value=${Math.hypot(this.data.step.x, this.data.step.y)}`)
    this.data.direction = getDirection(delta.degree)
    //console.log(`motion direction: in4=${this.data.direction.in4}, in8=${this.data.direction.in8}`)
    this.data.curr = src
    this.data.dest = dest
    //console.log(`motion plan: from (${this.data.curr.x},${this.data.curr.y}) to (${this.data.dest.x},${this.data.dest.y})`)
  }

  completed(){
    return this.data.step.index == this.data.step.count
  }

  nextStep(){
    if (!this.completed()){
      this.data.step.index++
      if (this.type === MotionTrack.Types.Linear) {
        if (this.data.step.index == this.data.step.count){
          this.data.curr = this.data.dest
        }
        else {
          this.data.curr.x += this.data.step.x
          this.data.curr.y += this.data.step.y
        }
      }
    }
    return {
      x: this.data.curr.x, //Math.round(this.data.curr.x),
      y: this.data.curr.y, //Math.round(this.data.curr.y),
      direction: this.data.direction
    }
  }

  rndPosition() {
    return {
      x: rnd(this.options.boundary.startX, this.options.boundary.endX),
      y: rnd(this.options.boundary.startY, this.options.boundary.endY)
    }
  }

}

MotionTrack.Types = {
  Linear: {
    speed: 0,
    boundary: {} //startX, startY, endX, endY
  },
  Bounce: {
    speed: 0,
    boundary: {} //startX, startY, endX, endY
  }
}