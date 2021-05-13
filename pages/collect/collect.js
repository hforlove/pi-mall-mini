
import { getCollection, deleteCollect } from '../../utils/api'

Page({

  data: {
    collectList: [],
    nextPage: true,
    page: 1
  },

  onLoad(){
    this.getCollect()
  },

  onReachBottom(){
    const { page, nextPage } = this.data
    if(!nextPage) return
    this.setData({
      page: page+1
    })
    this.getCollect()
  },

  toGoods(ev){
    const { id } = ev.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?id=${id}`,
    })
  },

  onDelete(ev){
    const { id } = ev.currentTarget.dataset
    this.deleteCollect(id)
  },

  /*
  **  api
  */
  getCollect(){
    const { collectList, page } = this.data
    getCollection({page}).then(res=>{
      this.setData({
        collectList: [...collectList, ...res.data]
      })
      if(res.data.length<10){
        this.setData({
          nextPage: false,
        })
      }
    })
  },
  deleteCollect(id){
    deleteCollect(id).then(res=>{
      const { collectList } = this.data
      const index = collectList.findIndex(item=>item.id == id)
      collectList.splice(index,1)
      this.setData({collectList})
    })
  }

})