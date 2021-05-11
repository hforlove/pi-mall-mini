import { sendSmsCode, register, login } from '../../utils/api'
import * as T from '../../utils/index'

Page({
  data: {
    active: 'login',
    nickname: '',
    mobile: "",
    password: '',
    code:''
  },


  onChange(data) {
    console.log(data);
  },
  onSendCode(){
    if(!this.data.mobile){
      T.toast('请输入手机号','error')
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
        T.toast('注册成功')
        this.setData({
          mobile: '',
          password: '',
          active: 'login'
        })
      })
    }else{
      T.toast('请输入完整资料','error')
    }
  },
  onLogin(){
    const { mobile, password } = this.data
    login({ mobile, password }).then(res=>{
      T.toast('登陆成功')
      T.setStore('token', res.data.access_token)
      T.switchTab('/pages/index/index',false)
    })
  }
})