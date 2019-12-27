// pages/shouhuo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    border_num: '',
    order_list: [],
    total_count: 0,
    showList: true,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '采购收货',
    })
    this.handleSum()
  },
  handleSum() {
    let items = this.data.order_list;
    let sum = items.reduce((prev,item) => {
      return prev + item.count
    }, 0)
    this.setData({
      total_count: sum
    })
  },
  handleDelete(e) {
    let order_list = this.data.order_list;
    let _item = e.currentTarget.dataset.item;
    let _order_list = order_list.filter((item) => {
      return item.id !== _item.id;
    }) 
    this.setData({
      order_list: _order_list
    })
    this.handleSum()
  },
  // 收货箱号扫描
  handleScanBox() {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: (res) => {
        if (res && res.result) {
          that.setData({
            border_num: res.result
          })
          wx.showToast({
            title: '扫码成功',
            icon:'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '扫码失败,请重新扫码',
            icon:'none',
            duration:1000
          })
        }
      }
    })
  },
  //收货扫码
  handleShouHuo() {
    this.handleScanCode()
  },

  handleScanCode() {
    let _order_list = this.data.order_list;
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: res => {
        let id_arr = _order_list.map((item) => {
          return item.id;
        })
        if (res && res.result) {
           let index = _order_list.findIndex((item) =>{
             return item.logistics_num == res.result;
           })

          console.log(index)
           if (index > -1) {
             _order_list[index].count = _order_list[index].count + 1;
             that.setData({
               order_list: _order_list,
             })
           } else {
             
             var max_id = Math.max.apply(Math, id_arr)
             var obj = {
                logistics_num: res.result,
                count: 1,
                id: max_id + 1
             }
             _order_list.push(obj)
             that.setData({
               order_list: _order_list
             })
           }
        }
        that.handleSum()
        that.handleScanCode()
      }
    })
  },
  handleConfirmSumbit() {
    let _order_list = this.data.order_list;
    if (_order_list && _order_list.length > 0) {
      wx.request({
        url: '',
      })
    } else {
      wx.showToast({
        title: '请先收货扫码后提交！',
        icon: 'none',
        duration: 1000
      })
    }
  }
})