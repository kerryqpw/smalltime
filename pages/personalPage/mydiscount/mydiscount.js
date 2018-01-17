// pages/personalPage/mydiscount/mydiscount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag01class:"tagselected",
    tag02class: "tagnoselected",
    tag03class: "tagnoselected",
    tag01List:0,
    tag02List:1,
    tag03List:2,
    couponList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的优惠券'
    });


    //获取我的未使用的优惠券
    //获取地址列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/coupon',
      data: {
          status:"1"
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
          count1: res.data.data.length
        });

      }
    })


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/coupon',
      data: {
        status: "2"
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
          count2: res.data.data.length
        });

      }
    })



    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/coupon',
      data: {
        status: "3"
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
          count3: res.data.data.length
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
  clicktag01:function(){
     this.setData({
       tag01class: "tagselected",
       tag02class: "tagnoselected",
       tag03class: "tagnoselected"
     });


     //获取我的未使用的优惠券
     //获取地址列表
     var that = this;


     wx.request({
       // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
       url: getApp().globalData.netUrl + '/api/user/coupon',
       data: {
          status:"1"
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
         that.setData({
           couponList: res.data.data
         });

       }
     })
  },
  clicktag02: function () {
    this.setData({
      tag01class: "tagnoselected",
      tag02class: "tagselected",
      tag03class: "tagnoselected"
    });

    //获取我的未使用的优惠券
    //获取地址列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/coupon',
      data: {
        status: "2"
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
        that.setData({
          couponList: res.data.data
        });

      }
    })

  },
  clicktag03: function () {
    this.setData({
      tag01class: "tagnoselected",
      tag02class: "tagnoselected",
      tag03class: "tagselected"
    });


    //获取我的未使用的优惠券
    //获取地址列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/coupon',
      data: {
        status: "3"
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
        that.setData({
          couponList: res.data.data
        });

      }
    })

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  goBack:function(){
     wx.navigateBack({
       
     })
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
})