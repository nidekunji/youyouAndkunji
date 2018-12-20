/**
 * @author uu
 * @file 单个对话框
 * @todo 
 */
cc.Class({
  extends: cc.Component,

  properties: {
    label: cc.Label,
  },
  init(game) {
    this.game = game
    this.onHideDialog()
  },
  onShowDialog(text) {
    this.label.string = text
    this.node.active = true
  },
  onHideDialog() {
    this.node.active = false
  },
  onCertain(){
    this.game.onRevive()
    this.onHideDialog()
  }
});