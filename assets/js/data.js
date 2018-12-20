/**
 * @author uu
 * @file 游戏数据文件
 * @todo 
 */
cc.Class({
  extends: cc.Component,

  properties: {
    data: '',
    isHaveData: false,
  },
  init(controller) {
    this.controller = controller
    this.isHaveData = false
  },
  getData() {
    if (this.data == '' || this.isHaveData == false) {
      this.setTimeout(() => {
        this.getData()
      }, 0.1);
      console.log('获取数据失败')
    } else {
      return this.data
    }
  },
  resetData() {
    let card = this.getCardsData().slice(0, 3)
    this.data = {
      playerData: {
        level: 1,
        blood: 1,
      },
      achievementData: {},
      cards: card,
      guideData: 0,
    }
    console.log(this.data)
    this.isHaveData = true
  },
  onLoadGameData() {
    this.isHaveData = true
  },
  // ----------------固态数据----------------------
  getAIsData() {
    let data=[{
      name: '史莱姆',
      conten: '人人喊打',
      spriteType: 0,
      blood: 1,
      cards: [0,0,0],
    }, {
      name: '史莱姆1',
      conten: '人人喊打1',
      blood: 1,
      spriteType: 0,
      cards: [1,1,1],
    }, {
      name: '史莱姆2',
      conten: '人人喊打2',
      blood: 1,
      spriteType: 0,
      cards: [2,2,2],
    }, ]
    return data
  },
  getCardsData() {
    return [{
      name: 'punch',
      content: 'give a punch !',
      cardAtt: 0,
      cardValue: 1,
    }, {
      name: 'run',
      content: 'give a run !',
      cardAtt: 1,
      cardValue: 1,
    }, {
      name: 'skill',
      content: 'give a skill !',
      cardAtt: 2,
      cardValue: 1,
    }]
  },
  getAIByID(id) {
    let data = this.getAIsData()[id]
    return data
  },
  getCardByID(id) {
    let data = this.getCardsData()[id]
    return data
  },
});