import { getStore } from "../../utils/index"

// pages/profile/profile.js
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'profile',
        cart: getStore('cart') || 0
      })
    }
  }
})