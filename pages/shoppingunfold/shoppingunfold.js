// pages/buydetail/buydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowjoinshoppingdialog: "none",
    isshowbottomdialog: "flex",
    shoppingcount: 1,
    option: null,
    goods_id: 16,
    option_id: 27,
    currentoption_id:0,
    shoppinglist:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    })

    var id = options.id;
    if (id == undefined) {
      id = 27;
    }

    this.setData({
      productid: id
    })

    wx.setNavigationBarTitle({
      title: '商品详细'
    });

    console.log(options.id,"options.id");

    //获取商品详细
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/shop/goodsinfo/' + options.id,
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
        console.log(res.data.data.option);

        that.setData({
          goods_name: res.data.data.goods_name,
          desc: res.data.data.desc,
          cost_price: res.data.data.cost_price,
          total: res.data.data.total,
          option: res.data.data.option,
          goods_id: res.data.data.id,
          thumb_list: res.data.data.thumb_list,
          comment_count: res.data.data.comment_count,
          content: res.data.data.content,
          comment_count: res.data.comment_count,
        });

        var goods_iditem = "shoppinglist[" + 0 + "].goods_id";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var market_priceitem = "shoppinglist[" + 0 + "].market_price";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var option_iditem = "shoppinglist[" + 0 + "].option_id";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var thumbitem = "shoppinglist[" + 0 + "].thumb";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var titleitem = "shoppinglist[" + 0 + "].title";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var goods_nameitem = "shoppinglist[" + 0 + "].goods_name";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var totalitem = "shoppinglist[" + 0 + "].total";//先用一个变量，把(info[0].gMoney)用字符串拼接起来


        //立即购物设置
        that.setData({
          [goods_iditem]: res.data.data.id,
          [market_priceitem]: res.data.data.option[0].market_price,
          [option_iditem]: res.data.data.option[0].id,
          [thumbitem]: res.data.data.thumb_list[0].url,
          [titleitem]: res.data.data.option[0].title,
          [goods_nameitem]: res.data.data.goods_name,
          [totalitem]: 1,
          totalordermoney: res.data.data.option[0].market_price,
          currentoption_optionid: res.data.data.option[0].id
        })

        //加入购物车设置
        that.setData({
          currentmarket_price: res.data.data.option[0].market_price,
          currenttotal: res.data.data.option[0].total
        })

        wx.hideLoading();


      }
    })



    //获取商品评论
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/comments' ,
      data: {
        object_id: options.id,
        table_name:"goods",

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
          commentList: res.data.data,
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
  toorderpayment: function (e) {
   

    wx.navigateTo({
      url: '../orderpayment2/orderpayment2?totalordermoney=' + this.data.totalordermoney + "&shoppinglist=" +
      JSON.stringify(this.data.shoppinglist),
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  close01: function () {
    this.setData({
      isshowjoinshoppingdialog: "none",
      isshowbottomdialog: "flex"
    })
  },
  joinshoppingclick: function () {
    this.setData({
      isshowjoinshoppingdialog: "block",
      isshowbottomdialog: "none"
    })
  },
  clickjoinshopping: function () {
    this.setData({
      isshowjoinshoppingdialog: "none",
      isshowbottomdialog: "flex"
    })
  },
  tocommentdetail: function () {
    wx.navigateTo({
      url: '../commentdetail/commentdetail',
    })
  },
  minus: function () {


  },
  tocommentdetail: function () {
    wx.navigateTo({
      url: '../commentdetail/commentdetail',
    })
  },
  minus: function () {
    console.log(this.data.shoppingcount);
    //var shoppingcount= this.data.shoppingcount--
    if (this.data.shoppingcount == 0) {

    } else {
      this.setData({
        shoppingcount: this.data.shoppingcount - 1
      })
    }

  },
  plus: function () {

    this.setData({
      shoppingcount: this.data.shoppingcount + 1
    })
  }
  ,
  submit: function () {

    // console.log(this.data.contactinfo);
    // console.log(this.data.contaccodet);
    var that = this

    if (that.data.currenttotal < that.data.shoppingcount){
      wx.showToast({
        title: '库存不足'
      });

      return;
    }

    if (that.data.shoppingcount==0){
      wx.showToast({
        title: '购买数量为0',
      });

      return;
    }


    wx.showModal({
      title: '提示',
      content: '是否添加购物车？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/shop/cart',
            data: {
              // mobile: that.data.contactinfo,
              goods_id:that.data.goods_id,
              option_id: that.data.currentoption_optionid,
              total: that.data.shoppingcount

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
                  // wx.switchTab({
                  //   url: '../personalPage/shoppingCat/shoppingCat',
                  // })

                  wx.showToast({
                    title: '加入购物车成功',
                  })

              }


              wx.navigateTo({//刷新页面
                url: 'IWillfeedback',
              })

            }
          })
        } else {

        }
      }
    })


  },

  clickoptionitem:function(e){
    console.log(e,"clickoptionitem");

      var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
      var market_price = e.currentTarget.dataset.market_price;
      var total = e.currentTarget.dataset.total;
      var market_priceitem = "shoppinglist[" + id + "].market_price";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
      var totalitem = "shoppinglist[" + id + "].total";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
      this.setData({
        currentoption_id:id,
        currentoption_optionid:this.data.option[id].id,
        currentmarket_price: market_price,
        currenttotal: total,
        [market_priceitem]: market_price,
        [totalitem]:total
      }) 
  }
  ,
  imgYu: function (event){//评论列表
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    console.log(event);
    var imgListNew = event.currentTarget.dataset.list;

    var imgListNew=new Array();

    for (var i = 0; i < imgList.length;i++){
      imgListNew.push(imgList[i].url);
    }

    console.log(imgListNew,"imgListNew");

    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgListNew,//内部的地址为绝对路径
      fail: function () {
        console.log('fail')
      },
      complete: function () { 
        console.info("点击图片了");
      },
      
     
    })
  },
  praiseright:function(e){
    console.log(e);


    //点赞
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/like',
      data: {
        object_id: e.currentTarget.dataset.id,
        table_name: 'comment',
        // goods_option: this.data.goods_options,

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

        var is_likeitem = "commentList[" + e.currentTarget.dataset.index + "].is_like";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var post_likeitem = "commentList[" + e.currentTarget.dataset.index + "].post_like";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

        if (that.data.commentList[e.currentTarget.dataset.index].is_like == 1) {//取消点赞
          that.setData({
            [is_likeitem]: 0,
            [post_likeitem]: that.data.commentList[e.currentTarget.dataset.index].post_like - 1
          })
        } else if (that.data.commentList[e.currentTarget.dataset.index].is_like == 0) {//点赞
          that.setData({
            [is_likeitem]: 1,
            [post_likeitem]: that.data.commentList[e.currentTarget.dataset.index].post_like + 1
          })
        }
      }
    })

  },
  preventD:function(){//关闭遮罩滚动

  },
  toshoppingCat:function(){
    //  wx.switchTab({
    //       url: '../shoppingCat/shoppingCat',
    //  })
       wx.navigateTo({
         url: '../shoppingCat/shoppingCat',
       })
  },
  tocustomert:function(){
    // wx.navigateTo({
    //   url: '../tocustomert/',
    // })
  }




})