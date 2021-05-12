
import { getAddress } from '../../utils/api'
import { setStore } from '../../utils/index'

Page({

  data: {
    addressList: []
  },
  onShow(){
    getAddress().then(res=>{
      this.setData({
        addressList: res.data
      })
    })
  },

  toOrderPage(ev){
    const { id } = ev.currentTarget.dataset
    const page = '/pages/addressEdit/addressEdit'
    const url = id ? `${page}?id=${id}` : page
    wx.navigateTo({url})
  },

  onSelect(ev){
    setStore('address', ev.currentTarget.dataset.address)
    wx.navigateBack()
  }

})