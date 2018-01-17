// pages/productlist/productlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.setNavigationBarTitle({
      title: '商品列表'
    });
    console.log(options.tagname);

    //获取商品列表
    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/goods/search',
      data: {
        keyword: options.tagname
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      
      success: function (res) {
        // that.setData({
        //   ajaxdata: res.data.list
        // })
        console.log(res.data.data);
        that.setData({
          shopList: res.data.data
        });
     
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
  tobuydetail:function(e){
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold?id=' + "27",

    })
  }
})