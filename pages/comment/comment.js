// pages/wtfk/wtfk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.id);
    wx.setNavigationBarTitle({
      title: '评论'
    });

    this.setData({
      id:options.id,
      table_name: options.table_name,
      parent_id: options.parent_id
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
  commentinput:function(e){
    console.log(e.detail.value);
    this.setData({
      comment: e.detail.value,
    });
  },
  submit:function(){
    var that = this;

    wx.showModal({
      title: '提示',
      content: '是否发布评论？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;
          //发布评论
          

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/user/comments',
            data: {
              object_id: that.data.id,
              table_name: that.data.table_name,
              content: that.data.comment,
              img: {
                photos: that.data.urlArray
              },
              parent_id: that.data.parent_id
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
              if(res.statusCode==200){
                wx.showToast({
                  title: '发布成功',
                  icon:"success",
                  duration:1000
                })
                wx.navigateBack({
                  
                });
              }

            }
          })

        } else {

        }
      }
    })

   
  },
  mycommentcamera:function(e){


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

            if (that.data.urlArray.length==3){
              that.setData({
                isshowcommentcamera: "none"
              })
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })

  }

})