
import { getStore, removeStore } from "../../utils/index"
import { getUserDetail, logout } from '../../utils/api'

Page({

  data: {
    head_portrait: '',
    nickname: '',
    coupon_num: 0,
    account: {},
    orderNum: []
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'profile',
        cart: getStore('cart') || 0
      })
    }
  },

  onLoad(){
    getUserDetail().then(res=>{
      const { head_portrait, nickname, coupon_num, account, order_synthesize_num } = res.data
      this.setData({
        head_portrait,
        nickname,
        coupon_num,
        account,
        orderNum: order_synthesize_num
      })
    })
  },

  logout(){
    removeStore('token')
    removeStore('cart')
    wx.reLaunch({
      url: '/pages/login/login'
    })
  }
})