// pages/fadeInFadeOut/fadeInFadeOut.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    checkCodeBtnOpacity:1,
    checkCodeOpacity:0,
    animationData:{}
  },
  //生成验证码事件
  bindGetCheckCode:function(){
    var animation=wx.createAnimation({
      transformOrigin:"50% 50%",
      duration:1000,
      trmingFunction:"ease-in",
      delay:0
    });

    animation.opacity(1).translateY(-200).step();

    this.setData({
      checkCodeBtnOpacity:0,
      animationData:animation.export()
    });
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload");
    var that=this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(
      function(userinfo){
        //更新数据
        that.setData({
          userInfo:userinfo
        })
      }
    );

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
  
  }
})