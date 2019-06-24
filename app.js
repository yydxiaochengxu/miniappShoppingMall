//app.js
App({
  onLaunch: function () {
    
  },
  // 授权（获取权限）
  getPower_js: function (power, callback, rightaway) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting[power]) {
          callback && callback();
        } else {
          wx.authorize({
            scope: power,
            success() {
              rightaway && callback();
            },
            fail: function () {
              showModal_js()
            }
          })
        }
      }
    });
    function showModal_js() {
      wx.showModal({
        title: '提示',
        cancelText: '残忍拒绝',
        confirmText: '重新授权',
        content: '您拒绝了授权，如想正常使用功能，请重新授权！',
        success: function (res) {
          if (res.confirm) {
            openSetting_js();
          } else if (res.cancel) {
            //残忍拒绝
          }
        }
      })
    };
    function openSetting_js() {
      wx.openSetting({
        success: (res) => {
          if (res.authSetting[power]) {
            rightaway && callback();
          } else {
            showModal_js();
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})