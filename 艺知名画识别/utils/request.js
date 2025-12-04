// 封装微信小程序的网络请求
const post = (url, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json',
        ...headers
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`请求失败，状态码：${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

module.exports = {
  post
};