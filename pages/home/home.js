// pages/home/home.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      { url: '../../images/home/hometop01.jpg' }//, { url: '../../images/home/hometop02.jpg'}
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isshowmystory:"block",
    isshowhomedialog:"none",
    inheritimg:"",
    historyimg:"",
    array: ['成都', '眉山', '乐山', '广元'], 
    urlArray:[],
    content:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '小食逅严选'
    });

    /*
    let orderMap = new Map();
    orderMap.set("idArray:" + this.data.idArray);
    orderMap.set("nameArray:" + this.data.nameArray);
    orderMap.set("priceArray:" + this.data.priceArray);

    console.log( orderMap);
**/


  //首页授权申请
  // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  wx.getSetting({
      success(res) {
          if (!res.authSetting['scope.record']) {
              wx.authorize({
                  scope: 'scope.record',
                  success() {
                      // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                      wx.startRecord()
                  }
              })
          }
      }
  })
    



    console.log("getApp().globalData.token:" + getApp().globalData.token);   


    wx.getUserInfo({
      success: function (res) {

        console.log(res.userInfo.nickName);
        console.log(res.userInfo.avatarUrl);

        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
    })



    var that = this;

    //轮播图接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl+'/api/home/Slides/1',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res.data.data[0].items);

        // that.setData({
        //   ajaxdata: res.data.list
        // })

        that.setData({
          imgUrls: res.data.data[0].items
        });

 

      }
    })

    //首页接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api',
      data: {
        // x: '',
        // y: ''
      },
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res);

        that.setData({
          inheritimg: res.data.data.history[0].image,
          historyimg: res.data.data.history[1].image
        })

    

      }
    });


    //非遗列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/portal/lists/getCategoryPostLists',
      data: {
        category_id: '11'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'XX-Token': getApp().globalData.token,
        'XX-Device-Type': 'wxapp',
        'XX-Api-Version': getApp().globalData.XXApiVersion
      },
      success: function (res) {
        console.log(res,"非遗列表");

        

        that.setData({
          extraglist: res.data.data.list,
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

    //判断是否登录失效
    // islogin();

    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log("登录未过期");
        //token获取与存储
        var token = wx.getStorageSync('token');
        console.log("token:" + token);
        getApp().globalData.token = token;
        getApp().globalData.mobile = wx.getStorageSync('mobile');
        getApp().globalData.user_nickname = wx.getStorageSync('user_nickname');


      },
      fail: function () {
        //登录态过期
        console.log("登录已过期");

        //重新登录
        //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo
            var rawData = res.rawData
            var signature = res.signature
            var encryptedData = res.encryptedData
            var iv = res.iv

            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            let userInfoMap = new Map();
            userInfoMap.set("nickName:" + nickName);
            userInfoMap.set("avatarUrl:" + avatarUrl);
            userInfoMap.set("gender:" + gender);
            userInfoMap.set("province:" + province);
            userInfoMap.set("city:" + city);
            userInfoMap.set("country:" + country);


            /** 
    *map转化为对象（map所有键都是字符串，可以将其转换为对象） 
    */
            function strMapToObj(strMap) {
              let obj = Object.create(null);
              for (let [k, v] of strMap) {
                obj[k] = v;
              }
              return obj;
            }

            var userInfoStr = JSON.stringify(strMapToObj(userInfoMap));
            //登录授权
            wx.login({
              success: function (res) {
                if (res.code) {



                  var token = wx.getStorageSync('token');
                  console.log("token:" + token);

                  wx.request({
                    url: getApp().globalData.netUrl + '/api/wxapp/public/login',
                    data: {
                      code: res.code,
                      // user_info: userInfoStr,
                      raw_data: rawData,
                      signature: signature,
                      encrypted_data: encryptedData,
                      iv: iv

                    },
                    method: 'POST',
                    header: {
                      'Cache-Control': 'no-cache',
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'XX-Token': token,
                      'XX-Device-Type': 'wxapp',
                      'XX-Api-Version': getApp().globalData.XXApiVersion
                    },
                    success: function (res) {
                      console.log(res);
                      // console.log(res.data.data.token);
                      //保存用户信息
                      getApp().globalData.mobile = res.data.data.user.mobile;
                      getApp().globalData.user_nickname = res.data.data.user.user_nickname;
                      console.log("user_nickname:" + res.data.data.user.user_nickname);
                      getApp().globalData.token = res.data.data.token;

                      wx.setStorageSync("mobile", getApp().globalData.mobile);
                      wx.setStorageSync("user_nickname", getApp().globalData.user_nickname);

                      wx.setStorage({
                        key: 'token',
                        data: res.data.data.token,
                        success: function (res) {
                          console.log('异步保存成功');
                        },
                        fail: function () {
                          console.log('异步保存失败');
                        }

                      });
                      console.log("成功");

                    }, fail: function (res) {
                      console.log("失败");

                    }

                  })

                } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
                }
              }
            });


          }
        })


      }
    })


  },
  islogin:function(){

    
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
  //轮播图的切换事件  
  swiperChange: function (e) {
    console.log(e);
    // this.setData({
    //   swiperCurrent: e.detail.current   //获取当前轮播图片的下标
    // })
  },
  inherit:function(){
    wx.navigateTo({
      url: '../chuancheng/chuancheng/chuancheng',
    })
  },
  history:function(){
    wx.navigateTo({
      url: '../historytimenav/historytimenav',
    })
  },

  toinhenitdetail:function(e){
    console.log(e.currentTarget.dataset.id);
    

    wx.navigateTo({
      url: '../inheritdetail/inheritdetail?productid=' + e.currentTarget.dataset.id,
    })
  },

  confirm:function(){

    var that=this;

    console.log(that.data.urlArray);

    //非遗列表接口
    wx.request({
      // url: 'http://52.214.109.210:5000/news?offset=0&limit=10', //仅为示例，并非真实的接口地址
      url: getApp().globalData.netUrl + '/api/portal/articles',
      data: {
          categories: '11',
          post_title:"文章标题",
          post_content: that.data.content,
          more: {
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
        if(res.statusCode==200){

        }

      }
    })

  }
  ,
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
    // wx.navigateTo({
    //   url: '../homesecondfloor/homesecondfloor',
    // })
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
  }, extrageneticListItemClick:function(){
    wx.showToast({
      title: '点击非遗',
      icon: 'success',
      duration: 2000
    })
  },   /* 发布文章相关 **/
  clickmystory:function(){
    this.setData({
      isshowmystory: "none",
      isshowhomedialog: "block"
    })
  },
  clickhomedialog:function(){
    this.setData({
      isshowmystory: "block",
      isshowhomedialog: "none"
    })
  },
  mystorycamera:function(){

    var that=this;

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
            var datajson=JSON.parse(res.data);
            console.log(datajson.data.url);

            var obj={
              "url": datajson.data.url,
              "name":datajson.data.filename
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
          fail:function(res){
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
  contentchange:function(e){
    console.log(e.detail.value);

    this.setData({
      content: e.detail.value
    })
  }  
})

