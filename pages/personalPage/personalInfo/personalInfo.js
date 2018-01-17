// pages/personalPage/personalInfo/personalInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    mobile:"",
    user_nickname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '用户设置'
    });

    console.log(getApp().globalData.userInfo);

    //获取微信用户信息
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

    //获取登录的用户信息
    console.log(getApp().globalData.mobile);

    console.log("user_nickname:"+getApp().globalData.user_nickname);

    this.setData({
      mobile: getApp().globalData.mobile,
      user_nickname: getApp().globalData.user_nickname
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
  goBack:function(){
    wx.navigateBack({
      
    });
  }
  ,
  bindphone:function(e){
    console.log("this.data.mobile:" + this.data.mobile);
    if (this.data.mobile == ""){
      wx.navigateTo({
        url: 'bindphone/bindphone',
      })
    }else{
      wx.navigateTo({
        url: 'bindphone/updatephone/updatephone?mobile=' + this.data.mobile,
      })
    }
    
  },
  takeheadImage:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        var tempFilePaths = res.tempFilePaths

      }
    })
  },
  updatephone:function(){
    wx.navigateTo({
      url: 'bindphone/updatephone/updatephone',
    })
  },
  name:function(){
    wx.navigateTo({
      url: 'updatename/updatename',
    })
  }
})