
import { host } from './config'
import { getStore } from './index'

function request (config){
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${host}/api/tiny-shop/v1${config.url}`,
      data: config.data,
      method: config.method|| 'get',
      header: {
        'x-api-key': getStore('token')
      },
      success: (res) => {
        if(res.data.code == 401){
          wx.showToast({
            title: res.data.message,
            icon: 'error'
          })
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }else if(res.data.code == 200){
          reslove(res.data)
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'error'
          })
          reject(res.data.message)
        }
      },
      fail: (err) => {
        reject(err)
      }
    });
      
  })
}

export default request