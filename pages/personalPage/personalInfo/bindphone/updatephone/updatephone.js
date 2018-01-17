// pages/wtfk/wtfk.js
Page({

  /**
   * 页面的初始数据
   */
  

  data: {
    mobile:"",
    isshowverification:"getCode",
    isshowverification2:"getCode"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '修改绑定手机'
    });
    var mobile = options.mobile;
    console.log(mobile);

    this.setData({
      mobile: mobile,
    });

    console.log(this.data.mobile);

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
  contactInput2: function (e) {
    console.log(e.detail.value);
    this.setData({
      contactinfo2: e.detail.value,
    });
  },

  contactInput3: function (e) {
    console.log(e.detail.value);
    this.setData({
      contactinfo3: e.detail.value,
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
      } , 1000)

    }

    settime(that);

    wx.showModal({
      title: '提示',
      content: '是否获取验证码？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;
        
          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/user/verification_code/send',
            data: {
              username: that.data.mobile
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
                // wx.navigateTo({//刷新页面
                //   url: 'IWillfeedback ',
                // })
              }

           

            }
          })
        } else {

        }
      }
    })

  },

  getcode2: function () {
    console.log(this.data.contactinfo);


    //手机验证
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

    if (this.data.contactinfo == undefined || this.data.contactinfo == "") {
      wx.showToast({
        title: '联系方式为空',
        icon: 'success',
        duration: 1000
      })
      return;
    } else if (!myreg.test(this.data.contactinfo)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      });
      return;

    }



    var that = this;

    that.setData({
      isshowverification2: "countDown"
    })

    //60秒倒计时
    var countdown = 60;
    var settime = function (that) {

      if (countdown == 0) {
        that.setData({
          isshowverification2: 'getCode'
        })
        countdown = 60;

        return;
      } else {
        that.setData({
          isshowverification2: 'countDown',
          last_time2: countdown
        })

        countdown--;
      }
      setTimeout(function () {
        settime(that)
      }, 1000)

    }

    settime(that);

    wx.showModal({
      title: '提示',
      content: '是否获取验证码？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;

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
                wx.showToast({
                  title: '提交手机号成功',
                  icon: 'success',
                  duration: 1000
                })
              }

              wx.navigateTo({//刷新页面
                url: 'IWillfeedback ',
              })

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

    

    //手机验证
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

    if (this.data.contactinfo == undefined || this.data.contactinfo == "") {
      wx.showToast({
        title: '联系方式为空',
        icon: 'success',
        duration: 1000
      })
      return;
    } else if (!myreg.test(this.data.contactinfo)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      });
      return;

    }

    var that = this
    wx.showModal({
      title: '提示',
      content: '是否绑定手机？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;

          wx.request({
            // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
            url: getApp().globalData.netUrl + '/api/user/profile/changeMobile',
            data: {
              mobile: that.data.contactinfo,
              verification_code: that.data.contactinfo2,
              verification_code_new:that.data.contactinfo3,
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
                  title: '申请提交',
                  icon: 'success',
                  duration: 1000
                })
              }


              wx.navigateTo({//刷新页面
                url: 'IWillfeedback ',
              })

            }
          })
        } else {

        }
      }
    })


  }

})