import Enemy from './enemy'
import Floatage from './floatage'
import Constants from '../common/constants'
import DataBus from '../databus'

const FREIGHTER_IMG_SRC = 'images/freighter.png'
const FREIGHTER_WIDTH = 90
const FREIGHTER_HEIGHT = 90

let databus = new DataBus()

export default class Freighter extends Enemy {
  constructor() {
    super(FREIGHTER_IMG_SRC, FREIGHTER_WIDTH, FREIGHTER_HEIGHT)
  }

  destroy() {
    super.destroy()
    //spawn a floatage
    if (databus.floatages.length < Constants.Floatage.SpawnMax) {
      let floatage = databus.pool.getItemByClass('floatage', Floatage)
      floatage.init(Constants.Floatage.Speed,
        this.x + this.width / 2 - floatage.width / 2,
        this.y + this.height / 2 - floatage.height / 2)
      databus.floatages.push(floatage)
    }
  }
}
