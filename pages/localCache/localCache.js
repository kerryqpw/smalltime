// pages/localCache/localCache.js
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
  setLocalSession:function(){

    wx.setStorage({
      key: 'userinfo',
      data: 'fdgdfgfdg',
      success: function (res) {
        console.log('异步保存成功');
      },
      fail:function(){
        console.log('异步保存失败');
      }

    });

  },
  getLocalSession:function(){
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data);
      },
      fail:function(res){
        console.log("获取数据失败");
      }
    });

  },
  clearLocalSession:function(){
    wx.clearStorage();
    console.log('清空本地缓存');
  }
})