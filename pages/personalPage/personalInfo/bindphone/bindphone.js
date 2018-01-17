// pages/wtfk/wtfk.js
Page({

  /**
   * 页面的初始数据
   */
 

  data: {
    contactinfo: "",
    contaccodet: "",
    isshowverification: "getCode"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定手机'
    });
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
  contactInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      contactinfo: e.detail.value,
    });
  },
  contaccodetInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      contaccodet: e.detail.value,
    });
  },
  getcode: function () {
    console.log(this.data.contactinfo);

    var that = this;

    that.setData({
      isshowverification: "countDown"
    })

    //60秒倒计时
    var countdown = 60;
    var settime = function (that) {

      if (countdown == 0) {
        that.setData({
          isshowverification: 'getCode'
        })
        countdown = 60;

        return;
      } else {
        that.setData({
          isshowverification: 'countDown',
          last_time: countdown
        })

        countdown--;
      }
      setTimeout(function () {
        settime(that)
      }, 1000)

    }
    //获取验证码
    settime(that);

    wx.showModal({
      title: '提示',
      content: '是否获取验证码？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;


          that.setData({
            isshowverification:"countDown"
          })

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/user/verification_code/send',
            data: {
              username: that.data.contactinfo
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
  submit: function () {

    console.log(this.data.contactinfo);
    console.log(this.data.contaccodet);

    var that = this
    wx.showModal({
      title: '提示',
      content: '是否绑定手机？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/user/profile/bindingMobile',
            data: {
              mobile: that.data.contactinfo,
              verification_code: that.data.contaccodet

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
                  url: 'IWillfeedback ',
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