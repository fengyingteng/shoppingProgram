// pages/tihuo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kuang_list: [],
    showTab: true,
    kuang_total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '采购收货'
    })
    this.handleTotalCount()
  },

  handleTotalCount() {
    let items = this.data.kuang_list;
    let total = items.reduce((prev, item) => {
      return prev + item.count
    }, 0)
    this.setData({
      kuang_total: total
    })
  },
  handleDelete(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    console.log(id)
    let new_list = this.data.kuang_list.filter((item) => {
      return item.id != id;
    })
    this.setData({
      kuang_list: new_list
    })
    this.handleTotalCount()
  },
  handleScanCode() {
      let items = this.data.kuang_list;
      var that = this;
      let id;
      let id_arr = items.map((item) => {
        return item.id;
      })
      let max_id = Math.max.apply(Math, id_arr)
      wx.scanCode({
        onlyFromCamera:true,
        scanType:['barCode', 'qrCode'],
        success:res => {
          if (res && res.result) {
            let index = items.findIndex((item) => {
              return item.kuang_num == res.result
            })
            if (index > -1) {
              items[index].count = items[index].count + 1;
            } else {
              var obj = {
                kuang_num: res.result,
                count: 1,
                id: max_id + 1
              }
              items.push(obj)
              console.log(items)
            }
            that.setData({
              kuang_list: items
            })
          }
            that.handleScanCode()
        }
      })
      this.handleTotalCount()
  },
  handleTiHuoScan() {
    this.handleScanCode()
  },
  handleConfirmSubmit() {

  },
})