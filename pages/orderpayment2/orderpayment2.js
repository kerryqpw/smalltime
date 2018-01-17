// pages/orderpayment/orderpayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: [],
    goods_options: [],
    goods_total: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.totalordermoney);

    wx.setNavigationBarTitle({
      title: '订单详细'
    });

    console.log(options);
    console.log(JSON.parse(options.shoppinglist));

    var goods_idArray=new Array();
    var totalArray=new Array();
    var option_idArray=new Array();


    var shoppinglist = JSON.parse(options.shoppinglist);
    for (var i = 0; i < shoppinglist.length;i++){
      shoppinglist[i].total;
      goods_idArray.push(shoppinglist[i].goods_id);
      totalArray.push(shoppinglist[i].total);
      option_idArray.push(shoppinglist[i].option_id);

    }

    console.log(goods_idArray);
    console.log(totalArray);
    console.log(option_idArray);

    //去重数组
    // var arr = [...new Set(goods_idArray)]; //去重后:  [ 1, 2, 3, '0', '1', '2', '测试', '重复', NaN, false ]

    this.setData({
      totalordermoney: parseInt(options.totalordermoney),
      goods_id: goods_idArray,
      goods_options: option_idArray,
      goods_total: totalArray,
      shoppinglist: shoppinglist 
    })

    console.log(this.data.goods_id);
    console.log(this.data.goods_options);
    console.log(this.data.goods_total);

    console.log("sdad"+this.data.addressid);

    //生产订单
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/order/settlement',
      data: {
        goods_id: this.data.goods_id,
        goods_option: this.data.goods_options,
        goods_total: this.data.goods_total,
        address_id: this.data.addressid,
        pay_type:"wx"
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

        that.setData({
          totalprice: res.data.data.order.price,
          carriage: res.data.data.order.dispatch_price,
          favorable_price: res.data.data.order.favorable_price,
          goodsList: res.data.data.goods,
 summationmoney: parseInt(that.data.totalordermoney) + parseInt(res.data.data.order.dispatch_price)
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
  onShow: function (options) {
 
    //获取地址列表
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/address',
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
        

        console.log(res,",获取地址列表");

        if (res.data.data.length==0){
          //跳转到新增地址页面新增地址
          wx.navigateTo({
            url: '../personalPage/addressmanager/addAddress/addAddress',
          })
        }else{
          that.setData({
            addressid: res.data.data[0].id,
            consignee: res.data.data[0].user_name,
            tel_number: res.data.data[0].tel_number,
            province_name: res.data.data[0].province_name,
            city_name: res.data.data[0].city_name,
            county_name: res.data.data[0].county_name,
            detail_info: res.data.data[0].detail_info
          })
        } 

       

     
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
  topaysuccess:function(){

 


    //生产订单
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/order/save',
      data: {
        goods_id: this.data.goods_id,
        goods_option: this.data.goods_options,
        goods_total: this.data.goods_total,
        address_id: this.data.addressid,
        pay_type: "wx"
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

        // that.setData({
        //   totalprice: res.data.data.order.price,
        //   carriage: res.data.data.order.dispatch_price,
        //   favorable_price: res.data.data.order.favorable_price,
        //   goodsList: res.data.data.goods

        // })

        wx.navigateTo({
          url: '../paysuccess/paysuccess',
        })
     

      }
    })

   
  },
  toeditAddressInfo:function(){
    wx.navigateTo({
      url: '../personalPage/addressmanager/addressmanager',
    })
  }

})