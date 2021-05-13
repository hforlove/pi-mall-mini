import { getGoodsList } from '../../utils/api'
import { getStore } from '../../utils/index'

Page({
  data: {
    keyword: '',
    page: 1,
    cate_id: '',
    isHidden: false,
    history: [],
    hotSearch: [],
    selectType: 1,
    select: [
      { text: '综合', value: 1 },
      { text: '价格升序', value: 2 },
      { text: '价格降序', value: 3 },
    ],
    nextPage: true,
    goodsList: []
  },
  onLoad({id}){
    const history = getStore('history') || []
    const hotSearch = getStore('hotSearch') || []
    this.setData({
      history,
      hotSearch,
      cate_id: id,
      isHidden: !!id
    })
    this.getGoodsList()
  },
  onReachBottom(){
    const { page, nextPage } = this.data
    if(!nextPage) return
    this.setData({
      page: page + 1
    })
    this.getGoodsList()
  },

  toOrderPage(ev){
    const { id } = ev.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?id=${id}`,
    })
  },

  onChange(ev){
    this.setData({
      keyword: ev.detail
    })
  },
  onShowSearch(){
    this.setData({
      isHidden: false
    })
  },
  onQuickSearch(ev){
    const { key } = ev.currentTarget.dataset
    this.setData({
      keyword: key
    })
    this.setData({isHidden:true})
    this.resetParams()
    this.getGoodsList()
  },
  onSearch(){
    const history = this.data.history
    if(this.data.keyword){
      if(!this.data.history.includes(this.data.keyword)){
        history.unshift(this.data.keyword)
        wx.setStorageSync('history', history)
        this.setData({history})
      }
    }
    this.setData({isHidden:true})
    this.resetParams()
    this.getGoodsList()
  },
  resetParams(){
    this.setData({
      goodsList: [],
      page: 1,
      nextPage: true
    })
  },

  getGoodsList(){
    const { keyword, cate_id, page } = this.data
    getGoodsList({keyword, cate_id, page}).then(res=>{
      this.setData({
        goodsList: [...this.data.goodsList,...res.data]
      })
      if(res.data.length < 12){
        this.setData({
          nextPage: false
        })
      }
    })
  }
})