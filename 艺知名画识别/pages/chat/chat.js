Page({
  data: {
    messages: [
      {
        role: 'assistant',
        content: '你好呀！我是艺知，画作界的"福尔摩斯"，艺术史的"故事大王"！你想知道什么有关名画的问题我都可以回答你！' 
      }
    ],
    inputValue: '',
    loading: false
  },

  // 处理输入框内容变化
  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  // 发送消息
  async sendMessage() {
    const { inputValue, messages, loading } = this.data;
    
    if (!inputValue.trim() || loading) {
      return;
    }

    // 添加用户消息到消息列表
    const userMessage = {
      role: 'user',
      content: inputValue.trim()
    };

    const newMessages = [...messages, userMessage];

    this.setData({
      messages: newMessages,
      inputValue: '',
      loading: true
    });

    try {
      // 使用用户调教的语言模型
      const url = 'https://qianfan.baidubce.com/v2/chat/completions';
      console.log('完整URL:', url);
      
      // 构建请求体
      const payload = {
        "model": "ernie-4.5-turbo-128k",
        "messages": [
          {
            "role": "system",
            "content": "你是一个精通世界各地名画的大师，无论问你什么有关艺术名画流派等的问题你都可以对答如流。"
          },
          {
            "role": "assistant",
            "content": "您想了解哪幅画、哪个流派，还是某位艺术家的创作故事？无论是文艺复兴的辉煌、印象派的光影，还是现代艺术的突破，我都乐意为您细细道来。请告诉我您的兴趣点吧！"
          },
          userMessage
        ],
        "stream": false
      };
      
      // 请求头
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer bce-v3/ALTAK-JPELmtaZMdiTMEE9uWPHk/b56f240df992c9c40f928e789691cf0b1493faca',
        'appid': ''
      };
      
      // 使用wx.request直接调用
      const result = await new Promise((resolve, reject) => {
        wx.request({
          url: url,
          method: 'POST',
          data: payload,
          header: headers,
          success: (res) => {
            console.log('请求成功，状态码:', res.statusCode);
            console.log('响应数据:', res.data);
            if (res.statusCode === 200) {
              resolve(res.data);
            } else {
              reject(new Error(`请求失败，状态码：${res.statusCode}`));
            }
          },
          fail: (err) => {
            console.error('请求失败:', err);
            reject(err);
          }
        });
      });
      
      // 处理AI的响应
      let aiResponse = '';
      if (result && result.choices && result.choices.length > 0) {
        aiResponse = result.choices[0].message?.content || '抱歉，我暂时无法回答这个问题。';
      } else {
        aiResponse = '抱歉，我暂时无法回答这个问题。';
      }

      // 添加AI消息到消息列表
      const aiMessage = {
        role: 'assistant',
        content: aiResponse
      };

      this.setData({
        messages: [...newMessages, aiMessage],
        loading: false
      });

      // 滚动到底部
      this.scrollToBottom();
    } catch (error) {
      console.error('调用AI模型失败:', error);
      
      // 添加错误消息
      const errorMessage = {
        role: 'assistant',
        content: '抱歉，我暂时无法为你提供解答。请稍后再试或检查网络连接。'
      };

      this.setData({
        messages: [...newMessages, errorMessage],
        loading: false
      });
    }
  },

  // 预设问题点击
  async handlePresetQuestion(e) {
    const question = e.currentTarget.dataset.question;
    
    // 设置输入框内容并发送
    this.setData({
      inputValue: question
    });
    
    await this.sendMessage();
  },

  // 滚动到底部
  scrollToBottom: function() {
    const lastIndex = this.data.messages.length - 1;
    if (lastIndex >= 0) {
      this.setData({
        scrollToView: `msg-${lastIndex}`
      });
    } else if (this.data.loading) {
      // 如果正在加载，滚动到加载指示器
      this.setData({
        scrollToView: 'loading'
      });
    }
  },

  onShareAppMessage() {
    return {
      title: '名画识别艺术助手',
      path: '/pages/chat/chat',
      imageUrl: '/images/create.png'
    };
  },

  onShow() {
    // 页面显示时滚动到底部
    this.scrollToBottom();
  }
});