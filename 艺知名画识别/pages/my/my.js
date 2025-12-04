const { wxLogin } = require('../../api/index');

Page({
  data: {
    isLoggedIn: false,
    isLoading: false,
    userInfo: {
      avatarUrl: 'https://636c-cloud1-6ge0q5ivfe7700f0-1323134461.tcb.qcloud.la/%E5%9B%BE%E6%A0%872/%E5%9B%BE%E6%A0%872/9.png?sign=f4c8cda5b65690cc68e294a290e150ba&t=1757594702',
      nickName: ''
    }
  },

  onLoad() {
    // 检查是否已经登录
    this.checkLoginStatus();
  },

  onShow() {
    // 页面显示时重新检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    try {
      const isLoggedIn = wx.getStorageSync('isLoggedIn');
      const userInfo = wx.getStorageSync('userInfo');
      
      if (isLoggedIn && userInfo && userInfo.avatarUrl) {
        this.setData({
          isLoggedIn: true,
          userInfo: userInfo
        });
        
        // 更新全局状态
        const app = getApp();
        if (app) {
          app.globalData.userInfo = userInfo;
          app.globalData.isLoggedIn = true;
        }
      }
    } catch (error) {
      console.error('检查登录状态失败:', error);
    }
  },

  // 头像选择处理
  onChooseAvatar(e) {
    try {
      const { avatarUrl } = e.detail;
      console.log('选择头像成功:', avatarUrl);
      
      this.setData({
        'userInfo.avatarUrl': avatarUrl
      });
    } catch (error) {
      console.error('选择头像失败:', error);
      wx.showToast({
        title: '选择头像失败，请重试',
        icon: 'none'
      });
    }
  },

  // 昵称输入处理
  onInputNickname(e) {
    try {
      const { value } = e.detail;
      console.log('输入昵称:', value);
      
      this.setData({
        'userInfo.nickName': value
      });
    } catch (error) {
      console.error('输入昵称失败:', error);
    }
  },

  // 新的用户信息获取方法 - 用于兼容性或其他情况
  getUserProfile() {
    // 防止重复点击
    if (this.data.isLoading || this.data.isLoggedIn) {
      return;
    }
    
    // 引导用户使用新的头像昵称填写组件
    wx.showToast({
      title: '请选择头像并输入昵称',
      icon: 'none'
    });
  },
  
  // 处理用户登录
  handleUserLogin() {
    try {
      const { userInfo } = this.data;
      
      // 验证用户信息
      if (!userInfo.avatarUrl || !userInfo.nickName) {
        wx.showToast({
          title: '请完善头像和昵称信息',
          icon: 'none'
        });
        return;
      }
      
      this.setData({ isLoading: true });
      
      wx.showLoading({
        title: '登录中...',
        mask: true
      });
      
      // 调用微信登录获取code
      wx.login({
        success: (loginRes) => {
          if (loginRes.code) {
            console.log('微信登录成功，code:', loginRes.code);
            
            // 调用登录云函数
            wx.cloud.callFunction({
              name: 'userLogin',
              data: {
                code: loginRes.code,
                userInfo: userInfo
              }
            }).then(res => {
              console.log('云函数调用成功:', res);
              
              if (res.result && res.result.success) {
                // 登录成功，保存用户信息
                this.setData({
                  isLoggedIn: true,
                  userInfo: userInfo,
                  loginUserInfo: res.result.data
                });
                
                // 保存到本地存储
                wx.setStorageSync('isLoggedIn', true);
                wx.setStorageSync('userInfo', userInfo);
                wx.setStorageSync('loginUserInfo', res.result.data);
                
                // 保存用户信息到全局数据
                const app = getApp();
                if (app) {
                  app.globalData.userInfo = userInfo;
                  app.globalData.isLoggedIn = true;
                }
                
                wx.showToast({
                  title: '登录成功',
                  icon: 'success'
                });
                
                console.log('登录成功，用户信息已保存:', res.result.data);
              } else {
                throw new Error(res.result ? res.result.message : '登录失败');
              }
            }).catch(err => {
              console.error('云函数调用失败:', err);
              wx.showToast({
                title: err.message || '登录失败',
                icon: 'none'
              });
            }).finally(() => {
              this.setData({ isLoading: false });
              wx.hideLoading();
            });
          } else {
            throw new Error('获取微信登录凭证失败');
          }
        },
        fail: (err) => {
          console.error('微信登录失败:', err);
          wx.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
          this.setData({ isLoading: false });
          wx.hideLoading();
        }
      });
    } catch (error) {
      console.error('处理用户登录失败:', error);
      this.setData({ isLoading: false });
      wx.showToast({
        title: error.message || '登录失败',
        icon: 'none'
      });
      wx.hideLoading();
    }
  },

  // 兼容旧版的微信登录方法
  wxLogin() {
    // 提示用户使用新的登录方式
    this.getUserProfile();
  },



  onShareAppMessage() {
    return {};
  },
});