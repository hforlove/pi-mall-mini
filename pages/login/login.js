import { sendSmsCode, register, login } from '../../utils/api'
import { setStore, toast } from '../../utils/index'

Page({
  data: {
    active: 'login',
    nickname: '',
    mobile: "13128542661",
    password: '123123',
    code:''
  },


  onChange(data) {
    console.log(data);
  },
  onSendCode(){
    if(!this.data.mobile){
      toast('请输入手机号','error')
      return
    }
    sendSmsCode(this.data.mobile).then(res=>{
      this.setData({
        code: res.data
      })
    })
  },
  onRegister(){
    const { mobile, code, password, nickname } = this.data
    if(mobile && code && password && nickname){
      register({mobile, code, password, nickname}).then(res=>{
        toast('注册成功')
        this.setData({
          mobile: '',
          password: '',
          active: 'login'
        })
      })
    }else{
      toast('请输入完整资料','error')
    }
  },
  onLogin(){
    const { mobile, password } = this.data
    login({ mobile, password }).then(res=>{
      toast('登陆成功')
      setStore('token', res.data.access_token)
      setStore('cart', res.data.member.cart_num)
      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  }
})