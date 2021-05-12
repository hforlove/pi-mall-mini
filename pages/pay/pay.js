
import { getOrderByPay, payOrder } from '../../utils/api'
import { toast } from '../../utils/index'

Page({

  data: {
    payType: 5,
    pay_money: 0,
    payInfo: {}
  },

  onLoad({id}){
    this.id = id
    this.getOrder(id)
  },

  onSwitch(ev){
    this.setData({
      payType: ev.target.dataset.name
    })
  },

  onSubmit(){
    if(this.data.payType == 1 ){
      toast('暂不支持','error')
      return
    }
    const params = {
      data: `{"order_id": ${this.id}}`,
      order_group: 'order',
      pay_type: this.data.payType,
      trade_type: 'js'
    }
    this.payOrder(params)
  },

  /*
  **  api相关方法
  */
  getOrder(id){
    getOrderByPay({simplify:1, id}).then(res=>{
      this.setData({
        pay_money: res.data.pay_money,
        payInfo: res.data
      })
    })
  },
  payOrder(params){
    payOrder(params).then(res=>{
      toast('支付成功')
      setTimeout(_=>{
        wx.switchTab({
          url: '/pages/profile/profile',
        })
      },2000)
    })
  }

})