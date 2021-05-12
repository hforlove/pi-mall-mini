import { getGoodsDetail, addCart, getCartNum, createCollect, deleteCollect } from '../../utils/api'
import { getStore, setStore, toast } from '../../utils/index'

Page({

  data: {
    detail: {},
    popupOption: false,
    popupAttr: false,
    popupTag: false,
    cartNum: 0
  },

  onLoad({id}){
    this._id = id
    this.getGoods()
  },

  toCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  onshowPopup(ev){
    const { type } = ev.currentTarget.dataset
    this.setData({
      [`popup${type}`]: true
    })
  },
  onClosePopup(ev){
    const { type } = ev.currentTarget.dataset
    this.setData({
      [`popup${type}`]: false
    })
  },

  onCollect(ev){
    if(this.data.detail.myCollect){
      this.deleteCollect(this.detai)
    }else{
      this.createCollect()
    }
  },

  onSubmit(ev){
    this.setData({
      popupOption: false
    })
    const { sku_id, num, type } = ev.detail
    const params = {
      sku_id,
      num
    }
    if(type == 'cart') this.addCart(params)
    if(type == 'buy'){
      wx.navigateTo({
        url: `/pages/orderCreate/orderCreate?type=buy_now&ids=${sku_id}&num=${num}`,
      })
    }
  },

  // api相关方法
  getGoods(){
    getGoodsDetail(this._id).then(res=>{
      res.data.intro = res.data.intro.replace(/<img /g, '<img style="width:100%" ')
      console.log(res.data.intro);
      this.setData({
        detail: res.data,
        cartNum: getStore('cart')
      })
    })
  },
  addCart(params){
    addCart(params).then(res=>{
      getCartNum().then(res=>{
        setStore('cart',res.data)
        this.setData({
          cartNum: res.data
        })
      })
    })
  },
  createCollect(){
    const params = {
      topic_id: this._id,
      topic_type: "product"
    }
    createCollect(params).then(res=>{
      toast('已收藏')
      this.setData({
        'detail.myCollect': res.data
      })
    })
  },
  deleteCollect(){
    deleteCollect(this.data.detail.myCollect.id).then(res=>{
      this.setData({
        'detail.myCollect': null
      })
    })
  }
})