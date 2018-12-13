import Util from '../common/util'
import Constants from '../common/constants'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

const SettingCommands = {
  textList: ['每秒数据更新频率切换', '子弹速度切换', '子弹类型切换', '无敌模式切换', '背景层事件响应切换'],
  commandList: ['switchUpdateRate', 'switchBulletSpeed', 'switchBulletType', 'youAreGod', 'backgroundActive'],
  optionListList: [[60, 6], [10, 60], Constants.Bullet.Types.slice(0, 1), [false, true], [false, true]]
}

export default class GameInfo {
  constructor() {
    this.showGameOver = false
  }

  onTouchEvent(type, x, y, callback) {
    switch (type) {
      case 'touchstart':
        if (Util.inArea({ x, y }, this.areaSetting)){
          callback({ message: 'pause' })
          let commandIndex
          wx.showActionSheet({
            itemList: SettingCommands.textList,
            success: function (res) {
              commandIndex = res.tapIndex
            },
            complete: function () {
              if (commandIndex !== undefined){
                callback({
                  message: SettingCommands.commandList[commandIndex],
                  optionList: SettingCommands.optionListList[commandIndex]
                })
              }
              callback({ message: 'resume' })
            }
          })
        }
        else if (this.showGameOver && Util.inArea({ x, y }, this.btnRestart)) {
          callback({ message: 'restart' })
          this.showGameOver = false
        }
        break
    }
  }

  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    //visualize area boundary
    // ctx.drawImage(
    //   atlas,
    //   202, 6, 39, 24,
    //   10, 10,
    //   28, 25
    // )

    //candidate icons: ⏲⏱⏰⏳🏹🏆🏅🙌👾👁🐲👹😎☏✧☟😘🎈🎊⚙❤🐷💥👁‍🗨💬🔄💠㊙💦🍙🍒💎
    ctx.fillText(
      '🏆 ' + score, //设定图标
      10, 10 + 20
    )

    this.areaSetting = {
      startX: 10,
      startY: 10,
      endX: 10 + 28, //ctx.font = '20px Arial'
      endY: 10 + 25
    }
  }

  renderGameOver(ctx, score) {
    this.showGameOver = true
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    // ctx.font = 'normal bold 18px sans-serif';
    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnRestart = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}

