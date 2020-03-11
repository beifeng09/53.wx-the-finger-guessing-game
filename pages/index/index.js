let timer;
let numAi = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户默认次数
    winNum: 0,
    gameResult: '',
    btnState: false,
    imageUserScr: '../../image/问号.jpg',
    imageAiScr: '',
    srcs: [
      "../../image/布.jpg",
      "../../image/剪刀.jpg",
      "../../image/石头.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 随机出拳
    this.timerGo();
    // 用户进来就读取
    let oldwinNum = wx.getStorageSync('winNum')
    if (oldwinNum != null && oldwinNum != '') {
      this.setData({
        winNum: oldwinNum
      })

    }
  },

  // 1.获取随机出拳
  timerGo() {
    timer = setInterval(this.move, 100);
  },

  // 封装的动态随机出拳
  move: function() {
    numAi = parseInt(Math.floor(Math.random() * 3));
    this.setData({
      imageAiScr: this.data.srcs[numAi]
    })
  },

  // 2.用户出拳
  changeForChoose(e) {
    if (this.data.btnState) {
      return;
    }
    this.setData({
      imageUserScr: this.data.srcs[e.currentTarget.id]
    })

    // 关闭定时器
    clearInterval(timer);
    let user = this.data.imageUserScr;
    var ai = this.data.imageAiScr;
    let num = this.data.winNum;

    // 比较
    let str = '你输了';
    if (user == "../../image/石头.jpg" && ai == "../../image/剪刀.jpg") {
      num++;
      str = '你赢了';
      // 保存次数
      wx.setStorageSync('winNum', num)
    }

    if (user == "../../image/布.jpg" && ai == "../../image/石头.jpg") {
      num++;
      str = '你赢了';
      // 保存次数
      wx.setStorageSync('winNum', num)

    }

    if (user == "../../image/剪刀.jpg" && ai == "../../image/布.jpg") {
      num++;
      str = '你赢了';
      // 保存次数
      wx.setStorageSync('winNum', num)

    }

    if (user == ai) {
      str = "平局";
    }
    this.setData({
      winNum: num,
      gameResult: str,
      btnState: true,
    })
  },

  // 3.再来
  align() {
    if (this.data.btnState == false) {
      return;
    }
    this.timerGo();
    this.setData({
      btnState: false,
      gameResult: '',
      imageUserScr: '../../image/问号.jpg',
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})