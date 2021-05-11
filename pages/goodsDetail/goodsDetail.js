import { getGoodsDetail, addCart, getCartNum } from '../../utils/api'
import { getStore, setStore, switchTab } from '../../utils/index'

Page({

  data: {
    detail: {},
    popupOption: false,
    popupAttr: false,
    popupTag: false,
    cartNum: 0
  },

  onLoad(payload){
    const id = payload.id
    getGoodsDetail(id).then(res=>{
      res.data.intro = res.data.intro.replace('<img ', '<img style="width:100%;" ')
      this.setData({
        detail: res.data,
        cartNum: getStore('cart')
      })
    })
  },

  toCart(){
    switchTab('/pages/cart/cart')
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

  onSubmit(ev){
    this.setData({
      popupOption: false
    })
    const { sku_id, num, type } = ev.detail
    const params = {
      sku_id,
      num
    }
    if(type == 'cart'){
      this.addCart(params)
    }
  },

  // api相关方法
  addCart(params){
    addCart(params).then(res=>{
      getCartNum().then(res=>{
        setStore('cart',res.data)
        this.setData({
          cartNum: res.data
        })
      })
    })
  }
})