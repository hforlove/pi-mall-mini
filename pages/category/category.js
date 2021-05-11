import { getCategory } from '../../utils/api'
import { redirectTo, getStore } from '../../utils/index'

Page({
  data: {
    active: 0,
    parentList: [],
    childList: []
  },
  onLoad() {
    getCategory().then(res=>{
      this.sourceData = res.data
      const parentList = res.data.map(item=>{
        return {
          id: item.id,
          cover: item.cover,
          title: item.title
        }
      })
      this.setData({
        parentList,
        childList: res.data[0].child
      })
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'category',
        cart: getStore('cart') || 0
      })
    }
  },
  onRedirect(ev){
    const { id } = ev.currentTarget.dataset
    redirectTo(`/pages/goodsList/goodsList?id=${id}`)
  },

  changeCate(ev){
    const { active } = ev.currentTarget.dataset
    console.log(active);
    this.setData({
      active,
      childList: this.sourceData[active].child
    })
  },
})