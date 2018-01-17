// pages/orderdetail/orderdetail.js
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
    console.log(options.order_number);

    if (options.status==0){
        this.setData({
          orderstatutext:"等待付款"
        })
    } else if (options.status==1){
        this.setData({
          orderstatutext: "已付款"
        })
    }else{
      this.setData({
        orderstatutext: "等待付款"
      })
    }


    //生产订单
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/orderinfo',
      data: {
        order_number: options.order_number,
        
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
          consignee: res.data.data.express.consignee,
          consignee_contact: res.data.data.express.consignee_contact,
          consignee_address: res.data.data.express.consignee_address,
          goodsList:res.data.data.goods,
          order_number: res.data.data.order_number,
          create_time: toDate(res.data.data.create_time),
          goods_price: res.data.data.goods_price,
          dispatch_price: res.data.data.dispatch_price,
          favorable_price: res.data.data.favorable_price,
          

        })

        function toDate(number) {
          var n = number * 1000;
          var date = new Date(n);
          var Y = date.getFullYear() + '/';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          return (Y + M + D)
        } 

        var totalmoney=0;
        for (var i = 0; i < that.data.goodsList.length;i++){
          totalmoney = parseFloat(totalmoney) +  parseFloat((that.data.goodsList[i].market_price))
        } 

        console.log(totalmoney,"totalmoney");
        that.setData({
          totalmoney:totalmoney
        })


      }
    })


    //推荐商品
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/random',
      data: {
        // goods_id: this.data.goods_id,
        // goods_option: this.data.goods_options,
        // goods_total: this.data.goods_total,
        // address_id: this.data.addressid,
        // pay_type: "wx"
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
          recommendImg: res.data.data.thumb,
          goods_name: res.data.data.goods_name,
          desc: res.data.data.desc,
          comment: res.data.data.comment || '',
          recommendproductid:res.data.data.id
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
  procomment:function(e){
    console.log(e);

    wx.navigateTo({
      url: '../comment/comment?id=' + e.currentTarget.dataset.goods_id +"&table_name=goods",
    })
  },
  productdetail:function(){

    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold',
    })

  },
  toproductdetail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold?id=' + e.currentTarget.dataset.id
    })

  }
})