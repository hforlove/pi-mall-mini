// components/Tabbar.js
Component({
  data: {
    active: 'index',
    cart: 0,
    lists: {
      index: '/pages/index/index',
      category: '/pages/category/category',
      cart: '/pages/cart/cart',
      profile: '/pages/profile/profile'
    }
  },
  methods: {
    onChange(ev){
      wx.switchTab({
        url: this.data.lists[ev.detail]
      })
      this.setData({
        active: ev.detail
      })
    }
  }
})
