/**
 * @author kunji
 * @file 数据操作文件
 * @todo 
 * date 2018/12/15
 */
let CardData = require('CardData');
let AIData = require('AIData');

module.exports = { 
    data: '',
    isHaveData: false,
    cardData:CardData,
    aiData:AIData,

    

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
    
    getAIsData() {
      let data = [];
      for (let cardId in cardData) {
        data.push(cardData[cardId]);
      }
      return data;
    },
    getCardsData() {
        let data = [];
        for (let cardId in this.cardData) {
          data.push(this.cardData[cardId]);
        }
        return data;
    },
    getAIByID(id) {
      let data = this.aiData[id];
      return data
    },
    getCardByID(id) {
      let data = this.cardData[id]
      cc.log(data,"data by ID")
      return data
    },


  }