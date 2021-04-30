export function toast(title, icon='success') {
  wx.showToast({
    title,
    icon
  })
}

export function setStore(key,value) {
  wx.setStorageSync(key, value)
}

export function getStore(key) { 
  return wx.getStorageSync(key)
}

export function redirectTo(url,flag=true) {
  if(flag){
    wx.navigateTo({url})
  }else{
    wx.redirectTo({url})
  }
}