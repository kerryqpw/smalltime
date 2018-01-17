// pages/ssuo/ssuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取标签列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/goodstag',
      data: {

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
          goodstagList: res.data.data
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
  toproductlist:function(){
    wx.navigateTo({
      url: '../productlist/productlist',
    })
  },
  search:function(e){
    console.log(this.data.tagname);

    //搜索关键字验证
    if (this.data.tagname == undefined || this.data.tagname==""){
      wx.showToast({
        title: '搜索条件为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    wx.navigateTo({
      url: '../productlist/productlist?tagname=' + this.data.tagname,
    })
  },
  searchtag:function(e){
    console.log(e);
    var tagname = e.currentTarget.dataset.tagname; 
    console.log(tagname);
    wx.navigateTo({
      url: '../productlist/productlist?tagname=' + tagname,
    })

  },
  newphoneinput:function(e){
    console.log(e.detail.value);
    this.setData({
      tagname: e.detail.value,
    });
  }

})