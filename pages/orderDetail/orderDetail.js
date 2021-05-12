
import { getOrderDetail } from '../../utils/api'
import { orderStatus } from '../../utils/config'

Page({

  data: {
    orderStatus,
    active: 1,
    order: {},
    steps: [
      { text: '订单创建' },
      { text: '订单支付'  },
      { text: '卖家发货' },
      { text: '买家收货' }
    ]
  },

  onLoad({id}){
    this.getOrder(id)
  },

  setSteps(){
    let active = 0
    switch (this.data.order.order_status) {
      case '0':
        active = 0
        break;
      case '1':
        active = 1
        break;
      case '2':
        active = 2
        break;
      case '3':
        active = 3
        break;
      case '4':
        active = 4
        break;
      default:
        active = 0
        break;
    }
    this.setData({active})
  },

  /*
  **  api
  */
  getOrder(id){
    getOrderDetail(id).then(res=>{
      this.setData({
        order: res.data
      })
      this.setSteps()
    })
  }

})