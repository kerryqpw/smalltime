// hello.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello dasdadad',
    userInfo: { "asd": "是的发生发生地方" },
    ajaxdata:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '分类'
    });

    wx.getLocation(
      　　{
        　　　　success: function (res) {
          console.log(res)
          that.setData({
            hasLocation: true,
            location: formatLocation(res.longitude, res.latitude)//这里是获取经纬度
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

   

    console.log('onLoad')
    　　var that = this;
    　　wx.getLocation({
      　　　　success: function (res) {
        　　　　　　wx.request({
          　　　　　　　　url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1', data: {},
          　　　　　　　　header: { 'Content-Type': 'application/json' },
          　　　　　　　　success: function (ops) {
            　　　　　　　　　　console.log(ops.data)
          　　　　　　　　}
        　　　　})
      　　}
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
  
  },
  slideshow:function(){
    wx.navigateTo({
      url: '../slideshow/slideshow'
    })
  },
  gotoHello2: function () {//跳转页面
    wx.navigateTo({
      url: '../testUI/testUI'
    })
  },
  gotoMusicPage2:function(){
    wx.navigateTo({
      url: '../musicPage/musicPage',
    })
  },
  gotoVideoPage3:function(){
    wx.navigateTo({
      url: '../videoPage/videoPage',
    })
  },
  gotoMapPage2:function(){
    wx.navigateTo({
      url: '../map/map',
    })
  }, gotoRichTextPage3:function(){
    wx.navigateTo({
      url: '../richText/richText',
    })
  }, localCache:function(){
    wx.navigateTo({
      url: '../localCache/localCache',
    })
  }
  , toWeChatWeChat: function () {
    wx.navigateTo({
      url: '../toWeChatWeChat/toWeChatWeChat',
    })
  }, toWeChatFlock:function(){
    wx.navigateTo({
      url: '../toOpenData/toOpenData',
    })
  }, toClientDialogue:function(){
    wx.navigateTo({
      url: '../toClientDialogue/toClientDialogue',
    })
  }, tophotograph:function(){
    wx.navigateTo({
      url: '../tophotograph/tophotograph',
    })
  },
  animations:function(){
    wx.navigateTo({
      url: '../animations/animations',
    })
  },
  impower:function(){
    wx.navigateTo({
      url: '../impower/impower',
    })
  },
  sideslip:function(){
    wx.navigateTo({
      url: '../sideslip/sideslip',
    })
  },
  slideshow:function(){
    wx.navigateTo({
      url: '../slideshow/slideshow',
    })
  },
  aroundsideslip:function(){
    wx.navigateTo({
      url: '../aroundsideslip/aroundsideslip',
    })
  },
  webView:function(){
    wx.navigateTo({
      url: '../webView/webView',
    })
  },
  scrollview:function(){
    wx.navigateTo({
      url: '../scrollview/scrollview',
    });
    
  },
  template:function(){
    wx.navigateTo({
      url: '../template/template',
    });
    
  },
  webView:function(){
    wx.navigateTo({
      url: '../webView/webView',
    });
  },
  navigator:function(){
    wx.navigateTo({
      url: '../navigator/navigator',
    })
  },
  sideslipdelete:function(){
    wx.navigateTo({
      url: '../sideslipdelete/sideslipdelete',
    })
  },
  buydetail:function(){
    wx.navigateTo({
      url: '../buydetail/buydetail',
    })
  },
  inheritdetail:function(){
    wx.navigateTo({
      url: '../inheritdetail/inheritdetail',
    })
  },
  orderpayment:function(){
    wx.navigateTo({
      url: '../orderpayment/orderpayment',
    })
  },
  shoppingunfold:function(){
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold',
    })
  },
  questiondetail:function(){
    wx.navigateTo({
      url: '../questiondetail/questiondetail',
    })
  },
  leftrightpageslide:function(){
    wx.navigateTo({
      url: '../leftrightpageslide/leftrightpageslide',
    })
  },
  editaddress:function(){
    wx.navigateTo({
      url: '../editaddress/editaddress',
    })
  },
  addressList:function(){
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
  questionfeedback:function(){
    wx.navigateTo({
      url: '../questionfeedback/questionfeedback',
    })
  },
  paysuccess:function(){
    wx.navigateTo({
      url: '../paysuccess/paysuccess',
    })
    
  },
  inheritlist:function(){
    wx.navigateTo({
      url: '../inheritlist/inheritlist',
    })
  },
  comment:function(){
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  updatephone:function(){
    wx.navigateTo({
      url: '../personalPage/personalInfo/bindphone/updatephone/updatephone',
    })
  },
  orderdetail:function(){
    wx.navigateTo({
      url: '../orderdetail/orderdetail',
    })
  },
  huatixiangqing01:function(){
    wx.navigateTo({
      url: '../huatixiangqing01/huatixiangqing01',
    })
  },
  huatixiangqing02:function(){
    wx.navigateTo({
      url: '../huatixiangqing02/huatixiangqing02',
    })
  },
  productlist:function(){
    wx.navigateTo({
      url: '../productlist/productlist',
    })
  },

  historytime:function(){
    wx.navigateTo({
      url: '../historytime/historytime',
    })
  },
  ssou:function(){
    wx.navigateTo({
      url: '../ssou/ssou',
    })
  },
  huatilist:function(){
    wx.navigateTo({
      url: '../huatilist/huatilist',
    })
  },
  transportstate:function(){
    wx.navigateTo({
      url: '../transportstate/transportstate',
    })
  },
  commentdetail:function(){
    wx.navigateTo({
      url: '../commentdetail/commentdetail',
    })
  },
  homesecondfloor:function(){
    wx.navigateTo({
      url: '../homesecondfloor/homesecondfloor',
    })
  },
   ajaxrequest:function(){
    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.list);

        that.setData({
          ajaxdata: res.data.list
        })


      }
    })
  }
})