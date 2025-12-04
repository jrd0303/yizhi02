Page({
  data: {},

  onShareAppMessage() {
    return {};
  },

  // 导航到我的收藏页面
  navigateToCollection() {
    wx.navigateTo({
      url: '/pages/collection/collection'
    });
  },

  // 导航到识别记录页面
  navigateToRecognitionRecord() {
    wx.navigateTo({
      url: '/pages/recognition_record/recognition_record'
    });
  },

  onUnload() {
    // 当页面卸载时，返回my页面
    wx.switchTab({
      url: '/pages/my/my'
    });
  },
});