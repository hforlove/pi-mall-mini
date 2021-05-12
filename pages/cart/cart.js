
import { getStore, toast } from '../../utils/index'
import { getCart, updateCart, deleteCart } from '../../utils/api'
 
Page({
  data: {
    allCheck: false,
    cartList: [],
    price: 0
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'cart',
        cart: getStore('cart')
      })
    }
    this.getCart()
  },
  
  onAllCheckChange(ev){ // 全选
    const data= this.data.cartList
    data.map(item=>item.checked = ev.detail)
    this.setData({
      allCheck: ev.detail,
      cartList: data
    })
    this.setPrice(data)
  },
  onCheckChange(ev){  // 勾选某个
    const { item } = ev.currentTarget.dataset
    const {data, index} = this.getCurIndex(item)
    data[index].checked = !data[index].checked
    this.setData({
      cartList: data,
      allCheck: !data.find(item=>!item.checked)
    })
    this.setPrice(data)
  },
  onCountChange(ev){  // 数量加减
    const { item } = ev.currentTarget.dataset
    this.updateCart(item,ev.detail)
  },
  onDelete(ev){
    const { item } = ev.currentTarget.dataset
    this.deleteCart(item)
  },
  onSubmit(){
    const ids = this.data.cartList.filter(item=>item.checked).map(item=>item.id)
    wx.navigateTo({
      url: '/pages/orderCreate/orderCreate?type=cart&ids='+ids.join(',')
    })
  },

  getCurIndex(cart){  // 获取操作的一行的索引
    const data = this.data.cartList
    const index = data.findIndex(item=>item.id == cart.id)
    return {
      data, index
    }
  },
  setPrice(data){ // 设置总价
    const checks = data.filter(item=>item.checked)
    const price = checks.reduce((prev, cur) => {
      return prev + cur.number * cur.price * 100
    }, 0)
    this.setData({
      price
    })
  },

  // api相关方法
  getCart(){  // 获取购物车列表
    getCart().then(res=>{
      res.data.map(item=>{
        item.checked = true
      })
      this.setPrice(res.data)
      this.setData({
        cartList: res.data,
        allCheck: res.data.length > 0
      })
    })
  },
  updateCart(cart,num){ // 更新购物车数量
    const params = {
      sku_id: cart.sku_id,
      num
    }
    updateCart(params).then(res=>{
      
    }).catch(_=>{
      const { data, index } = this.getCurIndex(cart)
      data[index].number = data[index].number-1
      this.setData({
        cartList: data,
      })
    })
  },
  deleteCart(cart){
    const params = {
      sku_ids: `[${cart.sku_id}]`
    }
    deleteCart(params).then(res=>{
      const { data, index} = this.getCurIndex(cart)
      data.splice(index,1)
      this.setPrice(data)
      this.setData({
        cartList: data
      })
    })
  }
})