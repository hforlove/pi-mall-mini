import { areaList } from '../../utils/area'
import { toast } from '../../utils/index'
import { createAddress, updateAddress, deleteAddress, getAddressDetail } from '../../utils/api'

const { province_list, city_list, county_list} = areaList

Page({

  data: {
    id: '',
    areaList,
    areaShow: false,
    area: '',
    realname: '',
    mobile: '',
    address_details: '',
    province_id: '',
    city_id: '',
    area_id: '',
    is_default: false
  },

  onLoad({id}){
    if(id){
      this.setData({id})
      this.getAddress()
    }
  },

  onChange(ev){
    this.setData({
      is_default: ev.detail.value
    })
  },

  onPopupClose(){
    this.setData({
      areaShow: false
    })
  },
  onPopupShow(){
    this.setData({
      areaShow: true
    })
  },

  onSelectArea(ev){
    const area = ev.detail.values
    this.setData({
      province_id: area[0].code,
      city_id: area[1].code,
      area_id: area[2].code,
      area: area.map(item=>item.name).join(' '),
      areaShow: false
    })
  },

  onSave(){
    const { realname, mobile, address_details, province_id, city_id, area_id, is_default, area } = this.data
    if( realname && mobile && address_details && area ){
      const params = { realname, mobile, address_details, province_id, city_id, area_id, is_default }
      this.saveAddress(params)
    }else{
      toast('请输入完整资料','error')
    }
  },
  onDelete(){
    deleteAddress(this.data.id).then(res=>{
      wx.navigateBack()
    })
  },

  /*
  **  api相关方法
  */
  getAddress(){
    getAddressDetail(this.data.id).then(res=>{
      const { realname, mobile, address_details,
              province_id, city_id, area_id, is_default } = res.data
      const area = province_list[province_id] + ' ' + city_list[city_id] + ' ' + county_list[area_id]
      this.setData({
        realname,
        mobile,
        address_details,
        province_id, city_id,
        area_id,
        is_default,
        area
      })
    })
  },
  saveAddress(params){
    params.is_default *= params.is_default
    if(this.data.id){
      params.id = this.data.id*1
      console.log(params);
      updateAddress(params).then(res=>{
        wx.navigateBack()
      })
    }else{
      createAddress(params).then(res=>{
        wx.navigateBack()
      })
    }
  }
})