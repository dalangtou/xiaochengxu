//获取应用实例
var app = getApp()
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
};
const myaudio = wx.createInnerAudioContext();
const RecorderManager = wx.getRecorderManager();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    notice_status: false,
    accounts: ["微信号", "QQ号", "手机号"],
    accountIndex: 0,
    islocal:true,
    isAgree: false,
    date: formate_data(myDate),
    address: '用户当前位置',
    longitude: 0, //经度
    latitude: 0,//纬度
    showTopTips: false,
    TopTips: '',
    noteMaxLen: 200,//备注最多字数
    content: "",
    noteNowLen: 0,//备注当前字数
    types: ["篮球", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他"],
    range:[""],
    timelength:[2],
    typeIndex: "0",
    rangeIndex:"0",
    timelengthIndex: "0",
    showInput: false,//显示输入真实姓名,
    localx:0,
    localy:0,
    slocalx: 0,
    slocaly: 0,
    url:'',
    picturename:'',
    ischecked: true,
    isSrc: false,
    src: "",
    is_voice: false,
    hint_voice: '长按录制语音',
    voice_path: '',
    voice_len: 0,
    hasRecord: false,
    isDot: "block",
    isTouchStart: false,
    isTouchEnd: false,
    value: '100',
    touchStart: 0,
    touchEnd: 0,
    vd: ''
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
  toplay: function(e){
    myaudio.src = this.data.voice_path;
    console.log(myaudio);
    myaudio.play(); 
    myaudio.onPlay((res) => {
      console.log('播放!');
    })
    myaudio.onEnded((res) => {
      console.log('播放结束!');
    })
    myaudio.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
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
    });

    wx.request({
      url: app.globalData.pubSiteUrl + 'Info/postInfo', //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
        'token': app.globalData.token,
      },
      success: function (res) {
        if (res.data.status == 200) {
          that.setData({
            'types': res.data.data.tags,
            'range': res.data.data.confine,
            'timelength': res.data.data.time
          });
        }
      }
    });

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          localy: latitude,
          localx: longitude,
          address: '用户当前位置'
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideToast();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var myInterval = setInterval(getReturn, 500); ////半秒定时查询
    function getReturn() {
      wx.getStorage({
        key: 'openid',
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

  //上传图片
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
      src: ""
    })
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
      console.log('点击选择位置');
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
            localy: latitude,
            localx: longitude,
            address:'用户当前位置'
          })
        },
      })
    }
  },
  switch3Change(e){
    that=this;
    if (e.detail.value == true) {
      wx.authorize({
        scope: "scope.record",
        success: function () {
          // console.log("录音授权成功");
          that.setData({
            is_voice: true,
            hint_voice: '长按录制语音',
          })
        },
        fail: function () {
          console.log("录音授权失败");
        }
      })
    }else{
      that.setData({
        is_voice: false,
      })
    }
  },
  
  /**
   * 长按录音开始
   */
  recordStart: function (e) {
    var n = this;
    n.setData({
      touchStart: e.timeStamp,
      isTouchStart: true,
      isTouchEnd: false,
      showPg: true,
    });
    var parame = {
      duration: 600000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    RecorderManager.start(parame)

    setTimeout(function () {
      RecorderManager.stop()
    }, 15000)
    var a = 15, o = 10;
    this.timer = setInterval(function () {
      n.setData({
        value: n.data.value - 100 / 1500
      }), 
        (o += 10) >= 1e3 && o % 1e3 == 0 && (a-- , console.log(a), a <= 0 && (n.recordTerm(e),
        clearInterval(n.timer), n.setData({
          showPg: false,
        })));
    }, 10);
  },
  /**
   * 长按录音结束
   */
  recordTerm: function (e) {
  var that = this;
    RecorderManager.stop()
    RecorderManager.onStop((res) => {
      this.setData({
        voice_path: res.tempFilePath,
      })
    })

    this.setData({
      isTouchEnd: true,
      isTouchStart: false,
      touchEnd: e.timeStamp,
      showPg: false,
      value: 100
    })
    clearInterval(this.timer)
  },

  //改变消息类别
  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  //限制人群
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
          localx: res.longitude, //经度
          localy: res.latitude,//纬度
          slocalx: res.longitude, //存经度
          slocaly: res.latitude,//存纬度
        })
        if (e.detail && e.detail.value) {
          this.data.address = e.detail.value;
        }
      },
      fail: function (e) {
      },
      complete: function (e) {
      }
    })
  },
  addressChange: function (e) {
    console.log('sssss');
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
    var typeIndex = this.data.typeIndex;
    var acttype = parseInt(typeIndex);//类别下标
    var acttypename = this.data.types[acttype]; //获得类型名称

    var rangeIndex = this.data.rangeIndex;//限制人群
    var rangenum = parseInt(rangeIndex)
    var distance = this.data.range[rangenum]

    var timelengthIndex = this.data.timelengthIndex;//获得有效时长
    var timelengthnum = parseInt(timelengthIndex)
    var length = this.data.timelength[timelengthnum]

    var address = this.data.address
    var localx = this.data.localx; //经度
    var localy = this.data.localy;//纬度

    var switchHide = e.detail.value.switchHide;//当前位置按钮

    var content = e.detail.value.content;//内容

    var is_voice = this.data.is_voice;
    var voice_path = this.data.voice_path;//录音路径

    var isSrc = this.data.isSrc;
    var src = this.data.src;//图片 数组!
    
    if (address == '点击选择位置') {
      this.setData({
        showTopTips: true,
        TopTips: '请选择地点'
      });
    } else if (content == "") {
      this.setData({
        showTopTips: true,
        TopTips: '请输入消息内容'
      });
    } else if (is_voice == true && voice_path == '') {
      this.setData({
        showTopTips: true,
        TopTips: '请输入语音消息'
      });
    } else {
      if (is_voice) {
        voice_path = app.uploadfile(voice_path);
      }
      if (isSrc) {
        console.log(app);
        src = app.uploadfile(src);
      }
      console.log('校验完毕', src, voice_path);
      // that.setData({
      //   isLoading: true,
      //   isdisabled: true
      // })
      console.log(e, src);
      //向 news 表中新增一条数据
      // wx.getStorage({
      //   key: 'my_nick',
      //   success: function (ress) {
          
      //   }
      // })
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
