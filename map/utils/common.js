function showTip(sms, icon, fun, t) {
    if (!t) {
        t = 1000;
    }
    wx.showToast({
        title: sms,
        icon: icon,
        duration: t,
        success: fun
    })
}

function showModal(c,t,fun) {
    if(!t)
        t='提示'
    wx.showModal({
        title: t,
        content: c,
        showCancel:false,
        success: fun
    })
}

// 加载框
function dataLoading(txt, icon, fun) {
  wx.showToast({
    title: txt,
    icon: icon,
    duration: 500,
    success: fun
  })
}
module.exports.dataLoading = dataLoading;



module.exports.showTip = showTip;
module.exports.showModal = showModal;