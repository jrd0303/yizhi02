Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  
  navigateToChat: function() {
    console.log('navigateToChat called');
    wx.switchTab({
      url: '/pages/chat/chat',
      success: function() {
        console.log('Switch to chat successful');
      },
      fail: function(error) {
        console.log('Switch to chat failed:', error);
      }
    })
  },
});