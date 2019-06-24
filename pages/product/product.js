//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shareimg: ''
  },
  vo: {
    canvasNodeinfo: {},
  },
  onLoad: function () {

  },
  onReady: function () {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        console.log(res)
        let windowWidth = res.windowWidth;
        let rpxpx = windowWidth / 750;
        wx.createSelectorQuery().select('.sharecanvas').boundingClientRect(function (rect) {
          let { width: maxW, height: maxH } = rect;
          that.vo.canvasNodeinfo = { maxW, maxH, rpxpx, pixelRatio: res.pixelRatio };
          that.initCanvas_js();
        }).exec()
      }
    })
  },
  initCanvas_js: function () {
    let that = this;
    let canvasData = {
      usericon: '/images/chanmao.jpg',
      content: '推荐一款我超喜欢的零食给你',
      productname: '小野鸡炖蘑菇',
      productimg: '/images/product7.jpg',
      qrcode: '/images/qrcode.jpg',
      company:'小馋猫零食铺子',
      tip: '长按识别小程序码即可进入'
    }
    function getImgInfo_js(imginfo) {
      // if (!imginfo.src.includes('https:')) {// 上线使用
      //     return Promise.reject('no_https')
      // }
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: imginfo.src,
          success(res) {
            console.error(res)
            let { width, height, path } = res;
            let targetbi = imginfo.w / imginfo.h;
            let realitybi = width / height;
            if (realitybi > targetbi) { // 过宽
              console.log('过宽')
              imginfo.about_showW = targetbi * height;
              imginfo.about_showH = height;
              imginfo.about_clipW = width - targetbi * height;
              imginfo.about_clipH = 0;

            } else { // 过高
              console.log('过高')
              imginfo.about_showW = width;
              imginfo.about_showH = width / targetbi;
              imginfo.about_clipW = 0;
              imginfo.about_clipH = height - width / targetbi;
            }
            imginfo.about_imgW = imginfo.w;
            imginfo.about_imgH = imginfo.h;
            imginfo.about_src = '/' + path;//XXXXXXXXXXXXXXXXXX未完待续
            resolve(imginfo)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    }
    let allimg = [
      {
        src: canvasData.usericon, w: 100, h: 100
      },
      {
        src: canvasData.productimg, w: 450, h: 366
      },
      {
        src: canvasData.qrcode, w: 250, h: 250
      }
    ]
    Promise.all(allimg.map(item => getImgInfo_js(item)))
      .then(([about_user, about_product, about_qrcode]) => {
        console.log([about_user, about_product, about_qrcode])
        canvasData.about_user = about_user;
        canvasData.about_product = about_product;
        canvasData.about_qrcode = about_qrcode;
        that.drawCanvas_js(canvasData);
      })
      .catch(err => {
        console.error(err)
      })
  },

  drawCanvas_js(canvasInfo) {
    console.warn(canvasInfo);
    let that = this;
    let { maxW, maxH, rpxpx, pixelRatio } = that.vo.canvasNodeinfo;
    let ctx = wx.createCanvasContext('myCanvas');

    // 线性渐变
    let grd = ctx.createLinearGradient(maxW / 2, 0, maxW / 2, maxH)
    grd.addColorStop(0, '#ECF6F6')
    grd.addColorStop(1, '#ffffff')

    // 绘制圆角矩形
    function roundReact_js(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI, false)
      ctx.lineTo(x + w - r, y)
      ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 0, false)
      ctx.lineTo(x + w, y + h - r)
      ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI, false)
      ctx.lineTo(x + r, y + h)
      ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI, false)
      ctx.closePath()
    }
    roundReact_js(ctx, 0, 0, maxW, maxH, 12)
    ctx.clip() // 剪切任意形状
    // 填充渐变背景
    ctx.setFillStyle(grd)
    ctx.fill()

    // 绘制黑色边框
    ctx.setStrokeStyle('lightblue')
    ctx.stroke()

    ctx.drawImage(canvasInfo.about_product.about_src, canvasInfo.about_product.about_clipW / 2, canvasInfo.about_product.about_clipH / 2, canvasInfo.about_product.about_showW, canvasInfo.about_product.about_showH, 150 * rpxpx, 60 * rpxpx, canvasInfo.about_product.about_imgW * rpxpx, canvasInfo.about_product.about_imgH * rpxpx)

    ctx.setFillStyle('#353535')
    ctx.setFontSize(32 * rpxpx)
    ctx.setTextAlign('center')
    ctx.fillText(canvasInfo.content, maxW / 2, 520 * rpxpx)

    ctx.setFontSize(40 * rpxpx)
    ctx.setTextAlign('center')
    ctx.fillText(canvasInfo.productname, maxW / 2, 600 * rpxpx)

    ctx.save()// 保存绘图上下文
    ctx.beginPath();
    ctx.arc(maxW / 2, maxH - 335 * rpxpx,128*rpxpx, 0, Math.PI * 2, false);
    ctx.setStrokeStyle('#ffffff');
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(canvasInfo.about_qrcode.about_src, canvasInfo.about_qrcode.about_clipW / 2, canvasInfo.about_qrcode.about_clipH / 2, canvasInfo.about_qrcode.about_showW, canvasInfo.about_qrcode.about_showH, 250 * rpxpx, maxH - 460 * rpxpx, canvasInfo.about_qrcode.about_imgW * rpxpx, canvasInfo.about_qrcode.about_imgH * rpxpx)
    ctx.restore();

    ctx.setFillStyle('#353535')
    ctx.setFontSize(28 * rpxpx)
    ctx.setTextAlign('center')
    ctx.fillText(canvasInfo.company, maxW / 2, maxH - 150 * rpxpx)

    ctx.setFillStyle('#888888')
    ctx.setFontSize(28 * rpxpx)
    ctx.setTextAlign('center')
    ctx.fillText(canvasInfo.tip, maxW / 2, maxH - 80 * rpxpx)

    ctx.restore()// 恢复之前保存的绘图上下文。
    ctx.draw(true, () => {
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: maxW,
          height: maxH,
          destWidth: maxW * pixelRatio,
          destHeight: maxH * pixelRatio,
          canvasId: 'myCanvas',
          success(res) {
            console.log(res.tempFilePath)
            that.setData({ shareimg: res.tempFilePath })
          }
        })
      }, 200)
    })
  },

  store_Fn: function () {
    console.log('保存至相册')
    let that = this;
    app.getPower_js('scope.writePhotosAlbum', () => {
      wx.saveImageToPhotosAlbum({
        filePath: that.data.shareimg,
        success(res) {
          console.log(res)
          console.log('保存成功')
        }
      })
    }, true)
  },
})