//login.js
//获取应用实例
var app = getApp();
var Bmob = require("../../utils/bmob.js");
var common = require('../template/getCode.js');
var that;
var myDate = new Date();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    location: {},
    diaryList:[]
  },
  
  goToIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  getUserLocation: function (that) {
    wx.authorize({
      scope: 'scope.userLocation',
      success(e) {
        wx.getLocation({
          success: function (res) {
            wx.setStorageSync('latitude', res.latitude);
            wx.setStorageSync('longitude', res.longitude);
            wx.setStorageSync('altitude', res.altitude);
          },
        });
      },
      fail(e) {
        wx.showToast({
          title: '消息需要您的位置呢亲~',
          image: '../../img/fail.png',
          duration: 3000
        })
      }
    })
  },

  getUserInfo:function(e){
    
    if (e.detail.errMsg == "getUserInfo:ok"){
      var str = e.detail.rawData;
      var userInfo = JSON.parse(str);

      this.setData({
        userInfo: userInfo
      })
      wx.setStorageSync('nickName', userInfo.nickName);
      wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
      wx.setStorageSync('gender', userInfo.gender);
      wx.setStorageSync('language', userInfo.language);
      wx.setStorageSync('city', userInfo.city);
      wx.setStorageSync('province', userInfo.province);
      wx.setStorageSync('country', userInfo.country);

      // wx.request({
      //   url: that.globalData.pubSiteUrl + 'verifyUser', //url
      //   method: 'GET', //请求方式
      //   header: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: {
      //     code: res.code
      //   },
      //   success: function (res) {
      //     if (res.data.status == 200) {
      //       wx.setStorageSync('session_key', res.data.data.session_key);
      //       wx.setStorageSync('openid', res.data.data.openid);
      //     }
      //   }
      // });

      this.goToIndex();
    }else{
      wx.showToast({
        title: '点确定~亲~',
        image: '../../img/fail.png',
        duration: 3000
      })
    }
  },

  onLoad:function(){
    
  },
  onShow:function(){
    var that = this;
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          that.getUserLocation(that);
        }
      }
    })
  },
  onReady: function(){
    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
    // wx.onAccelerometerChange(function(res) {
    //   var angle = -(res.x*30).toFixed(1);
    //   if(angle>14){ angle=14; }
    //   else if(angle<-14){ angle=-14; }
    //   if(_this.data.angle !== angle){
    //     _this.setData({
    //       angle: angle
    //     });
    //   }
    // });
  },
  
});