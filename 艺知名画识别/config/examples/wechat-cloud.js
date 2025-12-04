// 微信云开发配置示例
const CONFIG = {
  wechat: {
    appId: 'wxe97fc04c6de318e7',
    appSecret: '2fd87ea22fb1837d09c74145802ab590'
  },
  
  api: {
    // 微信云开发环境
    dev: {
      baseURL: 'https://your-env-id.service.tcloudbase.com',
      loginURL: 'https://your-env-id.service.tcloudbase.com/login',
      // 云函数调用方式
      cloudFunction: 'userLogin'
    },
    
    // 本地开发环境
    local: {
      baseURL: 'http://localhost:3000',
      loginURL: 'http://localhost:3000/auth/login'
    },
    
    // 生产环境
    prod: {
      baseURL: 'https://api.yourdomain.com',
      loginURL: 'https://api.yourdomain.com/auth/login'
    }
  },
  
  currentEnv: 'dev' // 使用微信云开发
};