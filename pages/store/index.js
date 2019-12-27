// pages/store/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_list: [
     { name: '马桥仓',index:0},
     { name:'亚洲一号仓', index: 1},
     { name:'测试仓', index:2}
    ],
    selected_index: 0
  },
  handleSelect(e) {
    let item = e.target.dataset.item;
    this.setData({
      selected_index:item.index
    })
    wx.setStorage({
      key: 'store_name',
      data: item.name,
    })

    wx.setStorage({
      key: 'selected_index',
      data: item.index,
    })

    wx.navigateTo({
      url: '/pages/home/index',
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择仓库'
    })

    let selected_index = wx.getStorageSync('selected_index')
    this.setData({
      selected_index
    })
  }
})