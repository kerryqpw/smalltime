// pages/orderpayment/orderpayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: [],
    goods_options: [],
    goods_total: [],
    isselectbalance:"checked",
    isselectwx:"",
    pay_type:"balance",
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
      totalordermoney: parseFloat(options.totalordermoney),
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
        pay_type: this.data.pay_type
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
        
        if(res.data.code==0){

          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false,

            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                });
              } else {

              }
            }
          })
          // wx.showToast({
          //   title:res.data.msg,
          //   duration:2000            
          // });

          // setTimeout(function(){
          //   wx.navigateBack({
          //   })
          // },2100);

          // function back(){
          //   wx.navigateBack({

          //   });
          // }

         
        }
        
        var summationmoneyStr=0;
        

        var priceStr;
        if (res.data.data==undefined){
          priceStr=13;
        }else{
          priceStr= res.data.data.order.price;
        }

        that.setData({
          totalprice: priceStr,
          carriage: res.data.data.order.dispatch_price,
          favorable_price: res.data.data.order.favorable_price,
          goodsList: res.data.data.goods,
          summationmoney: parseFloat(that.data.totalordermoney) + parseFloat(res.data.data.order.dispatch_price)

        })

        console.log(res.data.data.order.dispatch_price,"summationmoney");

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
    wx.showModal({
      title: '提示',
      content: "提交订单",
      showCancel: true,

      success: function (res) {
        if (res.confirm) {
         

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/order/save',
            data: {
              goods_id: that.data.goods_id,
              goods_option: that.data.goods_options,
              goods_total: that.data.goods_total,
              address_id: that.data.addressid,
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

              if(res.data.code==1){
                wx.navigateTo({
                  url: '../paysuccess/paysuccess',
                })

              } else if (res.data.code == 2){
                var thatres = res;

                wx.showModal({
                  title: "提示",
                  content: '微信支付',
                  showCancel: false,
                  success:function(res){
                    if (res.confirm) {
                      // wx.navigateTo({
                      //   url: '../orderdetail/orderdetail?order_number=' + res.data.data.,
                      // })

                      wx.requestPayment({
                        'timeStamp': thatres.data.data.timeStamp,
                        'nonceStr': thatres.data.data.nonceStr,
                        'package': thatres.data.data.package,
                        'signType': thatres.data.data.signType,
                        'paySign': thatres.data.data.paySign,
                        'success': function (res) {//支付成功
                          console.log(res, "success");
                          wx.navigateTo({
                            url: '../paysuccess/paysuccess',
                          })
                         
                        },
                        'fail': function (res) {//支付失败
                          console.log(res, "fail");
                          wx.navigateTo({
                            url: '../personalPage/myOrder/myOrder?ordertype=0',
                          })

                        },
                        'complete': function (res) {//支付完成
                          console.log(res, "complete");

                        }
                      })


                      // wx.requestPayment({
                      //   'timeStamp': '1490840662',
                      //   'nonceStr': 'fgdgdgdfgdfg',
                      //   'package': 'prepay_id=wxfe0f0fde32f154f5',
                      //   'signType': 'MD5',
                      //   'paySign': 'MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6',
                      //   'success': function (res) {
                      //     console.log(res, "success");
                      //   },
                      //   'fail': function (res) {
                      //     console.log(res, "fail");

                      //   },
                      //   'complete': function (res) {
                      //     console.log(res, "complete");

                      //   }
                      // })

                      // wx.navigateTo({
                      //   url: '../personalPage/myOrder/myOrder?ordertype=0',
                      // })
                    }else{

                    }
                  }
                })
              }

              // that.setData({
              //   totalprice: res.data.data.order.price,
              //   carriage: res.data.data.order.dispatch_price,
              //   favorable_price: res.data.data.order.favorable_price,
              //   goodsList: res.data.data.goods

              // })

             


            }
          })
        } else {
          
        }
      }
    })

    
   
  },
  toeditAddressInfo:function () {
    wx.navigateTo({
      url: '../personalPage/addressmanagerorder/addressmanagerorder',
    })
  },
  clickbalance:function(e){
    console.log(e,"checkboxChange");

    if (this.data.isselectbalance =="checked"){
      this.setData({
        isselectbalance:"",
        isselectwx:"checked",
        pay_type:"wx"
      })

      
    }else{
      this.setData({
        isselectbalance: "checked",
        isselectwx: "",
        pay_type: "balance"
      })
    }
  

  },
  clickwx:function(e){
    if (this.data.isselectwx == "checked") {
      this.setData({
        isselectbalance: "checked",
        isselectwx: "",
        pay_type: "balance"
      })
    } else {
      this.setData({
        isselectbalance: "",
        isselectwx: "checked",
        pay_type: "wx"
      })
    }
  },
  todiscountcoupon:function(){
    wx.navigateTo({
      url: '../personalPage/mydiscount/mydiscount',
    })
  }

})