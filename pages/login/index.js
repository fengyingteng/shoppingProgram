//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    pwd:''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },
  handelUsername(e) {
    let user_value=e.detail.value;
    if(user_value) {
      this.setData({
        username: user_value
      })
    }
  },
  handelPwd(e) {
    let user_pwd = e.detail.value;
    console.log(user_pwd.length)
    if (user_pwd && user_pwd.length !== 0) {
      this.setData({
        pwd: user_pwd
      })
    } else {
      this.setData({
        pwd: ''
      })
    }
  },
  handleSubmit() {
    let _username = this.data.username;
    let _pwd = this.data.pwd;
    console.log('submit', _pwd)
    let reg = /^1\d{10}$/
    if (!_username) {
      wx.showToast({
        title: '请输入手机号码！',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (!reg.test(_username)) {
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!_pwd) {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    wx.showToast({
      title: '登录成功',
      icon:'none',
      duration:2000
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/home/index'
      })
    },1000)
  }
})
