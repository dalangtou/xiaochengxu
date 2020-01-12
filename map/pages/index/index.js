var bmap = require('../../libs/bmap-wx.min.js');
var bmap_css = require('../../libs/bmap_css.js');
var wxMarkerData = [];
var app = getApp();
const key = '7DwOpTyjRK3HGQR9UapjKUXA4ce5s0oO';
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
    list:[]
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: key
    });
    var fail = function (data) {
      // console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(data.wxMarkerData)
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });

    this.data.list.forEach(function (item, index) {
      console.log(item);
    })
    
    wx.request({
      url: app.globalData.pubSiteUrl + 'Info/list', //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        // activityId: options.id,  //参数
        u_id: 17,
        latitude: 34.76667,
        longitude: 113.65000,
      },
      success: function (res) {
        if (res.data.status == 200) {
          that.setData({
            list: res.data.data,
          })
        }
      },
      fail: function () {
        app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    });
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      rgcData: {
        address: '地址：' + '地址' + '\n',
        desc: '描述：' + '描述' + '\n',
        business: '商圈：' + '商圈'
      }
    });
  }

})
// map.setMapStyleV2({
//   styleId: 'ce00aac213ae4ba8855cdde8957703ea'
// });
// var styleJson = bmap_css;
// map.setMapStyleV2({
//    styleJson: styleJson 
//    });