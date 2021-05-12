
import { getOrderPreview, createOrder, getCartNum } from '../../utils/api'
import { getStore, setStore, removeStore, toast } from '../../utils/index'

Page({
  data: {
    address: {},
    orderList: [],
    totalPrice: 0
  },

  onLoad({type,ids,num}){
    this.urlPrams = {
      type,
      ids,
      num
    }
    this.getOrder()
  },
  onShow(){
    const address = getStore('address')
    if(address){
      this.setData({address})
      removeStore('address')
    }
  },

  toOrderPage(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },

  onSubmit(){
    if(!this.data.address.id){
      toast('请选择收货地址','error')
      return
    }
    this.createOrder()
  },
  
  /*
  **  api
  */
  createOrder(){
    const { type, ids, num } = this.urlPrams
    const params = {
      address_id: this.data.address.id,
      buyer_message: '',
      data: num ? `{"sku_id":${ids},"num":${num}}` : ids,
      shipping_type: 1,
      type
    }
    createOrder(params).then(res=>{
      getCartNum().then(res=>{
        setStore('cart',res.data)
      })
      wx.redirectTo({
        url: `/pages/pay/pay?id=${res.data.id}`
      })
    })
  },
  getOrder(){
    const { type, ids, num } = this.urlPrams
    const params = {
      type,
      data: num ? `{"sku_id":${ids},"num":${num}}` : ids
    }
    getOrderPreview(params).then(res=>{
      const totalPrice = res.data.products.reduce((prev,cur) => prev + cur.num * cur.price * 100, 0)
      this.setData({
        totalPrice,
        orderList: res.data.products,
        address: res.data.address || {}
      })
    })
  }
})