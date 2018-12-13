//Constants.js

//Speed: 1.per update 2.per second (if use MotionTrack class)
//SpawnRate: per second
//UpdateRate: per second

module.exports = {
  Enemy: {
    Speed: 6,  //以一次更新为单位，且实际速度为4(扣除地图速度)、是玩家飞机缺省速度(即地图速度)的2倍
    SpawnRate: 2  //per second
  },

  Bullet: {
    //Speed: configurable = true
    SpeedBase: 10,  //以一次更新为单位
    SpawnRate: 3,
    Types: ['single', 'double', 'triple', 'quadruple', 'quintuple'],
  },

  Floatage:{
    Speed: 3 * 60,  //采用MotionTrack类的实体，其速度是真正以秒为单位
    SpawnRate: 0.2,
    SpawnMax: 3,
    AnimUpdateRate: 4
  },

  Freighter:{
    Speed: 3,  //以一次更新为单位，且实际速度为1(扣除地图速度)
    SpawnRate: 0.2  //per second
  },

  Background:{
    Speed: 2
  },

  Directions:{
    //in 4
    Down: 0,
    Left: 1,
    Right: 2,
    Up: 3,
    //in 8
    North: 0,
    NE: 1,
    East: 2,
    SE: 3,
    South: 4,
    SW: 5,
    West: 6,
    NW: 7
  }

}
