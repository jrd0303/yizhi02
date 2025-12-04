Page({
  data: {
    searchContent: ''
  },

  onShareAppMessage() {
    return {};
  },
  
  onSearchInput: function(e) {
    this.setData({
      searchContent: e.detail.value
    });
    // 这里可以添加搜索逻辑，比如实时搜索建议等
  },
  
  navigateToRecognition: function() {
    console.log('navigateToRecognition called, attempting to navigate to style_migration page');
    console.log('Target URL: /pages/style_migration/style_migration');
    wx.navigateTo({
      url: '/pages/style_migration/style_migration',
      success: function(res) {
        console.log('Navigate to style_migration successful:', res);
      },
      fail: function(error) {
        console.log('Navigate to style_migration failed:', error);
      }
    })
  },
});