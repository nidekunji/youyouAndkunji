/**
 * @author uu
 * @file  主控制器
 * @todo 
 */
let DataMgr = require('DataMgr')
cc.Class({
  extends: cc.Component,

  properties: {
    game: require('game'),
    pages: require('pages'),
    data: require('data'),
    dataMgr:null,
  },
  init(){
    this.game.init(this)
    this.pages.init()
    this.dataMgr = DataMgr;
    this.isFristTime()
  },
  start(){
    this.init()
  },
  isFristTime() {
    let isFristTime = true
    // todo 
    // if (isFristTime) {
    //   this.data.resetData()
    // } else {
    //   this.data.onLoadGameData()
    // }
    if (isFristTime) {
      this.dataMgr.resetData()
    } else {
      this.dataMgr.onLoadGameData()
    }
    this.onStartPage()
  },
  onStartPage() {
    this.pages.onOpenPage(1)
  },
  onGameStart() {
    this.game.onGameStart(this.dataMgr.getData())
    this.pages.onOpenPage(2)
  },
});