// components/Goods/Goods.js
Component({

  options: {
    multipleSlots: true
  },

  properties: {
    name: {
      type: String,
      value: ''
    },
    pic: {
      type: String,
      value: ''
    },
    price: {
      type: Number,
      optionalTypes:[String],
      value: 0
    }
  }
})
