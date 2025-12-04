Page({
  data: {},

  onShareAppMessage() {
    return {};
  },

  // 导航到创作记录页面
  navigateToCreate() {
    wx.navigateTo({
      url: '/pages/create/create'
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