//logs.js
var app = getApp();
Page({
  data: {
    year:2018
  },
  onLoad: function () {
    this.setData({
      year: new Date().getFullYear()
    });
  }
})
