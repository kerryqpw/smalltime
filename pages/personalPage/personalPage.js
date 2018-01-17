// pages/personalPage/personalPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    });

    var that=this;
    wx.getUserInfo({
      success: function (res) {

        console.log(res.userInfo.nickName);
        console.log(res.userInfo.avatarUrl);

        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
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
  wallet:function(){
    wx.navigateTo({
      url: 'mywallet/mywallet',
    })
  },
  IWillfeedback:function(){
    console.log("IWillfeedback");
    wx.navigateTo({
      url: 'IWillIfeedback/IWillfeedback',
    })
  },
  mydiscount:function(){
    console.log("mydiscount");
    wx.navigateTo({
      url: 'mydiscount/mydiscount',
    })
  },
  addressmanager:function(){
    wx.navigateTo({
      url: 'addressmanager/addressmanager',
    })
  },
  shoppingCat:function(){
    //  wx.switchTab({
    //    url: 'shoppingCat/shoppingCat',
    //  })
    wx.navigateTo({
     url: '../shoppingCat/shoppingCat'
    })
    // ({
    //   url: 'shoppingCat/shoppingCat',
    // })
  },
  personalsetting:function(){
    wx.navigateTo({
      url: 'personalInfo/personalInfo',
    })
  },
  myOrder:function(){
    wx.navigateTo({
      url: 'myOrder/myOrder',
    })
  },
  balaace:function(){


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/order/addBalance',
      data: {

      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {

        console.log(res);
        // console.log(res.data.data.balance);


       

      }
    })


    
  }
})