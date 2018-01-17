// pages/leftSwiperDel/index.js  

var initdata = function (that) {
  var list = that.data.list
  for (var i = 0; i < list.length; i++) {
    list[i].txtStyle = ""
  }
  that.setData({ list: list })
}

Page({
  data: {
    delBtnWidth: 112,//删除按钮宽度单位（rpx）
    imagewidth: "19.6vw",
    imageheight: "19.6vw",
    list: [
      {
        txtStyle: "",
        icon: "/images/personal/shopchat/shopchat01.jpg",
        txt: "指尖快递"
      },
      {
        txtStyle: "",
        icon: "/images/personal/shopchat/shopchat01.jpg",
        txt: "指尖快递"
      },
      {
        txtStyle: "",
        icon: "/images/personal/shopchat/shopchat01.jpg",
        txt: "指尖快递"
      },
      

    ],
    countlist: [
      { count: 0 },
      { count: 0 },
      { count: 0 }
    ],
    goods_id:[],
    goods_options:[],
    goods_total:[],
    shoppinglist:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车'
    });

    // 页面初始化 options为页面跳转所带来的参数  
    this.initEleWidth();

    console.log(this.data.list.length);
    for (var index in this.data.list) {
      // res.data.infos[index].info_file = res.data.infos[index].info_file.split(',');
      var count = "count" + index;

      // this.data.countlist[index].count = this.data.countlist[index].count++;

      var that = this;
      var count = "countlist[" + index + "].count";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
      that.setData({
        [count]: 1
      })
    }


  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  


    //获取我的未使用的优惠券
    //获取地址列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/cart',
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

        console.log(res);
        that.setData({
          couponList: res.data.data
        });



        var data = res.data.data;
        console.log(data);
        var shopinglengthStr;
        if (data.cart == undefined){
          shopinglengthStr=0;
        }else{
          shopinglengthStr = data.cart.length;
        }

        that.setData({
          shopinglength: shopinglengthStr
        })
        console.log(1111111);
        if (data <= 0) {
          //空购物车
        } else {
          for (var i in data.cart) {
            console.log(data.cart[i], 'list');
            // console.log(data.goods[27]);
            console.log(data.cart[i].total);   //添加数量
            // console.log(data.goods[data.cart[i].id]);   //商品规则
            console.log(data.goods[data.cart[i].goods_id].goods_name || '');  //商品名称

            // console.log(data.option[data.cart[i].option_id].title || '');  //商品规格
            console.log(data.goods[data.cart[i].goods_id].market_price || '');  //商品价格
            console.log(data.goods[data.cart[i].goods_id].thumb || '');   //商品图片

            var is_showitem = "shoppinglist[" + i + "].is_show";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
            var goods_nameitem = "shoppinglist[" + i + "].goods_name";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
            var titleitem = "shoppinglist[" + i + "].title";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
            var market_priceitem = "shoppinglist[" + i + "].market_price";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
            var thumbitem = "shoppinglist[" + i + "].thumb";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
            var totalitem = "shoppinglist[" + i + "].total";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

            var countitem = "countlist[" + i + "].count";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

            var onemarket_priceitem = "countlist[" + i + "].market_price";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

            var goods_iditem = "shoppinglist[" + i + "].goods_id";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
            var option_iditem = "shoppinglist[" + i + "].option_id";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

            var cart_iditem = "shoppinglist[" + i + "].cart_id";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

            that.setData({
              [countitem]: data.cart[i].total,
              [onemarket_priceitem]: data.option[data.cart[i].option_id].market_price
            })

            //规格名称undefinded判断
            var titleStr;
            if (data.option[data.cart[i].option_id] == undefined) {
              titleStr = data.goods[data.cart[i].goods_id].goods_name || '';
            } else {
              titleStr = data.option[data.cart[i].option_id].title || '';

            }

            //商品价格undefinded判断
            var market_priceStr;
            if (data.option[data.cart[i].option_id] == undefined) {
              market_priceStr = 13;
            } else {
              market_priceStr = (data.option[data.cart[i].option_id].market_price) * (data.cart[i].total);

            }

            that.setData({
              [is_showitem]: data.goods[data.cart[i].goods_id].is_show,
              [goods_nameitem]: data.goods[data.cart[i].goods_id].goods_name || '',
              [titleitem]: titleStr,
              [market_priceitem]: market_priceStr,
              [thumbitem]: data.goods[data.cart[i].goods_id].thumb,
              [totalitem]: data.cart[i].total,
              [goods_iditem]: data.cart[i].goods_id,
              [option_iditem]: data.cart[i].option_id,
              [cart_iditem]: data.cart[i].id
            })

          }

          console.log(that.data.shoppinglist,"that.data.shoppinglist");

          var totalordermoney = 0;
          //计算总金额
          for (var i = 0; i < that.data.shoppinglist.length; i++) {
            totalordermoney = (totalordermoney + that.data.shoppinglist[i].market_price);
          }

          console.log(totalordermoney, "totalordermoney");

          that.setData({
            totalordermoney: totalordermoney
          })


        }


      }
    })

  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    wx.stopPullDownRefresh();

  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置  
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置  
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值  
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项  
      var index = e.target.dataset.index;
      var shoppinglist = this.data.shoppinglist;
      shoppinglist[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        shoppinglist: shoppinglist
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置  
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮  
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项  
      var index = e.target.dataset.index;
      var shoppinglist = this.data.shoppinglist;
      shoppinglist[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        shoppinglist: shoppinglist
      });
    }
  },
  //获取元素自适应后的实际宽度  
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应  
      // console.log(scale);  
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error  
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件  
  delItem: function (e) {
    console.log(e);

    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {


          // //获取商品详细
          // var that = this;

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/shop/cart/del/' + e.currentTarget.dataset.cart_id,
            data: {
            },
            method: 'DELETE',
            header: {
              'content-type': 'application/json',
              'XX-Token': getApp().globalData.token,
              'XX-Device-Type': 'wxapp',
              'XX-Api-Version': getApp().globalData.XXApiVersion
            },
            success: function (res) {
              console.log(res);
              console.log(res.data.data.option);

            

            }
          })



          //获取列表中要删除项的下标  
          var index = e.target.dataset.index;
          var shoppinglist = that.data.shoppinglist;
          //移除列表中下标为index的项  
          shoppinglist.splice(index, 1);
          //更新列表的状态  
          that.setData({
            shoppinglist: shoppinglist
          });


          //重新计算总价
          var totalordermoney = 0;
          //计算总金额
          for (var i = 0; i < that.data.shoppinglist.length; i++) {
            totalordermoney = (totalordermoney + that.data.shoppinglist[i].market_price);
          }

          console.log(totalordermoney, "totalordermoney");

          that.setData({
            totalordermoney: totalordermoney
          })

          
        } else {
          initdata(that)
        }
      }
    })

  },
  goBack: function () {
    wx.navigateBack({

    });
  },
  toorderpayment: function (e) {
    var shoppinglist = this.data.shoppinglist+"";
    console.log(this.data.totalordermoney,"this.data.totalordermoney");
    console.log(this.data.shoppinglist, "shoppinglist");
    
    if (this.data.shopinglength==0){
      wx.showToast({
        title: '购物车为空无法结算',
        icon: 'succes',
        duration: 1000,
      })
    }else{
      wx.navigateTo({
        url: '../orderpayment/orderpayment?totalordermoney=' + this.data.totalordermoney + "&shoppinglist=" +
        JSON.stringify(this.data.shoppinglist),
      })
    }
   
  },
  plus: function (e) {
    console.log(e);

    var count = this.data.countlist[e.currentTarget.dataset.index].count;

    console.log(count);

    var countitem = "countlist[" + e.currentTarget.dataset.index + "].count";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

    var market_priceitem = "shoppinglist[" + e.currentTarget.dataset.index + "].market_price";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
    var totalitem = "shoppinglist[" + e.currentTarget.dataset.index + "].total";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

    var countitem = "countlist[" + e.currentTarget.dataset.index + "].count";//先用一个变量，把(info[0].gMoney)用字符串拼接起来


    this.setData({
      [countitem]: count + 1,
      [market_priceitem]: (count + 1) * (this.data.countlist[e.currentTarget.dataset.index].market_price),
      [totalitem]: count + 1,

    })


    var totalordermoney = 0;
    //计算总金额
    for (var i = 0; i < this.data.shoppinglist.length; i++) {
      totalordermoney = totalordermoney + this.data.shoppinglist[i].market_price;
    }

    console.log(totalordermoney);

    this.setData({
      totalordermoney: totalordermoney
    })



    var that = this

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/cart',
      data: {
        // mobile: that.data.contactinfo,
        goods_id: e.currentTarget.dataset.goodid,
        option_id: e.currentTarget.dataset.optionid,
        total: 1

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

        if (res.statusCode == 200) {
          wx.navigateTo({//刷新页面
            url: 'shoppingCat',
          })

        }


      

      }
    })

    

  },
  minus: function (e) {
    console.log(e);

    var count = this.data.countlist[e.currentTarget.dataset.index].count;

    if (count == 0) {

    } else {
      console.log(count);

      var countitem = "countlist[" + e.currentTarget.dataset.index + "].count";//先用一个变量，把(info[0].gMoney)用字符串拼接起来


      var market_priceitem = "shoppinglist[" + e.currentTarget.dataset.index + "].market_price";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
      var totalitem = "shoppinglist[" + e.currentTarget.dataset.index + "].total";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

      // console.log(count - 1,"count - 1");
      var countitem = "countlist[" + e.currentTarget.dataset.index + "].count";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

      this.setData({
        [countitem]: count - 1,
        [market_priceitem]: (count - 1) * (this.data.countlist[e.currentTarget.dataset.index].market_price),
        [totalitem]: count - 1

      })

      // console.log(this.data.shoppinglist,"shoppinglist");
      // console.log(this.data.shoppinglist);

      var totalordermoney=0;
      //计算总金额
      for (var i = 0; i<this.data.shoppinglist.length;i++){
        totalordermoney = totalordermoney + this.data.shoppinglist[i].market_price;
      }

      // console.log(totalordermoney);

      this.setData({
        totalordermoney: totalordermoney
      })

      console.log(this.data.shoppinglist);


      var that = this
      
      wx.request({
        // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
        url: getApp().globalData.netUrl + '/api/shop/cart',
        data: {
          // mobile: that.data.contactinfo,
          goods_id: e.currentTarget.dataset.goodid,
          option_id: e.currentTarget.dataset.optionid, 
          total: -1

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

          if (res.statusCode == 200) {
            wx.navigateTo({//刷新页面
              url: 'shoppingCat',
            })
          }


         

        }
      })


    }


  }

})  