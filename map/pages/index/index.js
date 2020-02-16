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
    circles: [],
    virus:[],
    site:[],
  },

  goToAdd: function () {
    wx.navigateTo({
      url: "../post/post"
    });
    
  },

  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },

  bindcallouttap: function (e) {
    console.log("头上文字被点击", e);
  },
  markertap: function (e) {
    console.log("定位的点被点击", e);
    var id = e.markerId-1;
    wx.showModal({
      title: this.data.virus[id]['source'],
      content: this.data.virus[id]['locale'] +',\r\n'+ this.data.virus[id]['address'],
      showCancel: false,
    })
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
      that.setData({
        markers: wxMarkerData,
        site: data.originalData.result.addressComponent,
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      that.setData({
        circles: [{
          latitude: wxMarkerData[0].latitude,
          longitude: wxMarkerData[0].longitude,
          color: '#F0FFFF',
          fillColor: '#7cb5ec88',
          radius: 1000,
          strokeWidth: 2
        }]
      });

      wx.request({
        url: app.globalData.pubSiteUrl + 'Info/list', //url
        method: 'GET', //请求方式
        header: {
          'Content-Type': 'application/json',
          'token': app.globalData.token,
        },
        data: {
          // activityId: options.id,  //参数
          u_id: 17,
          latitude: wxMarkerData[0].latitude,
          longitude: wxMarkerData[0].longitude,
        },
        success: function (res) {
          if (res.data.status == 200) {
            that.setData({
              markers: that.data.markers.concat(res.data.data),
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

      wx.request({
        url: app.globalData.pubSiteUrl + 'Info/special', //url
        method: 'GET', //请求方式
        header: {
          'Content-Type': 'application/json',
          'token': app.globalData.token,
        },
        data: {
          province: that.data.site.province,
          city: that.data.site.city,
          district: that.data.site.district,
        },
        success: function (res) {
          if (res.data.status == 200) {
            if(res.data.data.length == 0){
              wx.showModal({
                title: '系统通知',
                content: '当前区域没有异常或受到管理影响暂无数据!',
                showCancel: false,
              })
            }
            that.setData({
              markers: that.data.markers.concat(res.data.data),
              virus: res.data.data,
            })
          }else{
            wx.showModal({
              title: '系统通知',
              content: '当前请求人数过多请稍后再试!',
              showCancel: false,
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

    }
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
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