//app.js
App({
  onLaunch: function() {//小程序启动时调用
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("logs:" + logs);


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
                      console.log("user_nickname:"+res.data.data.user.user_nickname);
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

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    netUrl:"https://api.xshtc.net",
    XXApiVersion:"1.0.0",
    userInfo: null,
    token:null,
    mobile:"无",
    user_nickname:""
  }
})
