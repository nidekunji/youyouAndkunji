/**
 * @author uu
 * @file 控制UI层
 * @todo 
 */
cc.Class({
  extends: cc.Component,

  properties: {
    fightContainer: cc.Node,
    data: require('data'),
    cardsContainer: cc.Node,
    cardPrefab: cc.Prefab,
    AI: require('AI'),

    cardSpriteFrames: [cc.SpriteFrame],
    AISpriteFrame: [cc.SpriteFrame],
  },
  init(game) {
    this.game = game
    this.action = game.action
    this.createPools()
  },

  // --------------------卡牌实例化相关-----------------------
  createPools() {
    this.cardsPool = new cc.NodePool()
    let initCount = 10
    for (let i = 0; i < initCount; i++) {
      let card = cc.instantiate(this.cardPrefab)
      this.cardsPool.put(card)
    }
  },
  renderCards(data) {
    var self = this
    this.recoveryUICards()
    data.forEach(cardData => {
      self.instantiateCard(self, cardData, self.cardsContainer)
    });
  },
  instantiateCard(self, data, parent) {
    let card = null
    if (self.cardsPool && self.cardsPool.size() > 0) {
      card = self.cardsPool.get()
    } else {
      card = cc.instantiate(self.cardPrefab)
    }
    card.parent = parent
    card.scale = 1
    card.x = 0
    card.y = 0
    card.getComponent('card').init(self, self.cardSpriteFrames, data)
    return card
  },
  recoveryUICards() {
    let childrens = this.cardsContainer.children
    if (childrens.length != 0) {
      let length = childrens.length
      for (let i = 0; i < length; i++) {
        this.cardsPool.put(childrens[0])
      }
    }
  },
  // ------------------------AI相关---------------------------
  renderAI(data) {
    this.AI.init(this, this.AISpriteFrame, data)
  },
  askAI() {
    let data = this.AI.outCard()
    this.currentAICard = this.instantiateCard(this, data, this.fightContainer)
    this.action.AIoutCard(this.currentAICard)
    return data
  },
  // ------------------------游戏进程相关-----------------------
  onCardOut(card, data) {
    this.cardsPool.put(card)
    this.currentPlayerCard = this.instantiateCard(this, data, this.fightContainer)
    this.action.playerOutCard(this.currentPlayerCard)
    // 在数据种去除该卡牌
    for (let i = 0; i < this.game.gameData.cards.length; i++) {
      if (this.game.gameData.cards[i] == data) {
        this.game.gameData.cards.splice(i, 1)
        console.log('玩家剩余卡牌:', this.game.gameData.cards)
        return
      }
    }
  },
  onPlayerGetCardFromAI(cards) {
    let cardGroup = []
    for (let i = 0; i < cards.length; i++) {
      let card = this.instantiateCard(this.cards[i], this.fightContainer)
      card.x = Math.round(Math.random() * 400) - 200;
      card.y = Math.round(Math.random() * 50) + 150;
      card.runAction(this.action.getCardFromAI())
      cardGroup.push(card)
    }
    this.setInterval(() => {

    }, 2);
  },
  recoveryCenterCards() {
    if (this.cardsPool) {
      this.cardsPool.put(this.currentPlayerCard)
      this.cardsPool.put(this.currentAICard)
    }
  },
});