
import { getHomeData } from '../../utils/api'

Page({
  data: {
    barTop: 24,
    barHeight: 32,
    swiperList: [],
    navList: [],
    noticeList: []
  },
  onLoad(){
    const { top, height } = wx.getMenuButtonBoundingClientRect()
    this.setData({
      barTop: top,
      barHeight: height
    })
    getHomeData().then(res=>{
      const data = res.data
      this.setData({
        swiperList: data.adv.index_top,
        navList: data.cate,
        noticeList: data.announce
      })
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'index'
      })
    }
  },
})
