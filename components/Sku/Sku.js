
import * as T from '../../utils/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sku: {
      type: Object,
      value: {}
    }
  },
  data: {
    pic: '',
    price: '',
    stock: '',
    attrs: [],
    num: 1,
    selectText: ''
  },
  observers: {
    'sku': function(sku){
      if(Object.keys(sku).length<1) return
      this.setData({
        pic: sku.picture,
        price: sku.price,
        stock: sku.stock,
        attrs: sku.base_attribute_format,
      })
      if(this.data.attrs.length){
        this.skuList = sku.sku
        this.selected = new Array(this.data.attrs.length)
        this.selected.fill('')
      }else{
        this.sku_id = sku.sku[0].id
      }
    }
  },
  methods: {
    onClose(){
      this.triggerEvent('onClose')
    },
    onChangeNum(ev){
      this.setData({
        num: ev.detail
      })
    },
    onSubmit(ev){
      if(!this.data.selectText && this.data.attrs.length){
        T.toast('请选择商品规格','error')
        return
      }
      const { type } = ev.currentTarget.dataset
      this.triggerEvent('onSubmit',{type,sku_id: this.sku_id, num: this.data.num})
    },
    onSelectOption(ev){
      const { parent, child, item } = ev.currentTarget.dataset
      if(item.disabled||item.active) return
      this.selected[parent] = item.base_spec_value_id
      const data = JSON.parse(JSON.stringify(this.data.attrs))
      data[parent].value.map(item=>item.active = false)
      data[parent].value[child].active = true
      data[parent].active = true
      // 上面设置选择状态
      // 下面设置哪些需要禁用的
      this.setOptionStatus(parent,data)
      this.setSelectText()
    },
    setOptionStatus(parent,data){
      const temp = []
      this.skuList.forEach(item=>{
        temp.push(item.data.split('-'))
      })

      data.forEach((item,index)=>{
        if(index!=parent){
          let inList = temp
          this.selected.forEach((s,i)=>{
            if(s&&i!=index) inList=inList.filter(l=>l[i] == s)
          })
          item.value.forEach(child=>{
            const cid = child.base_spec_value_id
            const t = inList.map(item=>item[index])
            child.disabled = !t.includes(cid) 
          })
        }
      })
      this.setData({
        attrs: data
      })
    },
    setSelectText(){
      const ok = this.selected.filter(item=>!item).length
      if(ok == 0){
        const str = this.selected.join('-')
        const cur = this.skuList.find(item=>item.data == str)
        this.sku_id = cur.id
        this.setData({
          selectText: cur.name,
          stock: cur.stock,
          price: cur.price
        })
      }
    }
  }
})
