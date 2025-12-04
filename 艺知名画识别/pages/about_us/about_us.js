Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  
  // 返回上一页
  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  },
});