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
    diaryList:[]
  },
  
  goToIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  onLoad:function(){
    var Diary = Bmob.Object.extend("diary");
    var query = new Bmob.Query(Diary);
    query.get("4fbcd0fb9c", {
      success: function (result) {
        // The object was retrieved successfully.
        console.log("该日记标题为" + result.get("title"));
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
  },
  onShow:function(){
    console.log('onLoad')
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function(){
    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
});