// pages/detail4/detail4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFullDescription: false,
    description: '这是一幅宗教题材的绘画作品，达·芬奇通过对人物形象的细致观察去研究每个人的心理状态，当人在突然性事件中产生复杂的内心情感时，会通过动作、表情表现出来，从而将这一刻的真实故事展现在现实的环境中。这幅画体现了人文主义的思想，并继承了卡氏对宗教画的情节化处理方式，展示了一个生动、真实的故事，从而赋予了这幅作品创造力和历史意义，反映了正义与邪恶的斗争，弘扬了人文主义的时代精神。',
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
   * 用户点击右上角分享
   */
  toggleDescription: function() {
    this.setData({
      showFullDescription: !this.data.showFullDescription
    });
  },

  onShareAppMessage() {
    return {};
  }
})