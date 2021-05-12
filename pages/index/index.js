
import { getStore } from '../../utils/index'
import { getHomeData } from '../../utils/api'

Page({
  data: {
    barTop: 24,
    barHeight: 32,
    swiperList: [],
    navList: [],
    noticeList: [],
    newList: [],
    hotList: [],
    recommenList: []
  },
  onLoad(){
    const { top, height } = wx.getMenuButtonBoundingClientRect()
    this.setData({
      barTop: top,
      barHeight: height
    })
    this.getData()
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'index',
        cart: getStore('cart') || 0
      })
    }
  },

  toOrderPage(ev){
    const { id } = ev.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?id=${id}`,
    })
  },

  /*
  **  api相关方法
  */
  getData(){
    getHomeData().then(res=>{
    const data = res.data
    this.setData({
      swiperList: data.adv.index_top,
      navList: data.cate,
      noticeList: data.announce,
      newList: data.product_new,
      hotList: data.product_hot,
      recommenList: data.product_recommend
    })
    wx.setStorageSync('hotSearch', data.search.hot_search_list)
    })
  }

})
