// 本地开发服务器配置示例
const CONFIG = {
  wechat: {
    appId: 'wxe97fc04c6de318e7',
    appSecret: '2fd87ea22fb1837d09c74145802ab590'
  },
  
  api: {
    // 本地开发环境
    dev: {
      baseURL: 'http://localhost:3000',
      loginURL: 'http://localhost:3000/api/auth/login',
      // 本地开发时的其他配置
      timeout: 10000,
      debug: true
    },
    
    // 内网测试环境
    test: {
      baseURL: 'http://192.168.1.100:3000',
      loginURL: 'http://192.168.1.100:3000/api/auth/login'
    },
    
    // 生产环境
    prod: {
      baseURL: 'https://api.yourdomain.com',
      loginURL: 'https://api.yourdomain.com/api/auth/login'
    }
  },
  
  currentEnv: 'dev' // 使用本地开发环境
};