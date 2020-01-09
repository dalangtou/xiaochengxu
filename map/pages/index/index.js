var bmap = require('../../libs/bmap-wx.min.js');
var bmap_css = require('../../libs/bmap_css.js');
var wxMarkerData = [];
const key = '7DwOpTyjRK3HGQR9UapjKUXA4ce5s0oO';
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {}
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
      console.log(data)
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