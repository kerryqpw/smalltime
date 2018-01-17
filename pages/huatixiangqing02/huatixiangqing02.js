// pages/wtfk/wtfk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowmystory: "block",
    isshowhomedialog: "none",
    inheritimg: "",
    historyimg: "",
    array: ['成都', '眉山', '乐山', '广元'],
    urlArray: [],
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("commentid:"+options.commentid);

    wx.setNavigationBarTitle({
      title: '话题详情'
    });


    var that = this;

    console.log(that.data.urlArray);

    //非遗列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/portal/articles/' + options.commentid,
      data: {
        // category_id: '12',

      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res.data.data.more.thumbnail);


        // chuanchenglist
        that.setData({
          topimg: res.data.data.thumb_big,
          commendid: res.data.data.id

        })


      }
    })



    //生产订单
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
          comment: res.data.data.comment || '',
          post_like: res.data.data.post_like,
          recommendproductid:res.data.data.id
        })


      }
    })



    //生产订单
    var that = this;

    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/comments',
      data: {
        object_id: options.commentid,
        table_name: 'portal_post',
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

       

        var leftcommentList=new Array();
        var rightcommentList=new Array();
        for (var i = 0; i < res.data.data.length;i++){
          if ((i % 2) == 1){
            rightcommentList.push(res.data.data[i]);
          }else{
            leftcommentList.push(res.data.data[i]);
          }
        }

        that.setData({
          leftcommentList: leftcommentList,
          rightcommentList: rightcommentList
        });

        console.log(leftcommentList,"leftcommentList");
        console.log(rightcommentList,"rightcommentList");


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
    console.log("详情底部2");

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tocommentdetail:function(e){
    console.log(e);

    wx.navigateTo({
      url: '../commentdetail/commentdetail?commentid=' + e.currentTarget.dataset.id + '&articleid=' + this.data.commendid
    })
  },
  toproductdetail:function(){
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold',
    })
  },
  praiseleft:function(e){
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
        var is_likeitem = "leftcommentList[" + e.currentTarget.dataset.index + "].is_like";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

        var post_likeitem = "leftcommentList[" + e.currentTarget.dataset.index + "].post_like";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

        if (that.data.leftcommentList[e.currentTarget.dataset.index].is_like==1){//取消点赞
           that.setData({
             [is_likeitem]: 0,
             [post_likeitem]: that.data.leftcommentList[e.currentTarget.dataset.index].post_like - 1
           })       
        } else if (that.data.leftcommentList[e.currentTarget.dataset.index].is_like == 0){//点赞
           that.setData({
             [is_likeitem]: 1,
             [post_likeitem]: that.data.leftcommentList[e.currentTarget.dataset.index].post_like + 1
           })
        }

        console.log(that.data.leftcommentList);
    

       

      }
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

        var is_likeitem = "rightcommentList[" + e.currentTarget.dataset.index + "].is_like";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        var post_likeitem = "rightcommentList[" + e.currentTarget.dataset.index + "].post_like";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
        
        if (that.data.rightcommentList[e.currentTarget.dataset.index].is_like == 1) {//取消点赞
          that.setData({
            [is_likeitem]: 0,
            [post_likeitem]: that.data.rightcommentList[e.currentTarget.dataset.index].post_like-1
          })
        } else if (that.data.rightcommentList[e.currentTarget.dataset.index].is_like == 0) {//点赞
          that.setData({
            [is_likeitem]: 1,
            [post_likeitem]: that.data.rightcommentList[e.currentTarget.dataset.index].post_like + 1
          })
        }
      }
    })

  } 
  ,toproductdetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../shoppingunfold/shoppingunfold?id=' + e.currentTarget.dataset.id
    })

  },   /* 发布文章相关 **/
  clickmystory: function () {
    this.setData({
      isshowmystory: "none",
      isshowhomedialog: "block"
    })
  },
  clickhomedialog: function () {
    this.setData({
      isshowmystory: "block",
      isshowhomedialog: "none"
    })
  },
  mystorycamera: function () {

    var that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: getApp().globalData.netUrl + '/api/user/upload/one', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'XX-Token': getApp().globalData.token,
            'XX-Device-Type': 'wxapp',
            'XX-Api-Version': getApp().globalData.XXApiVersion
          },
          formData: {
            'user': 'test'
          },

          success: function (res) {
            console.log(res);
            var data = res.data
            //do something
            // str.replace("\\", "");
            console.log(res.data);
            var datajson = JSON.parse(res.data);
            console.log(datajson.data.url);

            var obj = {
              "url": datajson.data.url,
              "name": datajson.data.filename
            }

            var urlArray = that.data.urlArray;
            urlArray.push(obj);


            // var urlStr = res.data.data.url+"";
            that.setData({
              uploadimg01: "https://api.xshtc.net/upload/" + datajson.data.url,
              urlArray: urlArray
            })

            console.log(that.data.urlArray);

          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })



  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  //  点击国家组件确定事件  
  bindPickerChange: function (e) {
    console.log(e.detail.value);

    this.setData({
      index: e.detail.value
    })
  },
  contentchange: function (e) {
    console.log(e.detail.value);

    this.setData({
      content: e.detail.value
    })
  }
  ,
  preventD: function () {//关闭遮罩滚动

  },

  confirm: function () {

    var that = this;

    console.log(that.data.urlArray);


    //图片为空验证
    if (that.data.urlArray.length == 0) {
      wx.showToast({
        title: '图片不能为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    //评论内容为空验证
    if (that.data.content == undefined || that.data.content == "") {
      wx.showToast({
        title: '评论内容为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    wx.showModal({
      title: '提示',
      content: '是否发布评论',
      success: function (res) {
        if (res.confirm) {
          // var that = this;
          //删除地址

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/user/comments',
            data: {
              object_id: that.data.commendid,
              table_name: "portal_post",
              content: that.data.content,
              img: {
                photos: that.data.urlArray
              }
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
                wx.showToast({
                  title: '发布成功',
                  icon: "success",
                  duration: 1000
                })
                // wx.navigateBack({

                // });


                wx.request({
                  // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
                  url: getApp().globalData.netUrl + '/api/user/comments',
                  data: {
                    object_id: that.data.commendid,
                    table_name: 'portal_post',
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



                    var leftcommentList = new Array();
                    var rightcommentList = new Array();
                    for (var i = 0; i < res.data.data.length; i++) {
                      if ((i % 2) == 1) {
                        rightcommentList.push(res.data.data[i]);
                      } else {
                        leftcommentList.push(res.data.data[i]);
                      }
                    }

                    that.setData({
                      leftcommentList: leftcommentList,
                      rightcommentList: rightcommentList
                    });

                    console.log(leftcommentList, "leftcommentList");
                    console.log(rightcommentList, "rightcommentList");

                    //关闭评论
                    that.setData({
                      isshowmystory: "block",
                      isshowhomedialog: "none"
                    })

                  }
                })

              }

            }
          })

        } else {

        }
      }
    })

  }

})