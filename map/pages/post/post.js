//获取应用实例
var app = getApp()
var Bmob = require("../../utils/bmob.js");
var common = require('../template/getCode.js')
var that;
var myDate = new Date();
//格式化日期
function formate_data(myDate) {
  let month_add = myDate.getMonth() + 1;
  var formate_result = myDate.getFullYear() + '-'
    + month_add + '-'
    + myDate.getDate()
  return formate_result;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    notice_status: false,
    accounts: ["微信号", "QQ号", "手机号"],
    accountIndex: 0,
    peopleHide: false,
    islocal:false,
    isAgree: false,
    date: formate_data(myDate),
    address: '点击选择位置',
    longitude: 0, //经度
    latitude: 0,//纬度
    showTopTips: false,
    TopTips: '',
    noteMaxLen: 200,//备注最多字数
    content: "",
    noteNowLen: 0,//备注当前字数
    types: ["运动", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他"],
    range:[10,50,100,1000,10000],
    timelength:[1,3,5],
    typeIndex: "0",
    rangeIndex:"0",
    timelengthIndex: "1",
    showInput: false,//显示输入真实姓名,
    localx:0,
    localy:0,
    slocalx: 0,
    slocaly: 0,
    url:'',
    isSrc:false,
    picturename:'',
    ischecked:false,
  },

  tapNotice: function (e) {
    if (e.target.id == 'notice') {
      this.hideNotice();
    }
  },
  showNotice: function (e) {
    this.setData({
      'notice_status': true
    });
  },
  hideNotice: function (e) {
    this.setData({
      'notice_status': false
    });
  },


  //字数改变触发事件
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      content: value, noteNowLen: len
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({//初始化数据
      src: "",
      isSrc: false,
      ishide: "0",
      autoFocus: true,
      isLoading: false,
      loading: true,
      isdisabled: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideToast()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var myInterval = setInterval(getReturn, 500); ////半秒定时查询
    function getReturn() {
      wx.getStorage({
        key: 'user_openid',
        success: function (ress) {
          if (ress.data) {
            clearInterval(myInterval)
            that.setData({
              loading: true
            })
          }
        }
      })
    }
  },

  //上传活动图片
  uploadPic: function () {//选择图标
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], //压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isSrc: true,
          src: tempFilePaths
        })
      }
    })
  },

  //删除图片
  clearPic: function () {//删除图片
    that.setData({
      isSrc: false,
      surl: ""
    })
  },

  //上传活动群二维码
  uploadCodePic: function () {//选择图标
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],//压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isCodeSrc: true,
          codeSrc: tempFilePaths
        })
      }
    })
  },

  //删除活动群二维码
  clearCodePic: function () {
    that.setData({
      isCodeSrc: false,
      codeSrc: ""
    })
  },

  //限制人数
  switch1Change: function (e) {
    if (e.detail.value == false) {
      this.setData({
        peopleHide: false
      })
    } else if (e.detail.value == true) {
      this.setData({
        peopleHide: true
      })
    }
  },
  //是否当前位置
  switch2Change: function (e) {
    if (e.detail.value == false) {
      var that = this;
      var slocalx = that.data.slocalx;
      var slocaly = that.data.slocaly;
      this.setData({
        islocal: false,
        localx:slocalx,
        localy:slocaly,
        address:'点击选择位置',
      })
      console.log('x' + that.data.localx);
      console.log('y' + that.data.localy);
    } else if (e.detail.value == true) {
      this.setData({
        islocal: true
      })
      var that = this;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          that.setData({
            localy: latitude * 100000,
            localx: longitude * 100000,
            address:'用户当前位置'
          })
          console.log('x' + that.data.localx);
          console.log('y' + that.data.localy);
        },
      })
    }
  },

  //改变时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //改变消息类别
  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  //改变消息范围
  bindRangeChange: function (e) {
    this.setData({
      rangeIndex: e.detail.value
    })
  },
  //改变有效时长
  bindlengthChange: function (e) {
    this.setData({
      timelengthIndex: e.detail.value
    })
  },
  //选择地点
  chooseLocation:function(e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name,
          localx: res.longitude*100000, //经度
          localy: res.latitude * 100000,//纬度
          slocalx: res.longitude * 100000, //存经度
          slocaly: res.latitude * 100000,//存纬度
        })
        if (e.detail && e.detail.value) {
          this.data.address = e.detail.value;
        }
        console.log('x' + that.data.localx);
        console.log('y' + that.data.localy);
      },
      fail: function (e) {
      },
      complete: function (e) {
      }
    })
  },
  addressChange: function (e) {
    this.addressChoose(e);
  },
  addressChoose: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name,
          localx: res.longitude * 100000, //经度
          localy: res.latitude * 100000,//纬度
          slocalx: res.longitude * 100000, //存经度
          slocaly: res.latitude * 100000,//存纬度
        })
        if (e.detail && e.detail.value) {
          this.data.address = e.detail.value;
        }
        console.log('x' + that.data.localx);
        console.log('y' + that.data.localy);
      },
      fail: function (e) {
      },
      complete: function (e) {
      }
    })
  },

  //改变联系方式
  bindAccountChange: function (e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },

  //同意相关条例
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length,
      showInput: !this.data.showInput
    });
  },

  //表单验证
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  //提交表单
  submitForm: function (e) {
    var that = this;
    var title = '';
    var address = this.data.address
    var typeIndex = this.data.typeIndex;
    var acttype = 1 + parseInt(typeIndex);
    var acttypename = getTypeName(acttype); //获得类型名称
    var rangeIndex = this.data.rangeIndex;//获得消息范围
    var range = this.data.range
    var rangenum = parseInt(rangeIndex)
    var distance =  range[rangenum]
    var timelengthIndex = this.data.timelengthIndex;//获得有效时长
    var timelength = this.data.timelength
    var timelengthnum = parseInt(timelengthIndex)
    var length = timelength[timelengthnum]
    var localx = this.data.localx; //经度
    var localy = this.data.localy;//纬度
    var switchHide = e.detail.value.switchHide;
    var peoplenum = e.detail.value.peoplenum;
    console.log(peoplenum);
    var content = e.detail.value.content;
    if (address == '点击选择位置') {
      this.setData({
        showTopTips: true,
        TopTips: '请选择地点'
      });
    } else if (switchHide == true && peoplenum == "") {
      this.setData({
        showTopTips: true,
        TopTips: '请输入人数'
      });
    } else if (content == "") {
      this.setData({
        showTopTips: true,
        TopTips: '请输入消息内容'
      });
    } else {
      console.log('校验完毕');
      that.setData({
        isLoading: true,
        isdisabled: true
      })
      //向 news 表中新增一条数据
      wx.getStorage({
        key: 'my_nick',
        success: function (ress) {
          var News = Bmob.Object.extend("news");
          var news = new News();
          var id = ress.data;
          news.set('Nick',id),
          news.set("kind", acttypename);
          news.set("x", localx);//经度
          news.set("y", localy);//纬度
          news.set("news", content);
          news.set("range",distance);
          news.set("timelength",length);
          if (that.data.isSrc == true) {
            var name = that.data.src; //上传图片的别名
            var file = new Bmob.File(name,that.data.src);
            file.save()
            news.set("picture", file);
          }
          //添加数据，第一个入口参数是null
          news.save(null, {
            success: function (result) {
              // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
              console.log("日记创建成功, objectId:" + result.id);
              common.dataLoading("发起成功", "success", function () {
                
                //重置表单
                that.setData({
                  address: '点击选择位置',
                  longitude: 0, //经度
                  latitude: 0,//纬度
                  showTopTips: false,
                  TopTips: '',
                  noteMaxLen: 200,//备注最多字数
                  content: "",
                  noteNowLen: 0,//备注当前字数
                  types: ["运动", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他"],
                  range: [10, 50, 100, 1000, 10000],
                  timelength: [1, 3, 5],
                  typeIndex: "0",
                  rangeIndex: "0",
                  timelengthIndex: "1",
                  showInput: false,//显示输入真实姓名,
                  localx: 0,
                  localy: 0,
                  slocalx: 0,
                  slocaly: 0,
                  notice_status: false,
                  peopleHide: false,
                  islocal: false,
                  isAgree: false,
                  isloading:false,
                  isdisabled: false,
                  ischecked:false,
                });
              }
              )
            },
        
            error: function (result, error) {
              // 添加失败
              console.log('创建日记失败');
              console.log("发布失败=" + error);
              common.dataLoading("发起失败", "loading");
              that.setData({
                isLoading: false,
                isdisabled: false
              })
            
            }
            }
          )  
        }
      })
   }
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 1000);
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

//根据活动类型获取活动类型名称
function getTypeName(acttype) {
  var acttypeName = "";
  if (acttype == 1) acttypeName = "运动";
  else if (acttype == 2) acttypeName = "游戏";
  else if (acttype == 3) acttypeName = "交友";
  else if (acttype == 4) acttypeName = "旅行";
  else if (acttype == 5) acttypeName = "读书";
  else if (acttype == 6) acttypeName = "竞赛";
  else if (acttype == 7) acttypeName = "电影";
  else if (acttype == 8) acttypeName = "音乐";
  else if (acttype == 9) acttypeName = "其他";
  return acttypeName;
}