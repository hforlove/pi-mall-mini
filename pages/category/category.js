// pages/category/category.js
Page({

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'category'
      })
    }
  }
})