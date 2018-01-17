// pages/commentdetail/commentdetail.js
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
    wx.setNavigationBarTitle({
      title: '评论列表'
    });

    this.setData({
      commentid: options.commentid,
      articleid: options.articleid
    })
    


    var that = this;

    console.log(that.data.urlArray);

    //非遗列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/comment/' + options.commentid,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res);


        // chuanchenglist
        that.setData({
          // historytimelist: res.data.data.list,  
          create_time: res.data.data.create_time, /***/
          photoos: res.data.data.img.photoos,
          post_like: res.data.data.post_like, 

          avatar: res.data.data.user.avatar,
          user_nickname: res.data.data.user.user_nickname,
          content: res.data.data.content,
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
          desc: res.data.data.desc.substring(0, 10) + "...",
          comment: res.data.data.comment || ''
        })


      }
    })


    //获取商品评论
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/comments',
      data: {
        object_id: options.articleid,
        table_name: "portal_post",
        parent_id: options.commentid
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
    //获取商品评论
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/comments',
      data: {
        object_id: that.data.articleid,
        table_name: "portal_post",
        parent_id: that.data.commentid
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
  toproductdetail:function(){
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold',
    })
  },
  imgYu: function (event) {//评论列表
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    console.log(event);
    var imgListNew = event.currentTarget.dataset.list;

    var imgListNew = new Array();

    for (var i = 0; i < imgList.length; i++) {
      imgListNew.push(imgList[i].url);
    }

    console.log(imgListNew, "imgListNew");

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
  praiseright: function (e) {
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

  }
  ,
  clickmycomment: function (e) {
    console.log(e);

    wx.navigateTo({
      url: '../comment/comment?table_name=portal_post&id=' + this.data.articleid + "&parent_id=" + this.data.commentid,
    })
  }
  

})