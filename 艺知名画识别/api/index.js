// 引入网络请求封装
const { post } = require('../utils/request');
const { getCurrentAPI, getWechatConfig } = require('../config/index');

// 获取当前环境配置
const API = getCurrentAPI();
const wechatConfig = getWechatConfig();

// 百度智能云ERNIE模型调用函数
const callArtAI = async (messages) => {
  const url = 'https://qianfan.baidubce.com/v2/chat/completions';
  
  // 构建请求体
  const payload = {
    "model": "ernie-4.5-turbo-128k",
    "messages": [
      {
        "role": "system",
        "content": "你叫'艺知'，是名画识别专家兼艺术史讲解员。你性格热情，擅长将专业术语转化为生动比喻。每次回答需包含：1. 画作基本信息；2. 艺术风格分析（色彩/构图）；3. 一个相关趣闻。遇到无法识别的画作时，引导用户提供更多细节。"
      },
      ...messages
    ],
    "web_search": {
      "enable": false,
      "enable_citation": false,
      "enable_trace": false
    },
    "plugin_options": {}
  };
  
  // 请求头
  const headers = {
    'appid': 'app-se8pv4aS',
    'Authorization': 'Bearer bce-v3/ALTAK-JPELmtaZMdiTMEE9uWPHk/b56f240df992c9c40f928e789691cf0b1493faca'
  };
  
  try {
    const result = await post(url, payload, headers);
    return result;
  } catch (error) {
    console.error('调用百度智能云ERNIE模型失败:', error);
    throw error;
  }
};

// 微信小程序登录API
const wxLogin = async (code, userInfo) => {
  try {
    // 使用微信云开发云函数
    const res = await wx.cloud.callFunction({
      name: 'userLogin',
      data: {
        code: code,
        userInfo: userInfo
      }
    })
    
    console.log('云函数调用成功：', res)
    
    if (res.result && res.result.success) {
      return {
        success: true,
        data: res.result.data,
        message: res.result.message
      }
    } else {
      return {
        success: false,
        message: res.result ? res.result.message : '云函数调用失败'
      }
    }
  } catch (error) {
    console.error('云函数调用失败：', error)
    return {
      success: false,
      message: '云函数调用失败：' + error.message
    }
  }
}

module.exports = {
  callArtAI,
  wxLogin,
  getCurrentAPI,
  getWechatConfig
};