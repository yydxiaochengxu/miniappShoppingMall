// pages/list/list.js
const app = getApp();
let timeout = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time: { time1: "h", time2: "m", time3: "s", marking: "year" },
        images: {
            time: "http://pic.90sjimg.com/design/00/58/41/78/58f2d014626a9.jpg!/fwfh/804x804/quality/90/unsharp/true/compress/true",
            // src1: "../../images/火.png",
            src1: "http://pic.90sjimg.com/design/00/98/55/69/592d40fe7eac4.jpg!/fwfh/634x756/quality/90/unsharp/true/compress/true",
            src2: "http://pic.90sjimg.com/design/00/64/69/98/5964460e91a2c.jpg!/fwfh/804x804/quality/90/unsharp/true/compress/true"
        },
        listArr: [
            {
                productimg: '/images/product1.jpg',
                title: '产品名字',
                content: '产品介绍文案，产品介绍文案',
                pictip: '参考价格',
                newpic: 28,
            },
            {
                productimg: '/images/product2.jpg',
                title: '产品名字',
                content: '产品介绍文案，产品介绍文案',
                pictip: '参考价格',
                newpic: 28,
            },
            {
                productimg: '/images/product3.jpg',
                title: '产品名字',
                content: '产品介绍文案，产品介绍文案',
                pictip: '参考价格',
                newpic: 28,
            },
            {
                productimg: '/images/product4.jpg',
                title: '产品名字',
                content: '产品介绍文案，产品介绍文案',
                pictip: '参考价格',
                newpic: 28,
            },
            {
                productimg: '/images/product5.jpg',
                title: '产品名字',
                content: '产品介绍文案，产品介绍文案',
                pictip: '参考价格',
                newpic: 28,
            }
        ]
    },

    gotodetail: function () {
        wx.navigateTo({
            url: '../detail/detail'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.changeTime();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that = this;
    },

    goProduct_Fn: function () {
        wx.navigateTo({
            url: '../product/product'
        })
    },

    changeTime: function () {
        let time = this.data.time;
        if (time.marking === "day") {
            this.fn_changeTime("year");
        } else {
            this.fn_changeTime("day");
        };
    },

    fn_changeTime: function (marking) {
        console.log(11)
        clearTimeout(timeout);
        let that = this;
        let time = that.data.time;
        function check(val) {
            if (val < 10) {
                return ("0" + val);
            } else {
                return val;
            }
        }
        function daytime() {
            let date = new Date();
            time.time1 = check(date.getHours());
            time.time2 = check(date.getMinutes());
            time.time3 = check(date.getSeconds());
            time.marking = "day";
            that.setData({ time: time });
            timeout = setTimeout(daytime, 1000);
        };
        function yeartime() {
            let date = new Date();
            time.time1 = check(date.getFullYear() - 2000);
            time.time2 = check(date.getMonth() + 1);
            time.time3 = check(date.getDate());
            time.marking = "year";
            that.setData({ time: time });
            timeout = setTimeout(yeartime, 10000);
        };
        if (marking === "day") {
            daytime();
        } else {
            yeartime();
        };
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // app.getpower_js('scope.userInfo', () => {
        //   wx.getUserInfo({
        //     success: userInfo => {
        //       console.log(userInfo);
        //       app.globalData.userInfo = userInfo;
        //       wx.setNavigationBarTitle({
        //         title: userInfo.userInfo.nickName + '旗舰店'
        //       })
        //     }
        //   })
        // }, true)
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