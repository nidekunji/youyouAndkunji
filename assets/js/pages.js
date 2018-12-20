/**
 * @author uu
 * @file 页面控制器
 * @todo 
 */
cc.Class({
  extends: cc.Component,

  properties: {
    pages: [cc.Node],
  },
  init() {
    this.onOpenPage(1)
  },
  onOpenPage(num) {
    this.closeAllPages()
    this.pages[num].active = true
  },
  onButtonOpenPage(event, customEventHendle) {
    this.onOpenPage(customEventHendle)
  },
  closeAllPages() {
    this.pages.forEach(element => {
      element.active = false
    });
  },
});