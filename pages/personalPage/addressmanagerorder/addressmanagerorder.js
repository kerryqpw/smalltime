// pages/personalPage/addressmanager/addressmanager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      addressList:[],
      isshowAddressbutton:"block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址管理'
    });



    console.log("getApp().globalData.netUrl:"+getApp().globalData.netUrl);
    console.log("getApp().globalData.token:" + getApp().globalData.token);
    console.log("getApp().globalData.XXApiVersion:" + getApp().globalData.XXApiVersion);

  
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
    //获取地址列表
    var that = this;


    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/address',
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
        console.log(res,"地址列表");

        // that.setData({
        //   ajaxdata: res.data.list
        // })
        if (res.data.data.length>0){
            that.setData({
              isshowAddressbutton:"block"
            });
        }else{
            that.setData({
              isshowAddressbutton:"block"
            })
        }


        // for (var index in res.data.data) {
        //   if (res.data.data[index].is_default == 1) {
        //     res.data.data[index].is_default = "true";
        //   } else {
        //     res.data.data[index].is_default = null;
        //   }
        // }


        console.log(res.data.data);
        that.setData({
          addressList: res.data.data
        });

        for (var i = 0; i < res.data.data.length;i++){
          var is_defaultitem = "addressList[" + i + "].is_default";//先用一个变量，把(info[0].gMoney)用字符串拼接起来

          if (res.data.data[i].is_default == 1) {
            that.setData({
              [is_defaultitem]: "checked"
            });

          } else {

            that.setData({
              [is_defaultitem]: null
            });
            
          }
       
        }

        console.log(that.data.addressList,"addressList");


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
  addAddress:function(){
     wx.navigateTo({
       url: 'addAddress/addAddress',
     })
  },
  goBack:function(){
    wx.navigateBack({
      
    });
  },
  editAddress:function(e){
    var id = e.currentTarget.id;
    var tel_number = e.currentTarget.dataset.tel_number;
    var user_name = e.currentTarget.dataset.user_name;
    var province_name = e.currentTarget.dataset.province_name;
    var city_name = e.currentTarget.dataset.city_name;
    var county_name = e.currentTarget.dataset.county_name;
    var detail_info = e.currentTarget.dataset.detail_info;
    var tag = e.currentTarget.dataset.tag;
    var detail_info = e.currentTarget.dataset.detail_info;
    var is_default = e.currentTarget.dataset.is_default;

    console.log( e);

    console.log('tel_number:' + e.currentTarget.name);
    wx.navigateTo({
      url: 'editAddress/editAddress?id=' + id + '&tel_number=' + tel_number + '&user_name=' + user_name
      + '&province_name=' + province_name + '&city_name=' + city_name + '&county_name=' + county_name + '&detail_info=' + detail_info + '&tag=' + tag + '&detail_info=' + detail_info+ 
      '&is_default=' + is_default 
    })
  },
  listenerRadioGroup:function(e){
    console.log("listenerRadioGroup");
  },
  deleteAddress:function(e){//删除地址


    console.log( e);

    var id = e.currentTarget.dataset.id;

    console.log("删除id:" + id);



    wx.showModal({
      title: '提示',
      content: '是否删除地址？',
      success: function (res) {
        if (res.confirm) {
          // var that = this;
          //删除地址
          deleteAddressById(id);

        } else {

        }
      }
    })

    function deleteAddressById(id){
      wx.request({
        // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
        url: getApp().globalData.netUrl + '/api/user/address/' + id,
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

          if(res.statusCode==200){
            wx.showToast({
              title: '删除地址成功',
              icon: 'success',
              duration: 1000
            })

            wx.navigateTo({//刷新页面
              url: 'addressmanager',
            })

            // //获取列表中要删除项的下标  
            // var index = e.target.dataset.index;
            // var shoppinglist = that.data.shoppinglist;
            // //移除列表中下标为index的项  
            // shoppinglist.splice(index, 1);
            // //更新列表的状态  
            // that.setData({
            //   shoppinglist: shoppinglist
            // });
          }
          

        }
      })
    }

  },
  settingdefaultAddress:function(e){
      console.log(e);

      var that = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log(res)
          var latitude = res.latitude
          var longitude = res.longitude
          that.setData({
            wd: latitude,
            jd: longitude
          })
        }
      })  

      var is_default = e.currentTarget.dataset.is_default;

      if (is_default==null){
        console.log("设置默认地址");

        // var that = this;
        wx.request({
          // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
          url: getApp().globalData.netUrl + '/api/user/address/edit',//修改地址
          data: {
            id: e.currentTarget.dataset.id,
            user_name: e.currentTarget.dataset.user_name,
            tel_number: e.currentTarget.dataset.tel_number,
            province_name: e.currentTarget.dataset.province_name,
            city_name: e.currentTarget.dataset.city_name,
            county_name: e.currentTarget.dataset.county_name,
            detail_info: e.currentTarget.dataset.detail_info,
            tag: e.currentTarget.dataset.tag,
            receiver_lat: this.data.wd,
            receiver_lng: this.data.jd,
            is_default: 1

          },
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'XX-Token': getApp().globalData.token,
            'XX-Device-Type': 'wxapp',
            'XX-Api-Version': getApp().globalData.XXApiVersion
          },
          success: function (res) {
            console.log(res.data.data);

            if (res.statusCode == 200) {
              //回到地址管理页面
              // wx.navigateTo({//刷新页面
              //   url: 'addressmanager',
              // })

              wx.navigateBack({
                
              });
            }

          }
        });


      }


      if (is_default == "checked") {
        // console.log("取消默认地址");
        // wx.navigateTo({//刷新页面
        //   url: 'addressmanager',
        // })

      }

  },
  settingdefaultAddress02:function(e){
    console.log(e);
  }

})