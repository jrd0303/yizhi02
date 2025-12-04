App({
  globalData: {
    userInfo: null,
    cloudEnv: 'cloud1-6ge0q5ivfe7700f0' 
  },
  onLaunch() {
    wx.cloud.init({
      env: this.globalData.cloudEnv, 
      traceUser: true
    });
  }
});