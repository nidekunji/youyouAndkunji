/**
 * @author uu
 * @file 游戏主要流程
 * @todo 
 */
let DataMgr = require('DataMgr')
cc.Class({
  extends: cc.Component,
  properties: {
    data: require('data'),
    action: require('action'),
    UI: require('UI'),
    AI: require('AI'),
    dialog: require('dialog'),
    fight: 0,
    turning: 0,
    status: 0, //0为禁止游戏操作 1为可以操作
    dataMgr:null,
  },
  init(controller) {
    this.controller = controller
    this.action.init(this)
    this.UI.init(this)
    this.dialog.init(this)
    this.status = 0
    this.fight = 0;
    this.turning = 0;
    this.dataMgr = DataMgr;
  },
  onGameStart(data) {
    this.gameData = data
    this.fightStart()
  },
  // ---------------------回合相关-----------------------
  fightStart() {
    cc.log(DataMgr);
   // this.UI.renderAI(this.dataMgr.getAIByID(this.fight))
    this.UI.renderAI(this.data.getAIByID(this.fight))
    this.turningStart()
  },
  turningStart() {
    // recoveryAllCardInCenter
    this.status = 1
    this.UI.recoveryCenterCards()
    this.UI.renderCards(this.gameData.cards)
  },
  onNextTurning() {
    cc.log('下一回合')
    this.turningStart()
  },
  onGameOver() {
    cc.log('游戏结束了')
    this.dialog.onShowDialog('fail QAQ')
  },
  nextFight() {
    cc.log('下一局')
    // 获取卡牌动画????
    this.action.onAIOut()
    //this.UI.onPlayerGetCardFromAI(this.AI.onDie())
    this.gameData.cards.push(...this.AI.onDie())
    this.fight++;
    this.turning = 0;
    this.scheduleOnce(() => {
      if (this.fight == 3) {
        this.onWin()
      } else {
        this.fightStart()
      }
    }, 0.5)
  },
  onWin() {
    cc.log('恭喜获胜')
    this.dialog.onShowDialog('you win!')
  },
  // -----------------------游戏对战相关--------------------
  onPlayerChooseCard(cardData) {
    this.status = 0
    var AIData = this.UI.askAI()
    console.log('巅峰对决:', cardData, AIData)
    // 等待一秒
    this.scheduleOnce(() => {
      if (this.checkWhoWin(cardData, AIData)) {
        this.onPlayerCardWin()
      } else {
        this.onAICardWin()
      }
    }, 1);
  },
  checkWhoWin(cardData, AIData) {
    // 比较哪张卡牌厉害
    if ((cardData.cardAtt != 0 && cardData.cardAtt > AIData.cardAtt) || (cardData.cardAtt == 0 && AIData.cardAtt == 2)) {
      return true
    } else {
      return false
    }

  },
  onPlayerCardWin() {
    this.action.onPlayerCardWin()
    this.scheduleOnce(() => {
      if (this.AI.data.blood == 1) {
        this.nextFight()
      } else {
        this.AI.data.blood--
        this.onNextTurning()
      }
    }, 1)
  },
  onAICardWin() {
    this.action.onAICardWin()
    this.scheduleOnce(() => {
      if (this.gameData.playerData.blood == 1) {
        this.onGameOver()
      } else {
        this.gameData.playerData.blood--;
        this.onNextTurning()
      }
    }, 1)
  },
  onRevive() {
    this.gameData.playerData.blood = 1
    this.controller.init()
  }
});