// pages/personalPage/addressmanager/editAddress/editAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    isShowSelectAddress:"none",
    user_name:"",
    tel_number:"",
    province_name:"",
    city_name: "",
    county_name: "",
    detail_info:"",
    tag1color:"tagcolornoselected",
    tag2color:"tagcolornoselected",
    tag3color:"tagcolornoselected",
    tag4color:"#fff",
    tag:"",
    provinceList:"",
    selectprovinceId:"",
    selectcityid: "",
    selectcountyid: "",
    selectprovinceFid:"",
    selectcityFid: "",
    selectcountyFid: "",
    selectprovinceName: "",
    selectcityName: "",
    selectcountyName: "",
    isShowSelectAddress:"none",
    currentarealeft:"14vw",
    areaname:"区域"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    wx.setNavigationBarTitle({
      title: '编辑地址'
    });

    var is_defaultStr;
    var is_defaultsubmitStr;
    if (options.is_default=="null"){
      is_defaultStr=null;
      is_defaultsubmitStr=0;
    }else{
      is_defaultStr="checked";
      is_defaultsubmitStr = 1;

    }

    //获取页面跳转参数
    var id = options.id;
    var user_name = options.user_name;
    var tel_number = options.tel_number;
    var province_name = options.province_name;
    var city_name = options.city_name;
    var county_name = options.county_name;
    var detail_info = options.detail_info;
    var tag = options.tag;
    var is_default = is_defaultStr;


    console.log("id:" + id);

    if(tag==0){
      this.setData({
        tag1color: "tagcolorselected"
        
      })
      
    } else if (tag == 1){
      this.setData({
        tag2color: "tagcolorselected"

      })
    } else if (tag == 2) {
      this.setData({
        tag2color: "tagcolorselected"

      })
    } else if (tag == 3) {
      this.setData({
        tag3color: "#1D82FE"

      })
    }

    console.log('user_name：' + user_name);    

    this.setData({
      user_name: user_name,
      tel_number: tel_number,
      province_name:province_name,
      city_name: city_name,
      county_name: county_name,
      detail_info: detail_info,
      tag: tag,
      id: id,
      is_default: is_default,
      is_defaultsubmit: is_defaultsubmitStr
    })
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
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
  goBack:function(){
    wx.navigateBack({
      
    });
  },
  usernameInput:function(e){
  
    console.log(e.detail.value);
    this.setData({
      user_name: e.detail.value,
    });
  }
  ,
  usernameInput2:function(e){
    console.log(e.detail.value);
    this.setData({
      tel_number: e.detail.value,
    });
  },
  usernameInput3:function(e){
    console.log(e.detail.value);
    this.setData({
      detail_info: e.detail.value,
    });
  },
  showselectregion:function(){
    this.setData({
      isShowSelectAddress:"block"
    })

    var that=this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/citys',//获取省列表
      data: {
        id:"1"
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res.data.data);

     


        that.setData({
          provinceList: res.data.data,
          currentarealeft:"14vw"
        });



      }
    })

    
  },
  closrdialog:function(){
    
    this.setData({
      isShowSelectAddress: "none"
    })
  },
  clickdialogSelect:function(e){
    
    this.setData({
      isShowSelectAddress: "block"
    })
    
  },
  addresstag1:function(){
    this.setData({
      tag1color: "tagcolorselected",
      tag2color: "tagcolornoselected",
      tag3color: "tagcolornoselected",
      tag4color: "#fff",
      tag:0
    })
  }
  ,
  addresstag2: function () {
    this.setData({
      tag1color: "tagcolornoselected",
      tag2color: "tagcolorselected",
      tag3color: "tagcolornoselected",
      tag4color: "#fff",
      tag: 1
    })
  }
  ,
  addresstag3: function () {
    this.setData({
      tag1color: "tagcolornoselected",
      tag2color: "tagcolornoselected",
      tag3color: "tagcolorselected",
      tag4color: "#fff",
      tag: 2
    })
  }
  ,
  addresstag4: function () {
    this.setData({
      tag1color: "#fff",
      tag2color: "#fff",
      tag3color: "#fff",
      tag4color: "#1D82FE",
      tag: 3
    })
  },
  selectprovince:function(e){

    console.log(e);

    var id = e.currentTarget.id;
    var region_name = e.currentTarget.dataset.region_name;
    var datalevel = e.currentTarget.dataset.level;
    var fid = e.currentTarget.dataset.fid;

    
    if (datalevel==1){
      this.setData({
        selectprovinceId: id,
        selectprovinceFid: fid,
        selectprovinceName: region_name,
            province_name: region_name

      })

    }else if (datalevel == 2) {
      this.setData({
        selectcityid: id,
        selectcityFid: fid,
        selectcityName: region_name,
        city_name: region_name,

      })

    }else if (datalevel ==3) {
      this.setData({
        selectcountyid: id,
        selectcountyFid: fid,
        selectcountyName: region_name,
        county_name: region_name,

      })
    }

    this.setData({
      provinceList: null
    })

    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/citys',//获取省列表
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res.data.data);


        that.setData({
          provinceList: res.data.data,
        })
        if (that.data.currentarealeft=="34vw"){
          that.setData({
            provinceList: res.data.data,
            currentarealeft: "54vw"

          });
        } else if (that.data.currentarealeft == "54vw"){
          that.setData({
            provinceList: res.data.data,
            currentarealeft: "34vw;display:none"

          });
        }else{
          that.setData({
            provinceList: res.data.data,
            currentarealeft: "34vw"

          });
        }

      }
    })
  },
  selectaddname:function(e){
    var fid = e.currentTarget.dataset.fid;


    this.setData({
      provinceList: null
    });
    
    var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/citys',//获取省列表
      data: {
        id: fid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res.data.data);




        that.setData({
          provinceList: res.data.data,
          currentarealeft: "54vw"

        });



      }
    })

  },
  editaddress:function(e){
    console.log("this.data.user_name:" + this.data.user_name); 
    console.log("this.data.tel_number:" + this.data.tel_number); 
    console.log("this.data.province_name:" + this.data.province_name); 
    console.log("this.data.city_name:" + this.data.city_name); 
    console.log("this.data.county_name:" + this.data.county_name); 
    console.log("this.data.detail_info:" + this.data.detail_info); 
    console.log("this.data.tag:" + this.data.tag);
    console.log("e.currentTarget.id:" + e.currentTarget.id);


    console.log("is_default," + this.data.is_default);
    

    //收件人为空
    if (this.data.user_name == undefined || this.data.user_name == "") {
      wx.showToast({
        title: '收件人为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    //手机验证
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

    console.log(this.data.tel_number,"this.data.tel_number");
    if (this.data.tel_number == undefined || this.data.tel_number == "") {
      wx.showToast({
        title: '联系方式为空',
        icon: 'success',
        duration: 1000
      })
      return;
    } else if (!myreg.test(this.data.tel_number)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      });
      return;

    }


    //省为空
    if (this.data.province_name == undefined || this.data.province_name == "") {
      wx.showToast({
        title: '省地址为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    //城市为空
    if (this.data.city_name == undefined || this.data.city_name == "") {
      wx.showToast({
        title: '城市为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    //区域为空
    if (this.data.county_name == undefined || this.data.county_name == "") {
      wx.showToast({
        title: '区域为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    //详细地址为空
    if (this.data.detail_info == undefined || this.data.detail_info == "") {
      wx.showToast({
        title: '详细地址为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }

    //地址标签为空

    if (this.data.tag == undefined || this.data.tag == "") {
      wx.showToast({
        title: '地址标签为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }
    

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

    // var that = this;
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/user/address/edit',//修改地址
      data: {
        id: this.data.id,
        user_name: this.data.user_name,
        tel_number: this.data.tel_number,
        province_name: this.data.province_name,
        city_name: this.data.city_name,
        county_name: this.data.county_name,
        detail_info: this.data.detail_info,
        tag: this.data.tag,
        receiver_lat:this.data.wd,
        receiver_lng:this.data.jd,
        is_default: this.data.is_defaultsubmit

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
          that.goBack();
        }

      }
    });


  },
  checkboxchange:function(e){
    console.log(e);
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    console.log(e.detail.value.length,"e.detail.value.length");

    if (e.detail.value.length==0){
      
      this.setData({
        is_defaultsubmit:0
      })
    }else if(e.detail.value.length==1){
      this.setData({
        is_defaultsubmit:1
      })
    }

  }
  ,
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
})