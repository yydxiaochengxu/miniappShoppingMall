// pages/storage/storage.js
let listarr = [
  { title: '水分充足，酸甜可口～正宗铁炉盆柑，多放几天，等糖分完全转化会更甜', number: '20', name: '血橙', newpic: 8, oldpic: 12, howmuch: 1, src: 'http://pic.90sjimg.com/design/00/59/79/86/591a617ea815f.jpg!/fwfh/750x592/quality/90/unsharp/true/compress/true', choose: false },
  { title: '长红，好吃的不要不要的，水分充足，不打腊，不催熟，纯自然成熟，酸甜可口！放几天味道更好哦', number: '18', name: '橙子', newpic: 6, oldpic: 10, howmuch: 1, src: 'http://pic.90sjimg.com/design/00/59/79/86/591a617ea815f.jpg!/fwfh/750x592/quality/90/unsharp/true/compress/true', choose: false },
  { title: '肥家过年，天天吃肉，很腻！有木有？', number: '24', name: '红心柚', newpic: 5, oldpic: 9, howmuch: 1, src: 'http://pic.90sjimg.com/design/00/59/79/86/591a617ea815f.jpg!/fwfh/750x592/quality/90/unsharp/true/compress/true', choose: false },
  { title: '单果重200-250克，果色橙红光滑，较易剥皮，果肉脆嫩化渣、汁多味香', number: '12', name: '血橙', newpic: 9, oldpic: 13, howmuch: 1, src: 'http://pic.90sjimg.com/design/00/59/79/86/591a617ea815f.jpg!/fwfh/750x592/quality/90/unsharp/true/compress/true', choose: false },
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listarr: listarr,
    allchoose: false,
    isallchoose: 0,
    allpic: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //事件集合
  choose_js: function (e) {//单选
    let listarr = this.data.listarr;
    let index = e.currentTarget.dataset.index;
    listarr[index].choose = !listarr[index].choose;
    let isallchoose = 0;
    for (let item of listarr) {
      if (item.choose) {
        isallchoose += 1;
      }
    }
    if (isallchoose == listarr.length) {
      this.setData({ allchoose: true, listarr, isallchoose })
    } else {
      this.setData({ allchoose: false, listarr, isallchoose })
    };
    this.resultpic_js();
  },
  allchoose_fn: function () {//全选
    let allchoose = this.data.allchoose;
    let listarr = this.data.listarr;
    if (allchoose) {//取消全选
      for (let item of listarr) {
        item.choose = false;
      }
      this.setData({ allchoose: !allchoose, listarr, isallchoose: 0 })
    } else {//全选
      for (let item of listarr) {
        item.choose = true;
      }
      this.setData({ allchoose: !allchoose, listarr, isallchoose: listarr.length })
    }
    this.resultpic_js();
  },
  sub_Fn: function (e) {
    let listarr = this.data.listarr;
    let index = e.currentTarget.dataset.index;
    let howmuch = Number(listarr[index].howmuch);
    if (howmuch <= 1) { } else {
      listarr[index].howmuch = Number(listarr[index].howmuch) - 1
    }
    this.setData({ listarr });
    this.resultpic_js();
  },
  add_Fn: function (e) {
    let listarr = this.data.listarr;
    let index = e.currentTarget.dataset.index;
    listarr[index].howmuch = Number(listarr[index].howmuch) + 1;
    this.setData({ listarr })
    this.resultpic_js();
  },
  resultpic_js: function () {
    let listarr = this.data.listarr;
    let allpic = 0;
    for (let item of listarr) {
      if (item.choose) {
        let pic = Number(item.newpic);
        let howmuch = Number(item.howmuch);
        console.log(pic, howmuch)
        allpic += pic * howmuch;
      }
    }
    this.setData({ allpic })
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