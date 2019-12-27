// pages/home/index.js
Page({

  data: {
    username: 'king',
    storename:'亚洲一号仓库',
    today_count: 18000,
    yesterday_count: 25800,
    info_list: [
      { name: '待采购数量', count: '18000' },
      { name: '待验货数量', count: '22000' },
      { name: '待打包数量', count: '15700' },
      { name: '代发货数量', count: '15464' },
      { name: '已采购数量', count: '61874'},
      { name: '已验货数量', count: '183600' },
      { name: '已打包数量', count: '564144' },
      { name: '已发货数量', count: '2614411' },
      { name: '已签收数量', count: '2617415' },
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let store_name = wx.getStorageSync('store_name')
    if (store_name) {
      this.setData({
        storename: store_name
      })
    }
    wx.setNavigationBarTitle({
      title: '主页',
    })
  },
  changeStore() {
    wx.navigateTo({
      url: '/pages/store/index',
    })
  }
})