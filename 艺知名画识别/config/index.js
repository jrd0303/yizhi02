// 微信小程序配置文件
// 请根据你的实际情况修改以下配置

const CONFIG = {
  // 微信小程序配置
  wechat: {
    // 你的微信小程序AppID (在微信公众平台获取)
    appId: 'wxe97fc04c6de318e7',
    // 你的微信小程序AppSecret (在微信公众平台获取，注意保密)
    appSecret: '2fd87ea22fb1837d09c74145802ab590'
  },
  
  // 服务器API配置
  api: {
    // 开发环境 - 微信云开发
    dev: {
      baseURL: 'https://your-cloud-env-id.service.tcloudbase.com',
      loginURL: 'https://your-cloud-env-id.service.tcloudbase.com/api/auth/login',
      // 其他API接口...
      getUserInfoURL: 'https://your-cloud-env-id.service.tcloudbase.com/api/user/info',
      updateUserURL: 'https://your-cloud-env-id.service.tcloudbase.com/api/user/update'
    },
    
    // 生产环境
    prod: {
      baseURL: 'https://your-prod-api.com',
      loginURL: 'https://your-prod-api.com/auth/login',
      // 其他API接口...
      getUserInfoURL: 'https://your-prod-api.com/user/info',
      updateUserURL: 'https://your-prod-api.com/user/update'
    },
    
    // 测试环境 (可选)
    test: {
      baseURL: 'https://your-test-api.com',
      loginURL: 'https://your-test-api.com/auth/login',
      // 其他API接口...
      getUserInfoURL: 'https://your-test-api.com/user/info',
      updateUserURL: 'https://your-test-api.com/user/update'
    }
  },
  
  // 当前环境设置
  // 可选值: 'dev', 'test', 'prod'
  currentEnv: 'dev'
};

// 获取当前环境的API配置
const getCurrentAPI = () => {
  return CONFIG.api[CONFIG.currentEnv];
};

// 获取微信配置
const getWechatConfig = () => {
  return CONFIG.wechat;
};

module.exports = {
  CONFIG,
  getCurrentAPI,
  getWechatConfig
};