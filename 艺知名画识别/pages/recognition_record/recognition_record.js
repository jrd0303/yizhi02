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

  // 导航到创作记录页面
  navigateToCreate() {
    wx.navigateTo({
      url: '/pages/create/create'
    });
  },

  onUnload() {
    // 当页面卸载时，返回my页面
    wx.switchTab({
      url: '/pages/my/my'
    });
  },
});