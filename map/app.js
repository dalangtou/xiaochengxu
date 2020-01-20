//app.js
import Touches from './utils/Touches.js'
var common = require("utils/common.js");
const __utils = require('utils/util')

App({
  version: 'v1.0.0', //版本号
  onLaunch: function () {
    var that = this;
    //调用系统API获取设备的信息
    wx.getSystemInfo({
      success: function (res) {
        var kScreenW = res.windowWidth / 375
        var kScreenH = res.windowHeight / 603
        wx.setStorageSync('kScreenW', kScreenW)
        wx.setStorageSync('kScreenH', kScreenH)
      }
    })
    //调用API从本地缓存中获取数据
    try {
      var value = wx.getStorageSync('user_openid')
      if (value) {
      } else {
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: that.globalData.pubSiteUrl + 'verifyUser', //url
                method: 'GET', //请求方式
                header: {
                  'Content-Type': 'application/json',
                  'token': that.globalData.token,
                },
                data: {
                  code: res.code
                },
                success: function (res) {
                  if (res.data.status == 200) {
                    wx.setStorageSync('session_key', res.data.data.session_key);
                    wx.setStorageSync('openid', res.data.data.openid);
                  }
                }
              });
            } else {
              console.log('获取用户登录态失败1！' + res.errMsg)
            }
          },
          complete: function (e) {
            console.log('获取openid 回调函数！' + e)
          }
        });
      }
    } catch (e) {
      console.log("登陆失败")
    }
    wx.checkSession({
      success: function () {
      },
      fail: function () {
        //登录态过期，重新登录
        wx.login()
      }
    })
  },
  onShow: function () {

  },
  formate_data: function (date) {
    let month_add = date.getMonth() + 1;
    var formate_result = date.getFullYear() + '年'
      + month_add + '月'
      + date.getDate() + '日'
      + ' '
      + date.getHours() + '点'
      + date.getMinutes() + '分';
    return formate_result;
  },

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    rchoose:10000,
    rlocal:10000,
    kind:'运动'  },
  onPullDownRefresh: function () {
    //wx.stopPullDownRefresh()
  },
  onError: function (msg) {
  },
  Touches: new Touches(),
  util: __utils,
  globalData:{
    // pubSiteUrl: "http://www.eternity999.cn/shaokang/xiaochengxu/program_api/public/",//服务器
    pubSiteUrl: "http://program-api.com/",//本地
    token:'122b86a4c20dd9ccab58c48042d1f7fd',
  },
  uploadfile: function (path) {
    var that = this;
    var newpath = '';
    wx.uploadFile({
      url: that.globalData.pubSiteUrl + 'Info/uploadFile', //url,
      filePath: path,
      name: 'file',
      header: {
        'Content-Type': 'application/json',
        'token': app.globalData.token,
      },
      success: function (res) { 
        console.log(res);
        if(res.status == 200){
          newpath = res.data;
        }
      }
    });
    return newpath;
  },
})