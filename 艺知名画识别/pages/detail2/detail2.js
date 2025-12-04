// pages/detail2/detail2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFullDescription: false,
    description: '《夏洛特小姐》（Lady of Shalott）是一幅1888年的布面油画，约翰·威廉姆·沃特豪斯（John William Waterhouse）最著名的作品之一。 它描绘了丁尼生（Tennyson）诗歌中的一幕。The Lady of Shallot 是维多利亚诗歌中的经典形象。在这幅画中，受到诅咒的少女The Lady of Shallot为了爱情，荡舟顺水而下。 当她心中挚爱的人儿看见她时，少女因诅咒已成为一具美丽的尸身。 承受着致命的诅咒，去追寻无望的爱情。 当小船在少 女最后的歌声中慢慢接近恋人的城市，少女的身体也渐渐冰凉，漆黑的双眸再也无法看见心中的他那英俊的面容。 只因惊鸿一瞥，不顾一切向爱人奔去，直至付出生 命的代价，这是怎样的绝恋。',
    maxLength: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 切换显示全文功能
   */
  toggleDescription: function() {
    this.setData({
      showFullDescription: !this.data.showFullDescription
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {};
  }
})