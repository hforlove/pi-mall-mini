import { getGoodsList } from '../../utils/api'

Page({
  data: {
    keyword: '',
    page: 1,
    cate_id: '',
    isHidden: true,
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
  onLoad(payload){
    const cate_id = payload.id || ''
    const history = wx.getStorageSync('history') || []
    const hotSearch = wx.getStorageSync('hotSearch') || []
    this.setData({
      history,
      hotSearch,
      cate_id
    })
    this.getGoodsList()
  },
  onReachBottom(){
    if(!this.data.nextPage) return
    this.setData({
      page: this.data.page + 1
    })
    this.getGoodsList()
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
  onSearch(){
    const history = this.data.history
    if(!this.data.keyword) return
    if(!this.data.history.includes(this.data.keyword)){
      history.unshift(this.data.keyword)
      wx.setStorageSync('history', history)
      this.setData({history})
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