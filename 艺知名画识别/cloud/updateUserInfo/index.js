// 云函数 updateUserInfo/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const { nickName, avatarUrl } = event // 接收小程序传递的真实昵称、头像
    
    if (!nickName || !avatarUrl) {
      return { success: false, message: '昵称和头像不能为空' }
    }
    
    // 根据 openid 更新用户资料
    await db.collection('users')
      .where({ openid: wxContext.OPENID })
      .update({
        data: {
          nickName: nickName,
          avatarUrl: avatarUrl,
          updateTime: new Date()
        }
      })
    
    return { success: true, message: '资料更新成功' }
  } catch (error) {
    console.error('更新资料失败:', error)
    return { success: false, message: '更新失败：' + error.message }
  }
}