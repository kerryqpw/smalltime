

var username;
var contactinfo;
var feedbackinfo;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    contactinfo: '',
    feedbackinfo: '',
    questionList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我要反馈'
    });






    //获取地址列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/feedback',
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

        // that.setData({
        //   ajaxdata: res.data.list
        // })


        console.log(res.data.data);
        that.setData({
          questionList: res.data.data
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
  goBack: function () {
    wx.navigateBack();
  }
  ,
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
  usernameInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      username: e.detail.value,
    });
    username = e.detail.value;

  },
  contactInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      contactinfo: e.detail.value,
    });
    contactinfo = e.detail.value
  },
  textarea: function (e) {
    console.log(e.detail.value);
    this.setData({
      feedbackinfo: e.detail.value,
    });
    feedbackinfo = e.detail.value
  },
  sendfeedback: function () {
    console.log("username:" + username);
    console.log("contactinfo:" + contactinfo);
    console.log("feedbackinfo:" + feedbackinfo);

    console.log("发布反馈");
    //用户名验证
    if (username == undefined || username==""){
      wx.showToast({
        title: '用户名为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    //手机验证
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
   
    if (contactinfo == undefined || contactinfo == ""){
      wx.showToast({
        title: '联系方式为空',
        icon: 'success',
        duration: 1000
      })
      return;
    } else if (!myreg.test(contactinfo)){
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      });
      return;

    }

    //反馈内容验证
    if (feedbackinfo == undefined || feedbackinfo == "") {
      wx.showToast({
        title: '反馈内容为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }


    var that = this
    wx.showModal({
      title: '提示',
      content: '是否发布反馈？',
      success: function (res) {
        if (res.confirm) {
          var that = this;

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/user/feedback',
            data: {
              uname: username,
              mobile: contactinfo,
              content: feedbackinfo
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
                  title: '提交反馈成功',
                  icon: 'success',
                  duration: 1000
                })
                wx.navigateTo({//刷新页面
                  url: 'IWillfeedback ',
                })
              }


             

            }
          })
        } else {
          
        }
      }
    })



  

  },
  questiondetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var content = e.currentTarget.dataset.content;
    var reply = e.currentTarget.dataset.reply;

    wx.navigateTo({
      url: 'questiondetail/questiondetail?id=' + id + '&content=' + content
      + '&reply=' + reply,
    })
  }
})