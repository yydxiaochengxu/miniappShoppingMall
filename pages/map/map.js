
// // AppKey：2ae786ce8965b877f817c9820b01a3f5
// // http://apis.juhe.cn/geo/
// // http://apis.juhe.cn/geo/?key=您申请的APPKEY&lat=39.907314&lng=116.391279&type=1
// let QQMapWX = require('../../js/qqmap-wx-jssdk.js');
// let qqmapsdk = new QQMapWX({
//   // key: 'ZDYBZ-TFHW4-4BPUE-D54JC-FEP6J-NXBSQ'
//   key: '5KSBZ-D3XAI-RVOG3-5CNKG-BPWD7-QWB72'
// });
// let app = getApp();
// let ids = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showQizi: false,

    showSubMenu: false,

    polyline: [],
    markers: [
      {
        iconPath: "../../images/location.png",
        id: 0,
        latitude: '29.888888799670912',
        longitude: '110.48809747535707',
        width: 30,
        height: 30,
        callout: {
          content: '目的地',
          color: '#ffffff',
          fontSize: 8,
          padding: 2,
          bgColor: '#FF5500',
          borderRadius: 4,
          display: 'ALWAYS',
        }
      }
    ],
    hiddenmeLocation: true,//隐藏我的
  },

  vo: {
    address: {},
    polyline: [
      {
        points: [],
        color: '#FF5500', arrowLine: true, width: 2, dottedLine: true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const db = wx.cloud.database({
    //     env: 'place'
    // })
    // console.log(db)
    // db.collection('important-place').doc('5bc59024f66fd8598c399c42').get().then(res => {
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    // }).catch(err=>{
    //     console.error(err)
    // })
    // const todos = db.collection('Important_place').where({
    //     publishInfo: {
    //         country: 'United States'
    //     }
    // }).get({
    //     success: function (res) {
    //         // 输出 [{ "title": "The Catcher in the Rye", ... }]
    //         console.log(res)
    //     }
    // })

    let that = this;
    var opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=29.81736,110.42307&to=29.888888799670912,110.48809747535707&key=5KSBZ-D3XAI-RVOG3-5CNKG-BPWD7-QWB72',
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        console.log('成功')
        console.error(res)
        var ret = res.data
        if (ret.status != 0) return; //服务异常处理
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        //设置polyline属性，将路线显示出来
        that.setData({
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 2
          }]
        })
      },
      fail: function () {
        console.log('失败')
      }
    };
    wx.request(opt);


    // qqmapsdk.calculateDistance({
    //     //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
    //     //from参数不填默认当前地址
    //     //获取表单提交的经纬度并设置from和to参数（示例为string格式）
    //     from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
    //     to: [{
    //         latitude:39.984060,
    //         longitude:116.307520
    //       }], //终点坐标
    //     success: function(res) {//成功后的回调
    //         console.log('zzzzzzzzzzzzzzzz')
    //       console.log(res);
    //       var res = res.result;
    //     },
    //     fail: function(error) {
    //       console.error(error);
    //     },
    //     complete: function(res) {
    //       console.log(res);
    //     }
    // });
  },

  // 经纬度 => 地名（ajax请求）
  // getloccationName_js(latitude,longitude){
  //     app.vo.tool.request_js(latitude,longitude)
  //         .then(backdata=>{
  //             console.error(backdata)
  //         })
  //         .catch(err=>{
  //             console.error(err)
  //         })
  // },

  renderMapLine(url, callback) {
    let that = this;
    var opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      // url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=29.81736,110.42307&to=29.888888799670912,110.48809747535707&key=5KSBZ-D3XAI-RVOG3-5CNKG-BPWD7-QWB72',
      url: url,
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        console.log('成功')
        console.error(res)
        var ret = res.data
        if (ret.status != 0) return; //服务异常处理
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        //设置polyline属性，将路线显示出来
        that.setData({
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 2
          }],
          showSubMenu: false
        })
        callback && callback();
      },
      fail: function () {
        console.log('失败')
      }
    };
    wx.request(opt);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.MapContext = wx.createMapContext('map');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  maptap_Fn: function (e) {
    console.error(e)
  },

  // 查看我的位置
  meLocation_Fn() {
    let that = this;
    that.newMeLocation(myAddressObj => {
      that.MapContext.moveToLocation()
      that.setData({ hiddenmeLocation: false }, () => {
        setTimeout(() => {
          that.setData({ hiddenmeLocation: true })
        }, 6000)
      })
    })
  },

  newMeLocation: function (cb) {
    let that = this;
    app.getpower_js('scope.userLocation', () => {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          console.error(res)
          var latitude = res.latitude;
          var longitude = res.longitude;
          cb && cb({ latitude, longitude });
        },
        fail: function () {
          console.log("失败")
        }
      })
    }, true);
  },

  // 导航
  daohang_Fn: function () {
    let that = this;
    let showSubMenu = that.data.showSubMenu;
    if (!showSubMenu) {
      that.setData({ showSubMenu: true })
    } else {
      that.setData({ showSubMenu: false })
    }
  },
  buLine_Fn: function () {
    let that = this;
    let targetAddress = that.vo.address;
    that.newMeLocation(melocation => {
      console.log(melocation)
      console.warn(targetAddress)
      let url = `https://apis.map.qq.com/ws/direction/v1/walking/?from=${melocation.latitude},${melocation.longitude}&to=${targetAddress.latitude},${targetAddress.longitude}&key=5KSBZ-D3XAI-RVOG3-5CNKG-BPWD7-QWB72`;
      that.renderMapLine(url);
    });
  },
  bickLine_Fn: function () {
    let that = this;
    let targetAddress = that.vo.address;
    that.newMeLocation(melocation => {
      let url = `https://apis.map.qq.com/ws/direction/v1/bicycling/?from=${melocation.latitude},${melocation.longitude}&to=${targetAddress.latitude},${targetAddress.longitude}&key=5KSBZ-D3XAI-RVOG3-5CNKG-BPWD7-QWB72`;
      that.renderMapLine(url);
    });
  },
  carLine_Fn: function () {
    let that = this;
    let targetAddress = that.vo.address;
    that.newMeLocation(melocation => {
      let url = `https://apis.map.qq.com/ws/direction/v1/driving/?from=${melocation.latitude},${melocation.longitude}&to=${targetAddress.latitude},${targetAddress.longitude}&key=5KSBZ-D3XAI-RVOG3-5CNKG-BPWD7-QWB72`;
      that.renderMapLine(url);
    });
  },
  // 选择位置
  chooseOther_Fn: function () {
    let that = this;
    let showQizi = that.data.showQizi;
    if (showQizi) {//完成
      that.MapContext.getCenterLocation({
        success(res) {
          console.error(res)
          let { latitude, longitude } = res;
          that.vo.address = { latitude, longitude }
          let markers = that.data.markers;
          let obj = {
            iconPath: "../../images/location1.png",
            id: ++ids,
            latitude: latitude,
            longitude: longitude,
            width: 30,
            height: 30
          }
          markers.push(obj)
          that.setData({ markers, showQizi: false })
        }
      })
    } else {
      that.setData({ showQizi: true })
    }
  },

  // // 划线
  // polyline_Fn() {
  //     let that = this;
  //     let markers = that.data.markers;
  //     let polyline = [
  //         {
  //             points: [],
  //             color: '#FF5500', arrowLine: true, width: 2, dottedLine: true
  //         }
  //     ];
  //     if (markers.length < 2) {
  //         wx.showModal({
  //             title: '温馨提示',
  //             content: '先查看附近位置，并选择'
  //         })
  //         return false;
  //     }
  //     for (let item of markers) {
  //         let obj = {};
  //         obj.latitude = item.latitude;
  //         obj.longitude = item.longitude;
  //         polyline[0].points.push(obj);
  //     }
  //     that.setData({ polyline })
  // },

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