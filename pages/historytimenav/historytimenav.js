// pages/wtfk/wtfk.js
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
      title: '话题'
    });


    var that = this;

    console.log(that.data.urlArray);

    //非遗列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/portal/lists/getCategoryPostLists',
      data: {
        category_id: '18',
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


        // chuanchenglist
        that.setData({
          huatilist: res.data.data.list
        })


      }
    })


    // var that = this;

    console.log(that.data.urlArray);

    //年代列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/portal/lists/getCategoryPostLists',
      data: {
        category_id: '12',


      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res.data.data);


        // chuanchenglist
        that.setData({
          historytimelist: res.data.data.list
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
  huatixiangqing01: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../huatixiangqing01/huatixiangqing01?commentid=' + e.currentTarget.dataset.id,
    })
  },
  toproductdetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold?id=' + e.currentTarget.dataset.id,
    })
  },
  tocontentdetail: function (e) {
    console.log(e);

    wx.navigateTo({
      url: '../inheritdetail/inheritdetail?id' + e.currentTarget.dataset.id,
    })
  },
  tohuatidetail: function () {
    wx.navigateTo({
      url: '../huatixiangqing03/huatixiangqing03?commentid=' + this.data.huatilist[0].id,
    })
  },
  tohuatilist: function () {
    wx.navigateTo({
      url: '../huatilist/huatilist',
    })
  }


})