//获取应用实例
const App = getApp()
var that;
var common = require('../template/getCode.js');
var Bmob = require("../../utils/bmob.js");
var util = require('../../utils/util.js');
Page({
  data: {
    array: [100,1000, 10000, 100000],
    kind: ["全部","运动", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他"],
    index1: 0,
    index2: 0,
    index3: 0,
  },
  //清空消息
  clearmynews:function(){
    wx.getStorage({
      key: 'my_nick',
      success: function (res) {
        var id = res.data;
        var query = new Bmob.Query('news');
        query.equalTo("Nick", id);
        query.find().then(function (todos) {
          return Bmob.Object.destroyAll(todos);
        }).then(function (todos) {
          console.log(todos);
          // 删除成功
        }, function (error) {
          // 异常处理
        });
      }
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var index = e.detail.value;
    var array = that.data.array;
    var range = array[index];
    App.globalData.rchoose = range;
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var index = e.detail.value;
    var array = that.data.array;
    var range = array[index];
    App.globalData.rlocal = range;
    console.log(App.globalData.rlocal);
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var index = e.detail.value;
    var kind = that.data.kind;
    var variety = kind[index];
    App.globalData.kind = variety;
    console.log(App.globalData.kind);
    this.setData({
      index3: e.detail.value
    })
  },

})
