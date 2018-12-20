/**
 * @author uu
 * @file 控制AI
 * @todo 实时获取怪物卡牌并且随机出卡
 */
cc.Class({
  extends: cc.Component,

  properties: {
    sprite: cc.Sprite,
    bloodLabel: cc.Label,
    nameLabel: cc.Label,
    contentLabel: cc.Label,
    cardIconAtlas:cc.SpriteAtlas,
  },
  init(UI, sprites, data) {
    this.game = UI.game
    this.UI = UI
    this.data = data
   // this.dataController = UI.game.data
    this.dataController = UI.game.dataMgr;
  //  this.sprite.spriteFrame = this.cardIconAtlas.getSpriteFrame(data.cardIcon);
    this.sprite.spriteFrame = sprites[data.spriteType]
    this.game.action.onAIEnter()
    // this.bloodLabel.string = data.blood
    // this.nameLabel.string = data.name
    // this.contentLabel.string = data.content
  },
  outCard() {
    // 获取出牌 删除出牌
    let outCard = this.dataController.getCardByID(this.data.cards[0])
    this.data.cards.shift()
    return outCard
  },
  onDie() {
    let cards = []
    for (let i = 0; i < this.data.cards.length; i++) {
      cards.push(this.dataController.getCardByID(this.data.cards[i]))
    }
    return cards
  }
});