
import { getOrder, deleteOrder, closeOrder, deliveryOrder } from '../../utils/api'
import { orderStatus } from '../../utils/config'

Page({

  data: {
    state: '-1',
    orderList: [],
    orderStatus,
    page: 1,
    nextPage: true,
  },

  onLoad({state}){
    if(state){
      this.setData({
        state
      })
    }else{
      this.getOrder()
    }
  },

  onReachBottom(){
    console.log('loadmore');
    if(!this.data.nextPage) return
    this.setData({
      page: this.data.page + 1
    })
    this.getOrder()
  },

  toOrderPage(ev){
    const { id } = ev.target.dataset
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?id=${id}`,
    })
  },

  onChange(ev){
    console.log('change');
    this.setData({
      state: ev.detail.name
    })
    this.resetParams()
    this.getOrder()
  },
  resetParams(){
    this.setData({
      orderList: [],
      page: 1,
      nextPage: true
    })
  },

  onDelete(ev){
    const { id } = ev.target.dataset
    this.deleteOrder(id)
  },
  onReceive(ev){
    const { id } = ev.target.dataset
    this.deliveryOrder(id)
  },
  onCancel(ev){
    const { id } = ev.target.dataset
    this.closeOrder(id)
  },
  onPay(ev){
    const { id } = ev.target.dataset
    wx.navigateTo({
      url: `/pages/pay/pay?id=${id}`,
    })
  },

  /*
  **  api相关
  */
  getOrder(){
    console.log('data');
    const { page, state } = this.data
    const params = {
      synthesize_status: state > -1 ? state : '',
      page
    }
    getOrder(params).then(res=>{
      this.setData({
        orderList: [...this.data.orderList, ...res.data]
      })
      if(res.data.length < 10){
        this.setData({
          nextPage: false
        })
      }
    })
  },
  deleteOrder(id){
    deleteOrder(id).then(res=>{
      const orderList = this.data.orderList
      const index = orderList.findIndex(item=>item.id == id)
      orderList.splice(index,1)
      this.setData({orderList})
    })
  },
  deliveryOrder(id){
    deliveryOrder(id).then(res=>{
      const orderList = this.data.orderList
      const index = orderList.findIndex(item=>item.id == id)
      orderList[index].order_status = 3
      this.setData({orderList})
    })
  },
  closeOrder(id){
    closeOrder(id).then(res=>{
      const orderList = this.data.orderList
      const index = orderList.findIndex(item=>item.id == id)
      orderList[index].order_status = 4
      this.setData({orderList})
    })
  }
})