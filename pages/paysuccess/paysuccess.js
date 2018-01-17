// pages/paysuccess/paysuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购买成功'
    });

    //推荐商品
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/random',
      data: {
        // goods_id: this.data.goods_id,
        // goods_option: this.data.goods_options,
        // goods_total: this.data.goods_total,
        // address_id: this.data.addressid,
        // pay_type: "wx"
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {

        console.log(res);

        that.setData({
          recommendImg: res.data.data.thumb,
          goods_name: res.data.data.goods_name,
          desc: res.data.data.desc.substring(0, 10) + "...",
          comment: res.data.data.comment || '',
          recommendproductid:res.data.data.id
        })


      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toproductdetail:function(){
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold',
    })
  },
  tomyOrder:function(){
    wx.navigateTo({
      url: '../personalPage/myOrder/myOrder',
    })
  },
  toproductdetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold?id=' + e.currentTarget.dataset.id
    })

  }
})