// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageHeight: (wx.getSystemInfoSync().windowWidth)*0.42+'px',
    classfytwoListoneshow:"none",
    animationData: {},
    couponList:null,
    currentid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    



    wx.setNavigationBarTitle({
      title: '分类'
    });


    

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


    
    //获取地址列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/goods',
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

        // that.setData({
        //   ajaxdata: res.data.list
        // })


        console.log(res.data.data);
        that.setData({
          couponList: res.data.data
        });

   

      }
    })





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
  clickclassfy:function(){

  },
  onShareAppMessage: function () {
  
  },
  search:function(){
    wx.navigateTo({
      url: '../ssou/ssou',
    })
  },
  toproductdetail:function(e){
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold?id=' + id,
    })
  },

  clickclassfy:function(e){

    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    console.log(e);

    //点击自身隐藏
    if (id == this.data.currentid){
      this.setData({
        currentid: "dsf"
      })
    }else{
      this.setData({
        currentid: id
      })
    }
   
  
  }
})