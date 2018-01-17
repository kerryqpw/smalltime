// pages/wtfk/wtfk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagselect01:"color:#000",
    tagselect02:"color:#999",
    tagselect03: "color:#999",
    tagselect04: "color:#999",
    tagselect05: "color:#999",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单列表'
    });

    console.log(options.ordertype,"ordertype");

    if (options.ordertype==0){
        this.setData({
          tagselect01: "color:#999",
          tagselect02: "color:#000",
          tagselect03: "color:#999",
          tagselect04: "color:#999",
          tagselect05: "color:#999",
        })
    }


    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/order',//获取省列表
      data: {
        status: options.ordertype
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
          orderlist: res.data.data
        });


      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/order',//获取省列表
      data: {
        //  status: "1"
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
          orderlist: res.data.data
        });


      }
    })


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

  }
  ,
  productdetail:function(){

    wx.navigateTo({
      url: '../../comment/comment',
    })

  },
  toorderdetail:function(e){
    console.log(e);

    wx.navigateTo({
      url: '../../orderdetail/orderdetail?order_number=' + e.currentTarget.dataset.order_number + "&status=" + e.currentTarget.dataset.status,
    })
  },
  catchtag01:function(){

    this.setData({
      tagselect01: "color:#000",
      tagselect02: "color:#999",
      tagselect03: "color:#999",
      tagselect04: "color:#999",
      tagselect05: "color:#999",
    })


    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/order',//获取省列表
      data: {
        //  status: "1"
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
          orderlist: res.data.data
        });


      }
    })

    

  },
  catchtag02:function(){
    this.setData({
      tagselect01: "color:#999",
      tagselect02: "color:#000",
      tagselect03: "color:#999",
      tagselect04: "color:#999",
      tagselect05: "color:#999",
    })


    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/order',//获取省列表
      data: {
         status: "0"
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
          orderlist: res.data.data
        });

      

      }
    })

  },
  catchtag03:function(){
    this.setData({
      tagselect01: "color:#999",
      tagselect02: "color:#999",
      tagselect03: "color:#000",
      tagselect04: "color:#999",
      tagselect05: "color:#999",
    })


    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/order',//获取省列表
      data: {
         status: "1"
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
          orderlist: res.data.data
        });

      

      }
    })

  },
  catchtag04:function(){
    this.setData({
      tagselect01: "color:#999",
      tagselect02: "color:#999",
      tagselect03: "color:#999",
      tagselect04: "color:#000",
      tagselect05: "color:#999",
    })


    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/order',//获取省列表
      data: {
         status: "5"
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
          orderlist: res.data.data
        });

     

      }
    })


  },
  catchtag05:function(){
      this.setData({
        tagselect01: "color:#999",
        tagselect02: "color:#999",
        tagselect03: "color:#999",
        tagselect04: "color:#999",
        tagselect05: "color:#000",
      })


      var that = this;
      wx.request({
        // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
        url: getApp().globalData.netUrl + '/api/user/order',//获取省列表
        data: {
            status: "-1"
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
            orderlist: res.data.data
          });

   

        }
      })

  }
})