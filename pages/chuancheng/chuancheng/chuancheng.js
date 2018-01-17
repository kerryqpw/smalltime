// pages/chuancheng/chuancheng.js
Page({
  /**
   * 页面的初始数据
   */

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls1: [
      { url: 'image/cc4.jpg' }
    ]
    ,
    imgUrls2: [
      { url: 'image/cc4.jpg'  }
    ]
    ,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    classfytwoListoneshow: "none",
    productListoneshow: "none",
    swiperCurrent: 0,
    chuanchenglist:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '匠心列表'
    });
   

    var that = this;

    console.log(that.data.urlArray);

    //非遗列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/portal/clist',
      data: {
        parent_id: '13',

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
        console.log(res.data.data);

        // chuanchenglist
        that.setData({
          chuanchenglist:res.data.data
        })

     


      }
    })


    var that = this;

    console.log(that.data.urlArray);

    //非遗列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/home/Slides/3',
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
        // console.log(res.data.data[0].items[0].image);

        that.setData({
          topImage:res.data.data[0].items[0].image
        })

        





      }
    })


    //非遗列表接口

    var that = this;

    console.log(that.data.urlArray);

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/portal/clist',
      data: {
        parent_id: '13',

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
        console.log(res.data.data);

        // chuanchenglist
        that.setData({
          chuanchenglist: res.data.data
        })


        var chuanchengcontentlistArray = new Array();

        for (var i = 0; i < res.data.data.length;i++){

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/portal/lists/getCategoryPostLists',
            data: {
              category_id: res.data.data[i].id,

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
              // console.log(res.data.data);

              var chuanchengcontentlist = res.data.data;//先用一个变量，把(info[0].gMoney)用字符串拼接起来
              // var chuanchengcontentlistitem = "chuanchenglist[" + 0 + "].chuanchengcontentlist";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

              chuanchengcontentlistArray.push(res.data.data);
              // console.log(chuanchengcontentlistArray, "chuanchengcontentlistArray");

              // console.log(chuanchengcontentlist,"chuanchengcontentlist");

              // // chuanchenglist
              // that.setData({
              //   [chuanchengcontentlistitem]: res.data.data
              // })

              

            }
          })
                    
        }
        console.log(chuanchengcontentlistArray,"chuanchengcontentlistArray");


        setTimeout(function () {
          //循环遍历二级菜单
          for (var i = 0; i < that.data.chuanchenglist.length; i++) {
            var chuanchengcontentlistitem = "chuanchenglist[" + i + "].chuanchengcontentlist";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

          
            console.log(chuanchengcontentlistArray[i], "chuanchengcontentlistArray[i]");

            that.setData({
              [chuanchengcontentlistitem]: chuanchengcontentlistArray[i]
            })
            for (var j = 0; j < chuanchengcontentlistArray[i].list.length; j++) {
              var chuanchengcontentlistitetwo = "chuanchenglist[" + i + "].chuanchengcontentlist.list[" + j +"].post_excerpt";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
              console.log(chuanchengcontentlistArray[i].list[j].post_excerpt,"chuanchengcontentlistArray[i][j].post_excerpt");

              that.setData({
                [chuanchengcontentlistitetwo]: (chuanchengcontentlistArray[i].list[j].post_excerpt).substring(0,10)
              })
            }
            

          }
          console.log(that.data.chuanchenglist, "chuanchenglist");
        }, 2000) 
        

        


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
  //轮播图的切换事件  
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      swiperCurrent: e.detail.current   //获取当前轮播图片的下标
    })


  },
  inherit: function () {
    wx.navigateTo({
      url: '../chuancheng/chuancheng/chuancheng',
    })
  },
  toinheritdetail:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../../inheritdetail/inheritdetail?productid=' + e.currentTarget.dataset.id,
    })
  },
  tobuydetail:function(){
    wx.navigateTo({
      url: '../../shoppingunfold/shoppingunfold',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickImg: function (e) {
    var id = e.currentTarget.id;
    // wx.navigateTo({
    //   url: '../tophotograph/tophotograph',
    // })
    console.log("id:" + id);
  },
  changeIndicatorDots: function (e) {//轮播图状态控制
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {//轮播图状态控制
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {//轮播图状态控制
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {//轮播图状态控制
    this.setData({
      duration: e.detail.value
    })
  }, extrageneticListItemClick: function () {
    // wx.showToast({
    //   title: '点击非遗',
    //   icon: 'success',
    //   duration: 2000
    // })
  },
  clickclassfy: function (e) {
    console.log(e.currentTarget.dataset.id);


   var currentcontentclassfyId = e.currentTarget.dataset.id;
   console.log(currentcontentclassfyId);

   //点击自身隐藏
   if (currentcontentclassfyId == this.data.currentcontentclassfyId) {
     this.setData({
       currentcontentclassfyId: "dsf"
     })
   } else {
     this.setData({
       currentcontentclassfyId: currentcontentclassfyId
     })
   }

    console.log("swiperCurrent:" + this.data.swiperCurrent);
    console.log("classfytwoListoneshow:" + this.data.classfytwoListoneshow);
    console.log("productListoneshow:" + this.data.productListoneshow);


    if (this.data.swiperCurrent == 0) {


    }

   



  }
})

